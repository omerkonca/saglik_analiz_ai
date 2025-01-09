import { supabase } from '../lib/supabase';
import OpenAI from 'openai';

if (!import.meta.env.VITE_OPENAI_API_KEY) {
  throw new Error('OpenAI API anahtarı bulunamadı. Lütfen .env dosyasını kontrol edin.');
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface AnalysisResult {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  medications?: string[];
}

interface PersonalInfo {
  age: string;
  gender: 'male' | 'female' | 'other';
  weight?: string;
  height?: string;
  chronicDiseases?: string;
  medications?: string;
  additionalInfo?: string;
}

export const analyzeHealthData = async (
  file: File | null,
  symptoms: string[],
  personalInfo: PersonalInfo
): Promise<AnalysisResult> => {
  try {
    let fileContent = '';
    
    if (file) {
      // Upload file to Supabase storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('health-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Convert file to base64
      fileContent = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    }

    // Prepare prompt for GPT-4
    const prompt = `Lütfen aşağıdaki sağlık verilerini analiz edin:

Kişisel Bilgiler:
- Yaş: ${personalInfo.age}
- Cinsiyet: ${personalInfo.gender === 'male' ? 'Erkek' : personalInfo.gender === 'female' ? 'Kadın' : 'Diğer'}
${personalInfo.height ? `- Boy: ${personalInfo.height} cm` : ''}
${personalInfo.weight ? `- Kilo: ${personalInfo.weight} kg` : ''}
${personalInfo.chronicDiseases ? `- Kronik Hastalıklar: ${personalInfo.chronicDiseases}` : ''}
${personalInfo.medications ? `- Kullanılan İlaçlar: ${personalInfo.medications}` : ''}

Belirtiler: ${symptoms.join(', ')}
${personalInfo.additionalInfo ? `\nEk Bilgiler: ${personalInfo.additionalInfo}` : ''}
${fileContent ? '\nAyrıca yüklenen sağlık belgesi de analiz edilmiştir.' : ''}

Lütfen şunları sağlayın:
1. Olası teşhis
2. Teşhis güven düzeyi (0-100 arası bir sayı)
3. Öneriler
4. Varsa ilaç önerileri

Not: Bu bir ön değerlendirmedir ve profesyonel tıbbi tavsiyenin yerini tutmaz.`;

    // Analyze with GPT-4
    const messages = [
      {
        role: "user" as const,
        content: fileContent ? [
          { type: "text" as const, text: prompt },
          {
            type: "image_url" as const,
            image_url: {
              url: fileContent,
              detail: "auto" as const
            }
          }
        ] : prompt
      }
    ];

    const response = await openai.chat.completions.create({
      model: fileContent ? "gpt-4-vision-preview" : "gpt-4",
      messages,
      max_tokens: 1000,
    });

    // Parse the response
    const analysis = response.choices[0].message.content;
    if (!analysis) throw new Error('API yanıt vermedi');
    
    // Save analysis to database
    const { error: dbError } = await supabase
      .from('analyses')
      .insert({
        symptoms,
        personal_info: personalInfo,
        result: analysis,
        created_at: new Date().toISOString()
      });

    if (dbError) throw dbError;

    // Parse and structure the response
    const lines = analysis.split('\n');
    const result: AnalysisResult = {
      diagnosis: '',
      confidence: 0,
      recommendations: [],
      medications: []
    };

    lines.forEach((line: string) => {
      if (line.includes('Teşhis:')) {
        result.diagnosis = line.split('Teşhis:')[1].trim();
      } else if (line.includes('Güven:')) {
        const confidenceStr = line.split('Güven:')[1].trim();
        const confidence = parseInt(confidenceStr);
        if (!isNaN(confidence)) {
          result.confidence = confidence / 100;
        }
      } else if (line.includes('Öneri:')) {
        result.recommendations.push(line.split('Öneri:')[1].trim());
      } else if (line.includes('İlaç:')) {
        result.medications?.push(line.split('İlaç:')[1].trim());
      }
    });

    return result;
  } catch (error) {
    console.error('Analysis error:', error);
    throw new Error('Analiz sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
  }
}; 