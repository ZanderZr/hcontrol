"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../routes/user"));
const diaryData_1 = __importDefault(require("../routes/diaryData"));
const notification_1 = __importDefault(require("../routes/notification"));
const board_1 = __importDefault(require("../routes/board"));
const exercise_1 = __importDefault(require("../routes/exercise")); // Corregido
const routine_1 = __importDefault(require("../routes/routine")); // Corregido
const connection_1 = __importDefault(require("../database/connection"));
const googleAuth_1 = __importDefault(require("../routes/googleAuth"));
const socket_1 = require("../services/socket"); // Ajusta la ruta
//import { parseJsonBody } from "../middlewares/authMiddleware";
const dotenv_1 = __importDefault(require("dotenv")); // Agregar dotenv para las variables de entorno
dotenv_1.default.config(); // Cargar las variables de entorno desde un archivo .env
/**
 * Clase principal del servidor que gestiona la configuración, rutas, middlewares y la conexión a la base de datos.
 */
class Server {
    /**
     * Constructor de la clase Server.
     * Inicializa la aplicación, los middlewares, las rutas y la conexión a la base de datos.
     */
    constructor() {
        this.app = (0, express_1.default)(); // Se inicializa la app
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
        connection_1.default.sync({ force: false }).then(() => {
            const httpServer = this.app.listen(Number(this.PORT), this.HOST, () => console.log(`Server running on http://${this.HOST}:${this.PORT}`));
            (0, socket_1.initSocket)(httpServer);
        }).catch((error) => {
            console.error("Error al sincronizar la base de datos:", error);
        });
    }
    /**
     * Método que define las rutas de la API.
     * Establece las rutas para los distintos recursos (usuarios, ejercicios, etc.).
     */
    routes() {
        this.app.get("/", (req, res) => {
            res.json({ msg: "API works" });
        });
        this.app.use("/api/users", user_1.default);
        this.app.use("/api/diary", diaryData_1.default);
        this.app.use("/api/exercises", exercise_1.default);
        this.app.use("/api/routines", routine_1.default);
        this.app.use("/api/notifications", notification_1.default);
        this.app.use("/api/boards", board_1.default);
        this.app.use("/api/google", googleAuth_1.default);
    }
    /**
     * Método que configura los middlewares.
     * Incluye el parseo del cuerpo de las solicitudes y la habilitación de CORS.
     */
    middlewares() {
        //this.app.use(parseJsonBody); // Middleware custom para parsear cuerpo de solicitudes
        this.app.use(express_1.default.json()); // Middleware para JSON en el cuerpo de las solicitudes
        this.app.use((0, cors_1.default)()); // Habilitar CORS
        this.app.use(express_1.default.urlencoded({ extended: true })); // 🔥 Necesario para leer `credential`
    }
    /**
     * Método que establece la conexión a la base de datos.
     * Realiza la autenticación con la base de datos y maneja posibles errores.
     */
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Base de datos conectada");
            }
            catch (error) {
                console.error("Error al conectar la base de datos:", error);
            }
        });
    }
    /**
     * Middleware global de manejo de errores.
     * Captura y maneja los errores no controlados de la aplicación.
     * @param {any} err El error que ocurrió.
     * @param {Request} req La solicitud HTTP.
     * @param {Response} res La respuesta HTTP.
     * @param {NextFunction} next La siguiente función de middleware.
     */
    errorHandler(err, req, res, next) {
        console.error(err.stack);
        res.status(500).json({ message: "Algo salió mal", error: err.message });
    }
}
// Crear instancia y arrancar servidor
exports.default = Server;
