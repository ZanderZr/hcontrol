import { Request, Response, Router } from "express";
import Board from "../models/board";

const router = Router();

/**
 * @description Obtiene todos los "boards" desde la base de datos y los devuelve en formato JSON.
 * @route GET /boards
 * @returns {Array} - Lista de objetos board.
 * @throws {500} - Si ocurre un error al obtener los datos.
 */
export const getAllBoard = async (req: Request, res: Response) => {
  try {
    const data = await Board.findAll();  // Obtiene todos los boards de la base de datos
    res.json(data);  // Devuelve los boards en formato JSON
  } catch (error) {
    console.error("Error al obtener el diario:", error);
    res.status(500).json({ message: "Error al obtener las mediciones." });  // En caso de error, devuelve código 500
  }
};

/**
 * @description Crea un nuevo "board" y lo guarda en la base de datos.
 * @route POST /boards
 * @param {Object} req.body - El cuerpo de la solicitud debe contener los datos del nuevo board.
 * @returns {Object} - El objeto board creado.
 * @throws {400} - Si ocurre un error al guardar el board.
 */
export const postBoard = async (req: Request, res: Response) => {
  try {
    const board = req.body;  // Obtiene los datos del board desde el cuerpo de la solicitud
    await Board.create(board);  // Crea un nuevo board en la base de datos

    return res.status(201).json(board);  // Devuelve el board recién creado con código de estado 201
  } catch (error) {
    console.error("❌ Error al guardar el board:", error);
    res.status(400).json({ message: "Error al guardar el board." });  // En caso de error, devuelve código 400
  }
};

export default router;
