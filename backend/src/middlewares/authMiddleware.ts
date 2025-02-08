import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Suponiendo que el token se envía como 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token' });
  }

  jwt.verify(token, 'jcKey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    // Guardar el id del usuario decodificado en la request para usar en las siguientes rutas
    req.body.userId = (decoded as any).id;
    next();
  });
};
