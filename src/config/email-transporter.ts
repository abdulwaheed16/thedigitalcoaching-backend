import nodemailer from 'nodemailer';

console.log('Nodemailer', nodemailer);

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MANAGER_EMAIL,
    pass: process.env.MANAGER_EMAIL_PASSWORD,
  },
});
