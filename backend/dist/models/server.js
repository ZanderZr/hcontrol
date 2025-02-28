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
const socket_1 = require("../services/socket"); // ajusta la ruta
const authMiddleware_1 = require("../middlewares/authMiddleware");
// Definición de la clase Server
class Server {
    constructor() {
        this.app = (0, express_1.default)(); // Se inicializa la app
        this.HOST = process.env.HOST || "localhost";
        this.PORT = process.env.PORT || 3001;
        this.middlewares(); // Método de parseo antes que las rutas
        this.routes();
        this.dbConnect();
        this.listen();
    }
    // Método 'listen' para iniciar el servidor
    listen() {
        connection_1.default.sync().then(() => {
            const httpServer = this.app.listen(Number(this.PORT), this.HOST, () => console.log(`Server running on http://${this.HOST}:${this.PORT}`));
            (0, socket_1.initSocket)(httpServer);
        });
    }
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
    }
    middlewares() {
        this.app.use(authMiddleware_1.parseJsonBody);
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
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
}
exports.default = Server;
