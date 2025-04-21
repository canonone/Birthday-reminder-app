import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { User } from './entities/user.entity';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendBirthdayEmail(user: User): Promise<void> {
    const mailOptions = {
      from: `"Birthday Wishes" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: `Happy Birthday, ${user.username}! 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <h1 style="color: #1f2937; text-align: center;">Happy Birthday, ${user.username}!</h1>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            Wishing you a fantastic year ahead filled with joy, success, and unforgettable moments! Thank you for being a valued customer. 🎂
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <img src="https://via.placeholder.com/150?text=🎈" alt="Birthday Balloon" style="border-radius: 8px;" />
          </div>
          <p style="color: #4b5563; font-size: 16px; text-align: center;">
            Warmest wishes,<br />
            The Birthday Reminder Team
          </p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Birthday email sent to ${user.email}`);
    } catch (error) {
      console.error(`Error sending email to ${user.email}:`, error);
      throw error;
    }
  }
}
