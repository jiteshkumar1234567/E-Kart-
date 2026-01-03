import nodemailer from 'nodemailer';
import 'dotenv/config';

export const verifyEmail = async (token, email) => {

  if (!email) {
    console.log("Email error: recipient email missing");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,   // ✅ VARIABLE
    to: email,                     // ✅ VARIABLE
    subject: 'Email Verification',
//     text: `Hi! There,

// You have recently visited our website and entered your email.
// Please follow the given link to verify your email:

// http://localhost:5173/verify/${token}

// Thanks`

html: `
<div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:30px;">
  <div style="max-width:520px; margin:auto; background:#ffffff; padding:25px 30px; border-radius:10px; box-shadow:0 6px 18px rgba(0,0,0,0.12);">
    
    <h2 style="text-align:center; color:#2c3e50;">📧 Email Verification</h2>

    <p style="color:#555; font-size:15px; line-height:1.7;">
      Hi there 👋,
    </p>

    <p style="color:#555; font-size:15px; line-height:1.7;">
      Thank you for registering with us! To complete your account setup,
      please verify your email address by clicking the button below.
    </p>

    <div style="text-align:center; margin:30px 0;">
      <a href="https://e-kart-2vqj.onrender.com/verify/${token}"
         style="
           background:#4f46e5;
           color:#ffffff;
           text-decoration:none;
           padding:12px 28px;
           font-size:16px;
           border-radius:6px;
           display:inline-block;
           font-weight:bold;
         ">
        Verify Email
      </a>
    </div>

    <p style="color:#555; font-size:14px;">
      ⏰ This verification link will expire in <b>10 minutes</b>.
    </p>

    <p style="color:#777; font-size:13px; margin-top:20px;">
      If you did not create this account, please ignore this email.
    </p>

    <hr style="border:none; border-top:1px solid #eee; margin:25px 0;" />

    <p style="text-align:center; color:#999; font-size:12px;">
      © 2025 Ekart • All rights reserved
    </p>

  </div>
</div>
`

  };

  try {
    await transporter.sendMail(mailConfigurations);
    console.log('Email Sent Successfully ✅');
  } catch (error) {
    console.log("Email error:", error.message);
  }
};
