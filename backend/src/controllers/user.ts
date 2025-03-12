import { Request, Response, Router } from 'express';
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const router = Router();

// Clave secreta para JWT desde variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // Define estas variables en el .env
    pass: process.env.EMAIL_PASS
  }
});

/**
 * @description Inicia sesión de un usuario.
 * @route POST /login
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @returns {Object} - Devuelve un objeto con el token JWT y los datos del usuario.
 * @throws {401} - Si las credenciales son incorrectas.
 * @throws {500} - Si ocurre un error en el servidor.
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });
      if (!user.verified) return res.status(401).json({ message: 'No verficado' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Credenciales incorrectas' });

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

      // 🔥 Devolver también los datos del usuario junto con el token
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        }
      });

  } catch (error) {
      console.error("Error en el login:", error);
      res.status(500).json({ message: "Error en el servidor." });
  }
};
export const registerUser = async (req: Request, res: Response) => {
  try {
      const { email, username, password, role } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        username,
        password: hashedPassword,
        role,
        verified: false  // Asegúrate de tener este campo en tu modelo User
      });

      // Generar token de verificación
      const verifyToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

      // Enviar email con enlace de verificación
      const verifyLink = `http://localhost:4200/verify-email?token=${verifyToken}`;

      // Aquí verificamos si el transporte de correo se creó correctamente
      const emailSent = await transporter.sendMail({
        from: '"Mi App" <tuemail@gmail.com>',
        to: email,
        subject: "Verifica tu cuenta",
        html: `<p>Haz clic en este enlace para verificar tu cuenta: <a href="${verifyLink}">Verificar</a></p>`
      });

      // Verificar si se envió el correo exitosamente
      if (!emailSent) {
        console.log("Error al enviar el correo de verificación.");
        return res.status(500).json({ message: "Error al enviar el correo de verificación." });
      }

      res.status(201).json({ message: "Usuario registrado, revisa tu correo para verificar tu cuenta." });

  } catch (error) {
      console.error("Error en el registro:", error);
      res.status(400).json({ message: "Error al registrar usuario." });
  }
};


export const verifyEmail = async (req: Request, res: Response) => {
  try {
      const { token } = req.query;

      if (!token) return res.status(400).json({ message: "Token requerido" });

      const decoded = jwt.verify(token as string, JWT_SECRET) as { email: string };
      const user = await User.findOne({ where: { email: decoded.email } });

      if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

      user.verified = true;
      await user.save();

      res.json({ message: "Email verificado con éxito" });

  } catch (error) {
      console.error("Error en la verificación:", error);
      res.status(400).json({ message: "Token inválido o expirado" });
  }
};


export default router;
