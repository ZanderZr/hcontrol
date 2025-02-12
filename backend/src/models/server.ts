import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRoutes from "../routes/user";
import diaryRoutes from "../routes/diaryData";
import exerciseRoutes from "../routes/exercise"; // Corregido
import routineRoutes from "../routes/routine"; // Corregido
import database from "../database/connection";

// Definición de la clase Server
class Server {
  private app: Application;
  private HOST: string;
  private PORT: string | number;

  constructor() {
    this.app = express(); // Se inicializa la app
    this.HOST = process.env.HOST || "loscalhost";
    this.PORT = process.env.PORT || 3001;

    this.middlewares(); // Método de parseo antes que las rutas
    this.routes();
    this.dbConnect();
    this.listen();
  }

  // Método 'listen' para iniciar el servidor
  listen() {
    database.sync().then(() => {
      this.app.listen(Number(this.PORT), this.HOST, () =>
        console.log(`Server running on http://${this.HOST}:${this.PORT}`)
      );
    });
  }

  routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ msg: "API works" });
    });

    this.app.use("/api/users", userRoutes);
    this.app.use("/api/diary", diaryRoutes);
    this.app.use("/api/exercises", exerciseRoutes);
    this.app.use("/api/routines", routineRoutes);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await database.authenticate();
      console.log("Base de datos conectada");
    } catch (error) {
      console.error("Error al conectar la base de datos:", error);
    }
  }
}

export default Server;
