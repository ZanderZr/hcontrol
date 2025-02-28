import { Request, Response, Router } from "express";
import Board from "../models/board";

const router = Router();

export const getAllBoard = async (req: Request, res: Response) => {
    
  try {
    const data = await Board.findAll();
    res.json(data);
  } catch (error) {
    console.error("Error al obtener el diario:", error);
    res.status(500).json({ message: "Error al obtener las mediciones." });
  }
};


export const postBoard = async (req: Request, res: Response) => {
  try {
    const board  = req.body;
    await Board.create(board);

    return res.status(201).json(board);
  } catch (error) {
    console.error("❌ Error al guardar el board:", error);
    res.status(400).json({ message: "Error al guardar el board." });
  }
};



export default router;
