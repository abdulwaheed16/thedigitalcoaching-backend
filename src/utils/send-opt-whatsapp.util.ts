import { twilioClient } from 'src/config/twilio-client';

export const sendWhatsAppOtp = async (to: string, otp: string) => {
  try {
    const message = await twilioClient.messages.create({
      body: `Your OTP code is ${otp}`,
      from: 'whatsapp:+92 3020540730',
      to: `whatsapp:${to}`,
    });
    return { message: `message sent ${message?.sid}` };
  } catch (error) {
    console.error('Error while sending OTP on whatsapp: ', error);
  }
};
