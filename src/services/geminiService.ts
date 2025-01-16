// Sağlık belirtileri ve öneriler veritabanı
interface HealthInfo {
  belirtiler: string;
  oneriler: string;
  uyarilar: string;
}

const healthDatabase: { [key: string]: HealthInfo } = {
  // Baş bölgesi
  "baş ağrısı": {
    belirtiler: "- Zonklama\n- Basınç hissi\n- Görme bozuklukları\n- Mide bulantısı",
    oneriler: "1. Karanlık ve sessiz bir odada dinlenin\n2. Bol su için (günde 2-3 litre)\n3. Düzenli uyku düzenine geçin\n4. Stresten uzak durun\n5. Gerekirse ağrı kesici kullanın",
    uyarilar: "Şu durumlarda doktora başvurun:\n- Şiddetli ve ani başlayan baş ağrısı\n- Ateş ile birlikte görülen baş ağrısı\n- 3 günden uzun süren baş ağrısı"
  },

  "migren": {
    belirtiler: "- Zonklayıcı baş ağrısı\n- Işığa ve sese hassasiyet\n- Mide bulantısı ve kusma\n- Görsel değişiklikler",
    oneriler: "1. Karanlık ve sessiz bir odada dinlenin\n2. Soğuk kompres uygulayın\n3. Düzenli uyku ve yemek rutini oluşturun\n4. Tetikleyici faktörleri not edin\n5. Doktor önerisi ile ilaç kullanın",
    uyarilar: "Şu durumlarda doktora başvurun:\n- Sık tekrarlayan ataklar\n- Günlük hayatı etkileyen şiddetli ağrılar"
  },

  // Solunum sistemi
  "öksürük": {
    belirtiler: "- Kuru veya balgamlı öksürük\n- Boğaz ağrısı\n- Göğüste rahatsızlık",
    oneriler: "1. Bol sıvı tüketin\n2. Bal ve ıhlamur için\n3. Odanızı nemli tutun\n4. Sigara içmeyin ve dumanlı ortamlardan uzak durun\n5. Buhar tedavisi uygulayın",
    uyarilar: "Şu durumlarda doktora başvurun:\n- 2 haftadan uzun süren öksürük\n- Kanlı balgam\n- Nefes darlığı"
  },

  "grip": {
    belirtiler: "- Yüksek ateş\n- Kas ağrıları\n- Halsizlik\n- Burun akıntısı\n- Öksürük",
    oneriler: "1. Bol dinlenin\n2. Sıvı tüketimini artırın\n3. C vitamini alın\n4. Odanızı sık sık havalandırın\n5. Parasetamol içeren ilaçlar kullanın",
    uyarilar: "Şu durumlarda doktora başvurun:\n- 39°C üzeri ateş\n- Şiddetli göğüs ağrısı\n- Nefes almada zorluk"
  },

  // Sindirim sistemi
  "mide bulantısı": {
    belirtiler: "- Bulantı hissi\n- İştahsızlık\n- Kusma\n- Karın rahatsızlığı",
    oneriler: "1. Az ve sık beslenin\n2. Zencefil çayı için\n3. Yağlı ve baharatlı yiyeceklerden kaçının\n4. Yavaş yiyin\n5. Bol su için",
    uyarilar: "Şu durumlarda doktora başvurun:\n- Şiddetli karın ağrısı\n- Kanlı kusma\n- 24 saatten uzun süren bulantı"
  },

  "ishal": {
    belirtiler: "- Sık dışkılama\n- Sulu dışkı\n- Karın krampları\n- Bulantı",
    oneriler: "1. Bol sıvı tüketin\n2. BRAT diyeti uygulayın (Muz, Pirinç, Elma, Tost)\n3. Probiyotik gıdalar tüketin\n4. Kafein ve alkolden uzak durun\n5. Hijyene dikkat edin",
    uyarilar: "Şu durumlarda doktora başvurun:\n- Kanlı ishal\n- Yüksek ateş\n- Şiddetli karın ağrısı"
  },

  // Kas-iskelet sistemi
  "kas ağrısı": {
    belirtiler: "- Kaslarda ağrı ve sertlik\n- Hareket kısıtlılığı\n- Şişlik",
    oneriler: "1. Sıcak/soğuk kompres uygulayın\n2. Hafif egzersizler yapın\n3. Yeterli dinlenin\n4. Magnezyum takviyesi alın\n5. Masaj yapın",
    uyarilar: "Şu durumlarda doktora başvurun:\n- Şiddetli ve uzun süreli ağrı\n- Hareket edememe\n- Belirgin şişlik ve kızarıklık"
  },

  // Genel durumlar
  "yorgunluk": {
    belirtiler: "- Sürekli yorgunluk hissi\n- Konsantrasyon güçlüğü\n- Uyku problemleri\n- Kas güçsüzlüğü",
    oneriler: "1. Düzenli uyku rutini oluşturun\n2. Dengeli beslenin\n3. B vitaminleri alın\n4. Düzenli egzersiz yapın\n5. Stres yönetimi uygulayın",
    uyarilar: "Şu durumlarda doktora başvurun:\n- Uzun süreli yorgunluk\n- Günlük aktiviteleri yapamama\n- Başka belirtilerle birlikte görülmesi"
  },

  "uykusuzluk": {
    belirtiler: "- Uykuya dalmada zorluk\n- Sık uyanma\n- Dinlenememe\n- Gündüz uyku hali",
    oneriler: "1. Düzenli uyku saatleri belirleyin\n2. Yatak odanızı karanlık ve sessiz tutun\n3. Yatmadan önce elektronik cihaz kullanmayın\n4. Kafein tüketimini sınırlayın\n5. Akşam egzersizlerinden kaçının",
    uyarilar: "Şu durumlarda doktora başvurun:\n- Kronik uykusuzluk\n- Depresyon belirtileri\n- İş/okul hayatını etkileme"
  }
};

const defaultResponse = `Sağlığınızla ilgili endişelerinizi anlıyorum. Size yardımcı olabilmek için lütfen belirtilerinizi daha detaylı anlatır mısınız?

Örnek sorular:
- "Baş ağrım var, ne yapmalıyım?"
- "Grip belirtileri nelerdir?"
- "Uykusuzluk için öneriler neler?"
- "Mide bulantısı nasıl geçer?"

Not: Verilen bilgiler genel tavsiye niteliğindedir. Ciddi veya sürekli rahatsızlıklarda mutlaka bir sağlık kuruluşuna başvurun.`;

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const lowerPrompt = prompt.toLowerCase();
    
    // Tüm sağlık durumlarını kontrol edip eşleşenleri bulalım
    for (const [keyword, info] of Object.entries(healthDatabase)) {
      if (lowerPrompt.includes(keyword)) {
        return `${keyword.toUpperCase()} HAKKINDA BİLGİLER\n\n` +
          `🔍 Belirtiler:\n${info.belirtiler}\n\n` +
          `✅ Öneriler:\n${info.oneriler}\n\n` +
          `⚠️ Önemli Uyarılar:\n${info.uyarilar}\n\n` +
          `Not: Bu bilgiler genel tavsiye niteliğindedir. Ciddi veya sürekli rahatsızlıklarda mutlaka bir sağlık kuruluşuna başvurun.`;
      }
    }

    return defaultResponse;
  } catch (error) {
    console.error('Analiz hatası:', error);
    return defaultResponse;
  }
};
