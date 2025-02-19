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


const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Acceso denegado' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Token inválido' });
      (req as any).user = decoded;
      next();
  });
};


export const loginUser = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Credenciales incorrectas' });

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
  } catch (error) {
      console.error("Error en el login:", error);
      res.status(500).json({ message: "Error en el servidor." });
  }
};

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