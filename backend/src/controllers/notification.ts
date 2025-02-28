import { Request, Response, Router } from "express";
import Notification from "../models/notification";
import { io } from "../services/socket"; // asegúrate de exportar la instancia de Socket.IO

const router = Router();

export const getAllNotification = async (req: Request, res: Response) => {
  const { idReceiver } = req.params; // Obtener el id de los parámetros de la solicitud

  try {
    const data = await Notification.findAll({
      where: { idReceiver: idReceiver },
    });
    res.json(data);
  } catch (error) {
    console.error("Error al obtener el diario:", error);
    res.status(500).json({ message: "Error al obtener las mediciones." });
  }
};


export const postNotifications = async (req: Request, res: Response) => {
    try {
      const body = req.body;
  
      // Validar que el emisor y el receptor sean diferentes
      if (body.idEmitter === body.idReceiver) {
        return res.status(200).json({ message: "El emisor y receptor no pueden ser el mismo." });
      }
  
      // Buscar si ya existe una notificación con los mismos datos
      const existingNotification = await Notification.findOne({
        where: {
          idEmitter: body.idEmitter,
          idReceiver: body.idReceiver,
          description: body.description,
        }
      });
  
      if (existingNotification) {
        return res.status(200).json({
          message: "La notificación ya existe",
          notification: existingNotification
        });
      }
    
      // Crear la notificación
      const notification = await Notification.create(body);
  
      // 📡 Emitir evento en tiempo real SOLO al usuario con idReceiver
      io.to(`user_${body.idReceiver}`).emit("new_notification", notification);
  
      return res.status(201).json(notification);
    } catch (error) {
      console.error("❌ Error al guardar la notificación:", error);
      res.status(400).json({ message: "Error al guardar la notificación." });
    }
  };
  
  export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const data = await Notification.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        await data.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar la notificacion:", error);
        res.status(500).json({ message: "Error al eliminar la notificacion." });
    }
};


export default router;
