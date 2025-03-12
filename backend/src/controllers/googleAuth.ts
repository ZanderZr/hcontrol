import jwt from "jsonwebtoken";
import { Request, Response, Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/user'; // Asegúrate de que la ruta al modelo User sea correcta
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Usar variable de entorno para CLIENT_ID
const JWT_SECRET = process.env.JWT_SECRET;

export const authGoogle = async (req: Request, res: Response) => {
    console.log('Solicitud recibida desde Google Sign-In');
    console.log('Query Params:', req.query);

    const credential = req.body.credential || req.query.credential;
    console.log('Credential:', credential);

    if (!CLIENT_ID) {
        console.error('GOOGLE_CLIENT_ID no está configurado en las variables de entorno.');
        return res.status(500).send('Internal Server Error');
    }

    const client = new OAuth2Client(CLIENT_ID);

    async function verify() {
        try {
            const ticket = await client.verifyIdToken({
                idToken: credential as string,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                throw new Error('Invalid token payload');
            }
            const userId = payload['sub'];
            console.log('User ID:', userId);
            console.log('Payload:', payload);
            return payload;
        } catch (error) {
            console.error('Error verifying token:', error);
            throw error; // Re-lanzar el error para que el bloque try...catch exterior lo maneje
        }
    }

    try {
        const payload = await verify();

        // Crear o buscar el usuario
        const [user, created] = await User.findOrCreate({
            where: { email: payload.email },
            defaults: {
                username: payload.name,
                password: uuidv4(),
                role: 'USER',
                verified: true,
            },
        });

        if (created) {
            console.log(`Usuario ${user.email} creado.`);
        } else {
            console.log(`Usuario ${user.email} encontrado.`);
        }

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables.');
        }
        const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              username: user.username, // ✅ Agregar username
              role: user.role,         // ✅ Agregar role
              verified: user.verified  // ✅ Agregar verified
            },
            JWT_SECRET,
            { expiresIn: '1h' }
          );
          

        // 🔥 Redirigir con el token en la URL
        res.redirect(`http://localhost:4200/auth/callback?token=${token}`);
    } catch (error) {
        console.error('Error verifying token or creating user:', error);
        res.status(401).send('Unauthorized');
    }
};

export default router;
