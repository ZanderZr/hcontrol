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

export const parseJsonBody = (req: Request, res: Response, next: NextFunction) => {
  // Si el header no es application/json
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    let rawData = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      rawData += chunk;
    });
    req.on('end', () => {
      if (rawData) {
        try {
          req.body = JSON.parse(rawData);
        } catch (error) {
          console.error('Error al parsear JSON:', error);
          return res.status(400).json({ message: 'JSON inválido' });
        }
      }
      next();
    });
  } else {
    next();
  }
};
