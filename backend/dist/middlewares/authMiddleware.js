"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware para verificar el token JWT en las solicitudes.
 *
 * @description Verifica si el token JWT es válido. Si es válido, el id del usuario decodificado se guarda en
 * `req.body.userId` para usarlo en las rutas posteriores. Si no es válido o no se proporciona el token,
 * se responde con un error correspondiente.
 *
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @param {NextFunction} next - Función de continuación para pasar al siguiente middleware.
 *
 * @returns {void}
 */
const verifyToken = (req, res, next) => {
    var _a;
    // Obtener el token del encabezado 'Authorization', que se espera en formato 'Bearer <token>'
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    // Si no se proporciona el token, se retorna un error 401
    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó token' });
    }
    // Verificar el token con jwt.verify
    jsonwebtoken_1.default.verify(token, 'jcKey', (err, decoded) => {
        if (err) {
            // Si el token es inválido, responder con error 403
            return res.status(403).json({ message: 'Token inválido' });
        }
        // Si el token es válido, guardar el id del usuario en la solicitud para usarlo en las rutas siguientes
        req.body.userId = decoded.id;
        next(); // Llamar al siguiente middleware o ruta
    });
};
exports.verifyToken = verifyToken;
/**
 * Middleware para analizar el cuerpo de la solicitud y convertirlo en un objeto JSON si el contenido es texto sin procesar.
 *
 * @description Este middleware verifica si el encabezado `Content-Type` es 'application/json'. Si no lo es,
 * intenta analizar el cuerpo de la solicitud manualmente. Si se encuentra un error al analizar el JSON,
 * responde con un error 400. Si la solicitud ya tiene el encabezado correcto, simplemente llama al siguiente middleware.
 *
 * @param {Request} req - Objeto de solicitud de Express.
 * @param {Response} res - Objeto de respuesta de Express.
 * @param {NextFunction} next - Función de continuación para pasar al siguiente middleware.
 *
 * @returns {void}
 */
/* export const parseJsonBody = (req: Request, res: Response, next: NextFunction) => {
  // Verificar si el encabezado 'Content-Type' no es 'application/json'
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    let rawData = ''; // Variable para almacenar los datos sin procesar

    req.setEncoding('utf8'); // Establecer la codificación para leer los datos como texto
    req.on('data', (chunk) => {
      rawData += chunk; // Concatenar los fragmentos de datos
    });
    req.on('end', () => {
      if (rawData) {
        try {
          // Intentar analizar los datos como JSON
          req.body = JSON.parse(rawData);
        } catch (error) {
          console.error('Error al parsear JSON:', error); // Error si el JSON no es válido
          return res.status(400).json({ message: 'JSON inválido' });
        }
      }
      next(); // Llamar al siguiente middleware o ruta
    });
  } else {
    next(); // Si el encabezado ya es 'application/json', simplemente pasar al siguiente middleware
  }
};
 */ 
