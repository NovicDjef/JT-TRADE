import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, country, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"JT TRADE AND SERVICES - Site Web" <${process.env.GMAIL_USER}>`,
      to: "novicmelataguia@gmail.com",
      replyTo: email,
      subject: `Nouveau message de ${name} - ${service || "Contact general"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #DC2626, #1E3A8A); padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Nouveau Message Client</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">JT TRADE AND SERVICES - Site Web</p>
          </div>

          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151; width: 140px;">Nom complet</td>
                <td style="padding: 12px; border-bottom: 1px solid #f3f4f6; color: #111827;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Email</td>
                <td style="padding: 12px; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${email}" style="color: #DC2626;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Telephone</td>
                <td style="padding: 12px; border-bottom: 1px solid #f3f4f6;"><a href="tel:${phone}" style="color: #DC2626;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Service</td>
                <td style="padding: 12px; border-bottom: 1px solid #f3f4f6; color: #111827;">${service || "Non specifie"}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Pays</td>
                <td style="padding: 12px; border-bottom: 1px solid #f3f4f6; color: #111827;">${country || "Non specifie"}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 16px; background: #f9fafb; border-radius: 8px;">
              <p style="font-weight: bold; color: #374151; margin: 0 0 8px;">Message :</p>
              <p style="color: #111827; margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
          </div>

          <div style="background: #f3f4f6; padding: 16px; text-align: center;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              Ce message a ete envoye depuis le formulaire de contact du site j2travel.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message. Veuillez reessayer." },
      { status: 500 }
    );
  }
}
