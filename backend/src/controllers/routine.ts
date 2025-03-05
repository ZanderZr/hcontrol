import { Request, Response, Router } from 'express';
import Routine from '../models/routine';
import RoutineExercises from '../models/routineExercises';

const router = Router();

/**
 * @description Obtiene todas las rutinas de un usuario con sus respectivos ejercicios.
 * @route GET /routines/:id
 * @param {string} id - El ID del usuario cuyas rutinas se deben obtener.
 * @returns {Array} - Lista de rutinas formateadas con los ejercicios asociados.
 * @throws {500} - Si ocurre un error al obtener las rutinas o los ejercicios.
 */
export const getAllRoutinesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtener el id de los parámetros de la solicitud
    
    const routines = await Routine.findAll({ where: { idUser: id } });
    const routineExercises = await RoutineExercises.findAll();

    const formattedRoutines = routines.map(routine => {
      const exercisesForRoutine = routineExercises
        .filter(re => re.routine_id === routine.id)
        .map(re => re.exercise_name);

      return {
        id: routine.id,
        idUser: routine.idUser,
        name: routine.name,
        description: routine.description,
        exercises: exercisesForRoutine
      };
    });

    res.json(formattedRoutines);
  } catch (error) {
    console.error("Error al obtener las rutinas:", error);
    res.status(500).json({ message: "Error al obtener las rutinas." });
  }
};

/**
 * @description Obtiene una rutina específica con sus ejercicios.
 * @route GET /routines/:id
 * @param {string} id - El ID de la rutina que se debe obtener.
 * @returns {Object} - La rutina con su información y lista de ejercicios.
 * @throws {404} - Si no se encuentra la rutina.
 * @throws {500} - Si ocurre un error al obtener la rutina o los ejercicios.
 */
export const getRoutine = async (req: Request, res: Response) => {
  try {
    const routine = await Routine.findByPk(req.params.id);
    if (!routine) {
      return res.status(404).send('Not Found');
    }

    const routineExercises = await RoutineExercises.findAll({
      where: { routine_id: routine.id }
    });

    res.json({
      id: routine.id,
      idUser: routine.idUser,
      name: routine.name,
      description: routine.description,
      exercises: routineExercises.map(re => re.exercise_name)
    });
  } catch (error) {
    console.error("Error al obtener la rutina:", error);
    res.status(500).json({ message: "Error al obtener la rutina." });
  }
};

/**
 * @description Crea una nueva rutina junto con los ejercicios asociados.
 * @route POST /routines
 * @param {Object} req.body - Datos de la rutina y los ejercicios asociados.
 * @param {string} req.body.idUser - El ID del usuario propietario de la rutina.
 * @param {string} req.body.name - El nombre de la rutina.
 * @param {string} req.body.description - La descripción de la rutina.
 * @param {Array} req.body.exercises - Lista de nombres de ejercicios para asociar con la rutina.
 * @returns {Object} - La rutina creada con los ejercicios asociados.
 * @throws {400} - Si ocurre un error al crear la rutina o asociar los ejercicios.
 */
export const postRoutine = async (req: Request, res: Response) => {
  try {
    const { idUser, name, description, exercises } = req.body;

    // Crear la rutina
    const routine = await Routine.create({ idUser, name, description });

    // Agregar los ejercicios a la rutina
    if (exercises && exercises.length > 0) {
      const routineExercises = exercises.map((exercise_name: string) => ({
        routine_id: routine.id,
        exercise_name
      }));
      await RoutineExercises.bulkCreate(routineExercises);
    }

    res.status(201).json({ ...routine.toJSON(), exercises });
  } catch (error) {
    console.error("Error al crear la rutina:", error);
    res.status(400).json({ message: "Error al crear la rutina." });
  }
};

/**
 * @description Actualiza una rutina y sus ejercicios asociados.
 * @route PUT /routines/:id
 * @param {string} id - El ID de la rutina que se debe actualizar.
 * @param {Object} req.body - Los nuevos datos de la rutina y ejercicios.
 * @param {string} req.body.idUser - El ID del usuario propietario de la rutina.
 * @param {string} req.body.name - El nuevo nombre de la rutina.
 * @param {string} req.body.description - La nueva descripción de la rutina.
 * @param {Array} req.body.exercises - Lista de nuevos ejercicios para asociar con la rutina.
 * @returns {Object} - La rutina actualizada con los ejercicios asociados.
 * @throws {404} - Si no se encuentra la rutina para actualizar.
 * @throws {500} - Si ocurre un error al actualizar la rutina o los ejercicios.
 */
export const putRoutine = async (req: Request, res: Response) => {
  try {
    const { idUser, name, description, exercises } = req.body;
    const routine = await Routine.findByPk(req.params.id);

    if (!routine) {
      return res.status(404).send('Not Found');
    }

    await routine.update({ idUser, name, description });

    // Actualizar los ejercicios asociados
    if (exercises) {
      await RoutineExercises.destroy({ where: { routine_id: routine.id } });
      const newRoutineExercises = exercises.map((exercise_name: string) => ({
        routine_id: routine.id,
        exercise_name
      }));
      await RoutineExercises.bulkCreate(newRoutineExercises);
    }

    res.json({ ...routine.toJSON(), exercises });
  } catch (error) {
    console.error("Error al actualizar la rutina:", error);
    res.status(500).json({ message: "Error al actualizar la rutina." });
  }
};

/**
 * @description Elimina una rutina y sus ejercicios asociados.
 * @route DELETE /routines/:id
 * @param {string} id - El ID de la rutina que se debe eliminar.
 * @returns {void} - Respuesta vacía si la rutina y sus ejercicios se eliminan correctamente.
 * @throws {404} - Si no se encuentra la rutina para eliminar.
 * @throws {500} - Si ocurre un error al eliminar la rutina o los ejercicios.
 */
export const deleteRoutine = async (req: Request, res: Response) => {
  try {
    const routine = await Routine.findByPk(req.params.id);
    if (!routine) {
      return res.status(404).send('Not Found');
    }

    await RoutineExercises.destroy({ where: { routine_id: routine.id } });
    await routine.destroy();

    res.status(204).send();  // Respuesta vacía con código de estado 204 (Eliminación exitosa)
  } catch (error) {
    console.error("Error al eliminar la rutina:", error);
    res.status(500).json({ message: "Error al eliminar la rutina." });
  }
};

export default router;
