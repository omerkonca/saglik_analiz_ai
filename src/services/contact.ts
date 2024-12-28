import emailjs from '@emailjs/browser';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export const sendContactMessage = async (data: ContactMessage) => {
  try {
    await emailjs.send(
      'service_2qr85nl',
      'template_k4515sp',
      {
        to_name: 'Ömer',
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        reply_to: data.email
      },
      'Gg1K2qnm9RJ3BGzPv'
    );
    
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
  }
}