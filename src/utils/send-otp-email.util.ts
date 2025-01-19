import { transporter } from 'src/config/email-transporter';

export const sendOtpByEmail = async (to: string, otp: string) => {
  const mailOptions = {
    from: process.env.MANAGER_EMAIL,
    to: to,
    subject: 'OTP Verification',
    text: `Your OTP code is ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { messageId: info?.messageId };
  } catch (error) {
    console.error('Error while sending OTP by email: ', error);
  }
};
