"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io = null;
/**
 * @function initSocket
 * @description Inicializa el servidor de WebSockets con configuración CORS.
 * @param {any} httpServer - Servidor HTTP al que se adjuntará Socket.io.
 */
const initSocket = (httpServer) => {
    if (!io) {
        io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        console.log("✅ Socket.IO inicializado");
        io.on("connection", (socket) => {
            console.log(`🔌 Cliente conectado: ${socket.id}`);
            /**
             * @event register
             * @description Asigna un usuario a una sala específica basada en su ID.
             * @param {number | string} userId - ID del usuario que se conecta.
             */
            socket.on("register", (userId) => {
                const room = userId.toString();
                socket.join(room);
                console.log(`👤 Usuario ${userId} registrado en sala ${room}`);
            });
            socket.on("disconnect", () => {
                console.log(`❌ Cliente desconectado: ${socket.id}`);
            });
        });
    }
};
exports.initSocket = initSocket;
/**
 * @function getIO
 * @description Devuelve la instancia de Socket.IO ya inicializada.
 * @throws {Error} Si Socket.IO no ha sido inicializado.
 */
const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO no ha sido inicializado. Llama a initSocket primero.");
    }
    return io;
};
exports.getIO = getIO;
