import { Email } from './types/email';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

export default async function send(email: Email) {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.FROM,
      pass: process.env.PASSWORD,
    },
  });

  const options = {
    from: process.env.FROM,
    to: email.to,
    subject: email.subject,
    text: email.message,
  };

  await transporter
    .sendMail(options)
    .then()
    .catch((err) => {
      throw new Error(err.message);
    });
}
