import nodemailer from 'nodemailer';

/**
 * Email Service utility for sending transactional emails.
 * In development, this uses a mock Ethereal Email account.
 * In production, configure SMTP credentials via environment variables.
 */

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'mock_user',
    pass: process.env.EMAIL_PASS || 'mock_pass',
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const mailOptions = {
      from: `"SRN NGO" <${process.env.EMAIL_FROM || 'no-reply@srn.org'}>`,
      to,
      subject,
      html,
    };

    if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_HOST) {
      console.log('---------------------------------------');
      console.log(`Email Sent to: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Content: ${html}`);
      console.log('---------------------------------------');
      return { messageId: 'mock_id' };
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Email Send Error:', error);
    throw new Error('Failed to send email');
  }
};
