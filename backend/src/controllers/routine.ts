import { Request, Response, Router } from 'express';
import Routine from '../models/routine';

const router = Router();

export const getAllRoutine = async (req: Request, res: Response) => {
    try {
        const data = await Routine.findAll();
        res.json(data);
    } catch (error) {
        console.error("Error al obtener las rutinas:", error);
        res.status(500).json({ message: "Error al obtener las rutinas." });
    }
};

export const getRoutine = async (req: Request, res: Response) => {
    try {
        const data = await Routine.findByPk(req.params.id);
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Not Found');
        }
    } catch (error) {
        console.error("Error al obtener la rutina:", error);
        res.status(500).json({ message: "Error al obtener la rutina." });
    }
};

export const postRoutine = async (req: Request, res: Response) => {
    try {
        const data = await Routine.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        console.error("Error al crear la rutina:", error);
        res.status(400).json({ message: "Error al crear la rutina." });
    }
};

export const putRoutine = async (req: Request, res: Response) => {
    try {
        const data = await Routine.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        await data.update(req.body);
        res.json(data);
    } catch (error) {
        console.error("Error al actualizar la rutina:", error);
        res.status(500).json({ message: "Error al actualizar la rutina." });
    }
};

export const deleteRoutine = async (req: Request, res: Response) => {
    try {
        const data = await Routine.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');
        }
        await data.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar la rutina:", error);
        res.status(500).json({ message: "Error al eliminar la rutina." });
    }
};

export default router;
