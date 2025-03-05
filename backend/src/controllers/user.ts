import { NextFunction, Request, Response, Router } from 'express';
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = Router();

// Clave secreta para JWT desde variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}

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

/**
 * @description Registra un nuevo usuario.
 * @route POST /register
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.username - El nombre de usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {string} req.body.role - El rol del usuario.
 * @returns {Object} - Devuelve un mensaje de éxito con el ID del usuario creado.
 * @throws {400} - Si ocurre un error al registrar el usuario.
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
      const { email, username, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, username, password: hashedPassword, role });
      res.status(201).json({ message: 'Usuario creado', userId: newUser.id });
  } catch (error) {
      console.error("Error en el registro:", error);
      res.status(400).json({ message: "Error al registrar usuario." });
  }
};

export default router;
