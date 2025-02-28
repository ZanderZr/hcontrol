import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer;

export const initSocket = (httpServer: any) => {
  io = new SocketIOServer(httpServer);
  io.on("connection", (socket) => {
    socket.on("register", (userId: number) => {
      socket.join(userId.toString());
    });
  });
};

export { io };
