import nodemailer from 'nodemailer';
import 'dotenv/config';

export const sendOTPMail = async (otp, email) => {

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
    subject: 'Password reset otp',

    // html:`<p> Your OTP for Password Reset is  <b>${otp}</b> This OTP is valid for 10 mins Only </p>`

    html: `
<div style="font-family: Arial, Helvetica, sans-serif; background:#f4f6f8; padding:30px;">
  <div style="max-width:500px; margin:auto; background:#ffffff; padding:25px; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    
    <h2 style="text-align:center; color:#333;">🔐 Password Reset OTP</h2>
    
    <p style="color:#555; font-size:15px; line-height:1.6;">
      Hello,
    </p>

    <p style="color:#555; font-size:15px; line-height:1.6;">
      You requested to reset your password. Please use the OTP below to continue:
    </p>

    <div style="text-align:center; margin:30px 0;">
      <span style="
        display:inline-block;
        background:#4f46e5;
        color:#ffffff;
        padding:12px 25px;
        font-size:24px;
        letter-spacing:3px;
        border-radius:6px;
        font-weight:bold;
      ">
        ${otp}
      </span>
    </div>

    <p style="color:#555; font-size:14px;">
      ⏰ This OTP is valid for <b>10 minutes</b> only.
    </p>

    <p style="color:#777; font-size:13px; margin-top:25px;">
      If you did not request this, please ignore this email.
    </p>

    <hr style="border:none; border-top:1px solid #eee; margin:25px 0;" />

    <p style="text-align:center; color:#999; font-size:12px;">
      © 2025 Ekart | All rights reserved
    </p>

  </div>
</div>
`

  };

  try {
    await transporter.sendMail(mailConfigurations);
    console.log('OTP Sent Successfully ✅');
  } catch (error) {
   return res.status(500).json({
    success:false,
    message: error.message
   })
  }
};
