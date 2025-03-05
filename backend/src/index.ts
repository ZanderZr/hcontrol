import Server from "./models/server";
import dotenv from 'dotenv';

// Carga las variables de entorno desde un archivo .env
dotenv.config();

// Inicializa el servidor
const server = new Server();
