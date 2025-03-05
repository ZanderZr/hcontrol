import { Request, Response, Router } from 'express';
import Exercise from '../models/exercise';

const router = Router();

/**
 * @description Obtiene todos los ejercicios de un usuario por su ID.
 * @route GET /exercise/:id
 * @param {string} id - El ID del usuario cuyos ejercicios se desean obtener.
 * @returns {Array} - Lista de ejercicios del usuario.
 * @throws {500} - Si ocurre un error al obtener los ejercicios.
 */
export const getAllExercise = async (req: Request, res: Response) => {
    const { id } = req.params; // Obtener el id de los parámetros de la solicitud

    try {
        const data = await Exercise.findAll({ where: { idUser: id } });
        res.json(data);  // Devuelve los ejercicios del usuario en formato JSON
    } catch (error) {
        console.error("Error al obtener los ejercicios:", error);
        res.status(500).json({ message: "Error al obtener los ejercicios." });  // En caso de error, devuelve código 500
    }
};

/**
 * @description Obtiene un ejercicio específico por su ID.
 * @route GET /exercise/details/:id
 * @param {string} id - El ID del ejercicio que se desea obtener.
 * @returns {Object} - El ejercicio correspondiente al ID proporcionado.
 * @throws {404} - Si no se encuentra el ejercicio.
 * @throws {500} - Si ocurre un error al obtener el ejercicio.
 */
export const getExercise = async (req: Request, res: Response) => {
    try {
        const data = await Exercise.findByPk(req.params.id);  // Busca un ejercicio por su ID

        if (data) {
            res.json(data);  // Si se encuentra, devuelve el ejercicio
        } else {
            res.status(404).send('Not Found');  // Si no se encuentra, devuelve un error 404
        }
    } catch (error) {
        console.error("Error al obtener el ejercicio:", error);
        res.status(500).json({ message: "Error al obtener el ejercicio." });  // En caso de error, devuelve código 500
    }
};

/**
 * @description Crea un nuevo ejercicio o actualiza uno existente si ya hay uno con el mismo nombre y usuario.
 * @route POST /exercise
 * @param {Object} req.body - Contiene los datos del ejercicio a crear o actualizar (name, idUser, exec_time, max_weight, max_rep).
 * @returns {Object} - El ejercicio creado o actualizado.
 * @throws {400} - Si faltan datos obligatorios.
 * @throws {500} - Si ocurre un error en el servidor.
 */
export const postExercise = async (req: Request, res: Response) => {
    try {
        const { name, idUser, exec_time, max_weight, max_rep } = req.body;

        // Validar que los campos requeridos están presentes
        if (!name || !idUser) {
            return res.status(400).json({ message: "El nombre y el idUser son obligatorios." });  // Si faltan campos obligatorios, devuelve un error 400
        }

        console.log("Datos recibidos en req.body:", req.body);

        // Buscar si ya existe un ejercicio con el mismo nombre y usuario
        let exercise = await Exercise.findOne({ where: { name, idUser } });

        if (exercise) {
            console.log("Ejercicio encontrado, actualizando...");
            exercise.exec_time = exec_time;
            exercise.max_weight = max_weight;
            exercise.max_rep = max_rep;

            await exercise.save();
            return res.status(200).json({ message: "Ejercicio actualizado", exercise });  // Devuelve el ejercicio actualizado
        }

        // Si no existe, crear un nuevo ejercicio solo con los campos permitidos
        console.log("Ejercicio no encontrado, creando uno nuevo...");
        const newExercise = await Exercise.create({
            name,
            idUser,
            exec_time,
            max_weight,
            max_rep
        });

        return res.status(201).json({ message: "Ejercicio creado", newExercise });  // Devuelve el nuevo ejercicio creado

    } catch (error) {
        console.error("Error detallado:", error);
        res.status(500).json({ message: "Error en el servidor.", error });  // En caso de error, devuelve código 500
    }
};

/**
 * @description Actualiza un ejercicio específico por su ID.
 * @route PUT /exercise/:id
 * @param {string} id - El ID del ejercicio a actualizar.
 * @param {Object} req.body - Los nuevos datos para actualizar el ejercicio.
 * @returns {Object} - El ejercicio actualizado.
 * @throws {404} - Si no se encuentra el ejercicio.
 * @throws {500} - Si ocurre un error al actualizar el ejercicio.
 */
export const putExercise = async (req: Request, res: Response) => {
    try {
        const data = await Exercise.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');  // Si no se encuentra el ejercicio, devuelve un error 404
        }
        await data.update(req.body);  // Actualiza el ejercicio con los nuevos datos
        res.json(data);  // Devuelve el ejercicio actualizado
    } catch (error) {
        console.error("Error al actualizar el ejercicio:", error);
        res.status(500).json({ message: "Error al actualizar el ejercicio." });  // En caso de error, devuelve código 500
    }
};

/**
 * @description Elimina un ejercicio por su ID.
 * @route DELETE /exercise/:id
 * @param {string} id - El ID del ejercicio a eliminar.
 * @returns {void} - Respuesta vacía si el ejercicio fue eliminado correctamente.
 * @throws {404} - Si no se encuentra el ejercicio a eliminar.
 * @throws {500} - Si ocurre un error al eliminar el ejercicio.
 */
export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const data = await Exercise.findByPk(req.params.id);
        if (!data) {
            return res.status(404).send('Not Found');  // Si no se encuentra el ejercicio, devuelve un error 404
        }
        await data.destroy();  // Elimina el ejercicio
        res.status(204).send();  // Respuesta vacía con código de estado 204
    } catch (error) {
        console.error("Error al eliminar el ejercicio:", error);
        res.status(500).json({ message: "Error al eliminar el ejercicio." });  // En caso de error, devuelve código 500
    }
};

export default router;
