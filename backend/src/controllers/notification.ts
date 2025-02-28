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

    io.to(body.idReceiver.toString()).emit("new-notification", body);
    await Notification.create(body);

    return res.status(201).json(body);
  } catch (error) {
    console.error("❌ Error al guardar la notificación:", error);
    res.status(400).json({ message: "Error al guardar la notificación." });
  }
};


export default router;
