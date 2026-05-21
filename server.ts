import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { Resend } from 'resend';
import cors from 'cors';

// Use the API key provided by the user, or fallback to env
const resend = new Resend(process.env.RESEND_API_KEY || 're_JcYcUtaX_4FWnSwbS3xhsPsLZXZe8hEWv');

// In-memory OTP store (email -> { otp, data, expiresAt })
const otpStore = new Map<string, { otp: string, data: any, expiresAt: number }>();

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Professional Email Template Wrapper with KSA Branding
const getEmailTemplate = (title: string, content: string) => `
  <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; border: 1px solid #2A2415; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #111111; padding: 32px 24px; text-align: center; border-bottom: 1px solid #2A2415;">
      <h1 style="color: #D4AF37; margin: 0; font-size: 28px; letter-spacing: 2px;">KSA TECH</h1>
      <p style="color: #D4AF37; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 4px;">Komal Sharma Associates</p>
    </div>
    <div style="padding: 40px 32px; background-color: #050505;">
      <h2 style="color: #ffffff; margin-top: 0; font-size: 20px; font-weight: 600;">${title}</h2>
      <div style="color: #cccccc; line-height: 1.6; font-size: 15px;">
        ${content}
      </div>
    </div>
    <div style="background-color: #111111; padding: 24px; text-align: center; border-top: 1px solid #2A2415; font-size: 12px; color: #666666; line-height: 1.5;">
      &copy; ${new Date().getFullYear()} KSA Tech. All rights reserved.<br/>
      MSME: UDYAM-RJ-17-0023660<br/>
      <a href="mailto:info@ksatech.in" style="color: #D4AF37; text-decoration: none;">info@ksatech.in</a>
    </div>
  </div>
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes FIRST
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Step 1: Request OTP
  app.post('/api/contact/request-otp', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required' });
      }

      const otp = generateOTP();
      otpStore.set(email, {
        otp,
        data: { name, email, subject, message },
        expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
      });

      const { data, error } = await resend.emails.send({
        from: 'KSA Tech <contact@hello.ksatech.in>',
        to: [email],
        subject: 'Verify your email - KSA Tech',
        html: getEmailTemplate(
          'Email Verification Required',
          `<p>Hello ${name},</p>
           <p>Thank you for reaching out to KSA Tech. To ensure we have your correct email address and to prevent spam, please use the following One-Time Password (OTP) to verify your request:</p>
           <div style="background-color: #111111; border: 1px dashed #D4AF37; padding: 20px; text-align: center; margin: 32px 0; font-size: 32px; font-weight: bold; color: #D4AF37; letter-spacing: 8px; border-radius: 4px;">
             ${otp}
           </div>
           <p style="font-size: 13px; color: #888888;">This code will expire in 10 minutes.</p>
           <p style="font-size: 13px; color: #888888;">If you did not request this, please ignore this email.</p>`
        ),
      });

      if (error) {
        console.error('Resend API Error (OTP):', error);
        return res.status(400).json({ success: false, error: error.message });
      }

      res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error: any) {
      console.error('Server Error:', error);
      res.status(500).json({ success: false, error: error.message || 'Failed to send OTP' });
    }
  });

  // Step 2: Verify OTP and Send Final Email
  app.post('/api/contact/verify-otp', async (req, res) => {
    try {
      const { email, otp } = req.body;
      
      const record = otpStore.get(email);
      if (!record) {
        return res.status(400).json({ success: false, error: 'No OTP request found for this email or it has expired.' });
      }

      if (Date.now() > record.expiresAt) {
        otpStore.delete(email);
        return res.status(400).json({ success: false, error: 'OTP has expired. Please request a new one.' });
      }

      if (record.otp !== otp) {
        return res.status(400).json({ success: false, error: 'Invalid OTP code.' });
      }

      // OTP is valid, send the actual email to info@ksatech.in
      const { name, subject, message } = record.data;

      const { data, error } = await resend.emails.send({
        from: 'KSA Tech Website <contact@hello.ksatech.in>',
        to: ['info@ksatech.in'],
        replyTo: email,
        subject: `New Verified Lead: ${subject || 'No Subject'}`,
        html: getEmailTemplate(
          'New Contact Form Submission',
          `<div style="display: inline-block; background-color: rgba(0, 255, 0, 0.1); color: #00FF00; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-bottom: 24px; border: 1px solid rgba(0, 255, 0, 0.2);">
             ✓ EMAIL VERIFIED VIA OTP
           </div>
           <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
             <tr>
               <td style="padding: 8px 0; border-bottom: 1px solid #2A2415; color: #888888; width: 100px;">Name</td>
               <td style="padding: 8px 0; border-bottom: 1px solid #2A2415; color: #ffffff; font-weight: 500;">${name}</td>
             </tr>
             <tr>
               <td style="padding: 8px 0; border-bottom: 1px solid #2A2415; color: #888888;">Email</td>
               <td style="padding: 8px 0; border-bottom: 1px solid #2A2415; color: #ffffff; font-weight: 500;">${email}</td>
             </tr>
             <tr>
               <td style="padding: 8px 0; border-bottom: 1px solid #2A2415; color: #888888;">Subject</td>
               <td style="padding: 8px 0; border-bottom: 1px solid #2A2415; color: #ffffff; font-weight: 500;">${subject}</td>
             </tr>
           </table>
           <h3 style="color: #D4AF37; margin-top: 32px; margin-bottom: 16px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
           <div style="background-color: #111111; padding: 20px; border-radius: 4px; border: 1px solid #2A2415; white-space: pre-wrap; color: #cccccc;">${message}</div>`
        ),
      });

      if (error) {
        console.error('Resend API Error (Final Email):', error);
        return res.status(400).json({ success: false, error: error.message });
      }

      // Clear OTP
      otpStore.delete(email);

      res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error: any) {
      console.error('Server Error:', error);
      res.status(500).json({ success: false, error: error.message || 'Failed to verify OTP and send email' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
