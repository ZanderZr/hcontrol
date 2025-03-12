import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "../routes/user";
import diaryRoutes from "../routes/diaryData";
import notificationRoutes from "../routes/notification";
import boardRoutes from "../routes/board";
import exerciseRoutes from "../routes/exercise"; // Corregido
import routineRoutes from "../routes/routine"; // Corregido
import database from "../database/connection";
import googleRoutes from "../routes/googleAuth";

import { initSocket } from "../services/socket"; // Ajusta la ruta
//import { parseJsonBody } from "../middlewares/authMiddleware";
import dotenv from "dotenv"; // Agregar dotenv para las variables de entorno

dotenv.config(); // Cargar las variables de entorno desde un archivo .env
/**
 * Clase principal del servidor que gestiona la configuración, rutas, middlewares y la conexión a la base de datos.
 */
class Server {
  private app: Application;
  private HOST: string;
  private PORT: string | number;

  /**
   * Constructor de la clase Server.
   * Inicializa la aplicación, los middlewares, las rutas y la conexión a la base de datos.
   */
  constructor() {
    this.app = express(); // Se inicializa la app
    this.HOST = process.env.HOST || "localhost";
    this.PORT = process.env.PORT || 3001;

    this.middlewares();
    this.routes();
    this.dbConnect();
    this.listen();
  }

  /**
   * Método que inicia el servidor.
   * Se conecta a la base de datos y luego arranca el servidor HTTP.
   */
  listen() {
    database.sync({ force: false }).then(() => {  // Asegúrate de no forzar la re-creación de tablas
      const httpServer = this.app.listen(Number(this.PORT), this.HOST, () =>
        console.log(`Server running on http://${this.HOST}:${this.PORT}`)
      );
      initSocket(httpServer);
    }).catch((error) => {
      console.error("Error al sincronizar la base de datos:", error);
    });
  }

  /**
   * Método que define las rutas de la API.
   * Establece las rutas para los distintos recursos (usuarios, ejercicios, etc.).
   */
  routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ msg: "API works" });
    });
 

    this.app.use("/api/users", userRoutes);
    this.app.use("/api/diary", diaryRoutes);
    this.app.use("/api/exercises", exerciseRoutes);
    this.app.use("/api/routines", routineRoutes);
    this.app.use("/api/notifications", notificationRoutes);
    this.app.use("/api/boards", boardRoutes);
    this.app.use("/api/google", googleRoutes);

  }

  /**
   * Método que configura los middlewares.
   * Incluye el parseo del cuerpo de las solicitudes y la habilitación de CORS.
   */
  middlewares() {
    //this.app.use(parseJsonBody); // Middleware custom para parsear cuerpo de solicitudes
    this.app.use(express.json()); // Middleware para JSON en el cuerpo de las solicitudes
    this.app.use(cors()); // Habilitar CORS
    this.app.use(express.urlencoded({ extended: true })); // 🔥 Necesario para leer `credential`
  }

  /**
   * Método que establece la conexión a la base de datos.
   * Realiza la autenticación con la base de datos y maneja posibles errores.
   */
  async dbConnect() {
    try {
      await database.authenticate();
      console.log("Base de datos conectada");
    } catch (error) {
      console.error("Error al conectar la base de datos:", error);
    }
  }

  /**
   * Middleware global de manejo de errores.
   * Captura y maneja los errores no controlados de la aplicación.
   * @param {any} err El error que ocurrió.
   * @param {Request} req La solicitud HTTP.
   * @param {Response} res La respuesta HTTP.
   * @param {NextFunction} next La siguiente función de middleware.
   */
  errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({ message: "Algo salió mal", error: err.message });
  }
}

// Crear instancia y arrancar servidor
export default Server;
