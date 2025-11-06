import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, email, phone, city, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CARMOTION" <${process.env.EMAIL_USER}>`,
      to: "nicodf87@gmail.com",
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h3>Nuevo mensaje desde el formulario</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Ciudad:</strong> ${city}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ success: false });
  }
});

export default router;
