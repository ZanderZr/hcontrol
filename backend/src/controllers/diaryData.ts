import { Request, Response, Router } from 'express';
import DiaryData from '../models/diaryData';
import { Op } from "sequelize";

const router = Router();

export const getAllDiary = async (req: Request, res: Response) => {
    const { id } = req.params; // Obtener el id de los parámetros de la solicitud

 try {
    const data = await DiaryData.findAll({ where: { idUser: id } });
    res.json(data);
 } catch (error){
    console.error("Error al obtener el diario:", error);
    res.status(500).json({ message: "Error al obtener las mediciones." });
 } 
};

export const getDiary = async (req: Request, res: Response) => {
    try {
        const data = await DiaryData.findByPk(req.params.id);
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener el diario." });
    }
};

export const postDiary = async (req: Request, res: Response) => {
    try {
        const { idUser, data, timestamp } = req.body;

        // Convertir timestamp a formato 'YYYY-MM-DD' para comparar solo la fecha
        const dateOnly = new Date(timestamp).toISOString().split("T")[0];

        // Buscar si ya existe una entrada con el mismo idUser y la misma fecha
        const existingDiary = await DiaryData.findOne({
            where: {
                idUser,
                timestamp: {
                    [Op.between]: [`${dateOnly} 00:00:00`, `${dateOnly} 23:59:59`]
                }
            }
        });

        if (existingDiary) {
            // Si existe, actualizar el contenido del diario
            existingDiary.data = data;
            await existingDiary.save();
            return res.status(200).json(existingDiary);
        } else {
            // Si no existe, crear un nuevo registro
            const newDiary = await DiaryData.create(req.body);
            return res.status(201).json(newDiary);
        }
    } catch (error) {
        console.error("❌ Error al guardar el diario:", error);
        res.status(400).json({ message: "Error al guardar el diario." });
    }
};

export const deleteDiary = async (req: Request, res: Response) => {
    try {
        const data = await DiaryData.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        await data.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar el diario:", error);
        res.status(500).json({ message: "Error al eliminar el diario." });
    }
};

export default router;