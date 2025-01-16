import { supabase } from '../lib/supabase';

const GEMINI_API_KEY = 'AIzaSyDgJsFKG0uYONNTQRo0fOri2Dfptt8rAi8';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const sendMessage = async (message: string, userId: string): Promise<ChatMessage> => {
  try {
    // Mesajı veritabanına kaydet
    const { error: saveError } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        content: message,
        role: 'user',
        timestamp: new Date().toISOString()
      });

    if (saveError) throw saveError;

    // Gemini API'ye istek gönder
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Sen bir sağlık asistanısın. Kullanıcılara sağlık konularında yardımcı oluyorsun. 
                   Tıbbi tavsiyeler verirken her zaman bir doktora danışılması gerektiğini belirtiyorsun. 
                   Yanıtların kısa, anlaşılır ve Türkçe olmalı. İşte kullanıcının sorusu: ${message}`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('API yanıt vermedi');
    }

    const data = await response.json();
    const aiResponse = data.candidates[0]?.content?.parts[0]?.text || "Üzgünüm, yanıt oluşturulamadı.";

    // AI yanıtını veritabanına kaydet
    const { error: aiSaveError } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date().toISOString()
      });

    if (aiSaveError) throw aiSaveError;

    return {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in chat:', error);
    throw error;
  }
};

export const getChatHistory = async (userId: string): Promise<ChatMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: true });

    if (error) throw error;

    return data.map(msg => ({
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp
    }));
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};
