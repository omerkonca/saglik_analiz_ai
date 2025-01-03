import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export const sendContactMessage = async (data: ContactMessage) => {
  try {
    emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
    
    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      {
        to_name: 'Sağlık Analizi',
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        reply_to: data.email
      }
    );

    if (response.status !== 200) {
      throw new Error('Mesaj gönderilemedi');
    }
    
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Mesaj şu anda gönderilemedi. Lütfen daha sonra tekrar deneyin.');
  }
};