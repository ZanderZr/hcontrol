import { Request, Response, Router } from 'express';
import DiaryData from '../models/diaryData';
import { Op } from "sequelize";

const router = Router();

/**
 * @description Obtiene todos los registros del diario de un usuario por su ID.
 * @route GET /diary/:id
 * @param {string} id - El ID del usuario que se quiere obtener.
 * @returns {Array} - Lista de registros del diario del usuario.
 * @throws {500} - Si ocurre un error al obtener los datos.
 */
export const getAllDiary = async (req: Request, res: Response) => {
    const { id } = req.params; // Obtener el id de los parámetros de la solicitud

    try {
        const data = await DiaryData.findAll({ where: { idUser: id } });
        res.json(data);  // Devuelve los registros del diario en formato JSON
    } catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener las mediciones." });  // En caso de error, devuelve código 500
    }
};

/**
 * @description Obtiene un registro específico del diario por su ID.
 * @route GET /diary/details/:id
 * @param {string} id - El ID del registro del diario a obtener.
 * @returns {Object} - El registro del diario correspondiente al ID proporcionado.
 * @throws {404} - Si no se encuentra el registro.
 * @throws {500} - Si ocurre un error al obtener el registro.
 */
export const getDiary = async (req: Request, res: Response) => {
    try {
        const data = await DiaryData.findByPk(req.params.id);  // Busca un diario por su ID

        if (data) {
            res.json(data);  // Si se encuentra, devuelve el registro
        } else {
            res.status(404).send('Not Found');  // Si no se encuentra, devuelve un error 404
        }
    } catch (error) {
        console.error("Error al obtener el diario:", error);
        res.status(500).json({ message: "Error al obtener el diario." });  // En caso de error, devuelve código 500
    }
};

/**
 * @description Crea un nuevo registro de diario o actualiza uno existente si ya hay uno para el mismo día y usuario.
 * @route POST /diary
 * @param {Object} req.body - Contiene el idUser, data y timestamp del nuevo registro de diario.
 * @returns {Object} - El registro de diario creado o actualizado.
 * @throws {400} - Si ocurre un error al guardar el diario.
 */
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
            return res.status(200).json(existingDiary);  // Devuelve el diario actualizado
        } else {
            // Si no existe, crear un nuevo registro
            const newDiary = await DiaryData.create(req.body);
            return res.status(201).json(newDiary);  // Devuelve el nuevo registro creado
        }
    } catch (error) {
        console.error("❌ Error al guardar el diario:", error);
        res.status(400).json({ message: "Error al guardar el diario." });  // En caso de error, devuelve código 400
    }
};

/**
 * @description Elimina un registro de diario por su ID.
 * @route DELETE /diary/:id
 * @param {string} id - El ID del registro del diario a eliminar.
 * @returns {void} - Respuesta vacía si el registro fue eliminado correctamente.
 * @throws {404} - Si no se encuentra el registro a eliminar.
 * @throws {500} - Si ocurre un error al eliminar el registro.
 */
export const deleteDiary = async (req: Request, res: Response) => {
    try {
        const data = await DiaryData.findByPk(req.params.id);  // Busca el diario por su ID
        if (!data) {
            return res.status(404).send('Not Found');  // Si no se encuentra el diario, devuelve un error 404
        }
        await data.destroy();  // Elimina el registro del diario
        res.status(204).send();  // Devuelve respuesta vacía con código de estado 204
    } catch (error) {
        console.error("Error al eliminar el diario:", error);
        res.status(500).json({ message: "Error al eliminar el diario." });  // En caso de error, devuelve código 500
    }
};

export default router;
