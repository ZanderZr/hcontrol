import express, { Request, Response } from 'express';
import DiaryData from '../models/diaryData';

const router = express.Router();

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
        const data = await DiaryData.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        console.error("Error al crear el diario:", error);
        res.status(400).json({ message: "Error al crear el diario." });
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