import { Request, Response, Router } from 'express';
import Exercise from '../models/exercise';

const router = Router();

export const getAllExercise = async (req: Request, res: Response) => {
    try {
        const data = await Exercise.findAll();
        res.json(data);
    } catch (error) {
        console.error("Error al obtener los ejercicios:", error);
        res.status(500).json({ message: "Error al obtener los ejercicios." });
    }
};

export const getExercise = async (req: Request, res: Response) => {
    try {
        const data = await Exercise.findByPk(req.params.id);
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (error) {
        console.error("Error al obtener el ejercicio:", error);
        res.status(500).json({ message: "Error al obtener el ejercicio." });
    }
};

export const postExercise = async (req: Request, res: Response) => {
    try {
        const data = await Exercise.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        console.error("Error al crear el ejercicio:", error);
        res.status(400).json({ message: "Error al crear el ejercicio." });
    }
};

export const putExercise = async (req: Request, res: Response) => {
    try {
        const data = await Exercise.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        await data.update(req.body);
        res.json(data);
    } catch (error) {
        console.error("Error al actualizar el ejercicio:", error);
        res.status(500).json({ message: "Error al actualizar el ejercicio." });
    }
};

export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const data = await Exercise.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        await data.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar el ejercicio:", error);
        res.status(500).json({ message: "Error al eliminar el ejercicio." });
    }
};

export default router;
