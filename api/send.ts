import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const body = await req.json();
    
    // ACTION 1: Send Professional HTML OTP Verification Code
    if (body.action === 'request-otp') {
      const { email, otp } = body;
      
      const data = await resend.emails.send({
        from: 'KSA Tech Identity <security@hello.ksatech.in>',
        to: [email],
        subject: `[KSA Tech] Verification Code: ${otp}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background-color: #fafafa; color: #333333; max-width: 550px; margin: auto; border: 1px solid #e1e8ed; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
            <div style="text-align: center; margin-bottom: 25px;">
              <h2 style="color: #1e40af; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px;">KSA TECH</h2>
              <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1.5px;">Next-Gen IT Infrastructure & Support</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-top: 0;">Hello,</p>
              <p style="font-size: 15px; line-height: 1.6; color: #334155;">To protect our systems and ensure reliable infrastructure routing, please authenticate your contact request using the secure verification token below:</p>
              
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px dashed #cbd5e1; border-radius: 10px; padding: 20px; text-align: center; margin: 25px 0;">
                <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #0f172a; font-family: monospace;">${otp}</span>
                <p style="font-size: 11px; color: #64748b; margin: 8px 0 0 0;">This security code is valid for 10 minutes.</p>
              </div>
              
              <p style="font-size: 13px; line-height: 1.5; color: #64748b; margin-bottom: 0;">If you did not initiate this request on our portal, you can safely disregard this notification.</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0 0 6px 0; font-weight: 600;">KSA TECH & MANAGEMENT CONSULTANCY SERVICES</p>
              <p style="font-size: 10px; color: #94a3b8; margin: 0 0 12px 0;">MSME Reg No: UDYAM-RJ-17-0023660 | 24x7 Enterprise Operations</p>
              <p style="font-size: 9px; color: #cbd5e1; line-height: 1.4; margin: 0;">CONFIDENTIALITY NOTICE: This transmission contains protected privilege variables intended solely for authentication profiles. Unauthorized configuration scanning is explicitly restricted.</p>
            </div>
          </div>
        `,
      });
      return new Response(JSON.stringify(data), { status: 200 });
    }

    // ACTION 2: Send Final Verified Form Data
    if (body.action === 'submit-form') {
      const { name, email, subject, message } = body;

      const data = await resend.emails.send({
        from: 'KSA Tech Operations <notifications@hello.ksatech.in>',
        to: ['info@ksatech.in'], 
        subject: `[Form Sub] ${subject || 'New Enterprise Ticket'}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #1e40af; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">New Verified Portal Inquiry</h2>
            <p style="font-size: 14px;"><strong>Client Name:</strong> ${name}</p>
            <p style="font-size: 14px;"><strong>Verified Email:</strong> <span style="color: #10b981; font-weight: bold;">✓ ${email}</span></p>
            <p style="font-size: 14px;"><strong>Subject Scope:</strong> ${subject}</p>
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 15px;">
              <p style="font-size: 14px; margin-top: 0; font-weight: bold; color: #475569;">Message Payload:</p>
              <p style="font-size: 14px; white-space: pre-wrap; line-height: 1.5; color: #1e293b; margin-bottom: 0;">${message}</p>
            </div>
          </div>
        `,
      });
      return new Response(JSON.stringify(data), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'Invalid operation profile' }), { status: 400 });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
