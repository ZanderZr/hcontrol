import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer;

/**
 * @function initSocket
 * @description Inicializa el servidor de WebSockets con configuración CORS.
 * @param {any} httpServer - Servidor HTTP al que se adjuntará Socket.io.
 */
export const initSocket = (httpServer: any) => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  /**
   * Evento de conexión de un nuevo cliente.
   */
  io.on("connection", (socket) => {

    /**
     * @event register
     * @description Asigna un usuario a una sala específica basada en su ID.
     * @param {number} userId - ID del usuario que se conecta.
     */
    socket.on("register", (userId: number) => {
      socket.join(userId.toString());
    });

  });
};

export { io };
