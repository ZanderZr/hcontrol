import { Request, Response, Router } from 'express';
import Routine from '../models/routine';
import RoutineExercises from '../models/routineExercises';

const router = Router();

// Obtener todas las rutinas con sus ejercicios
export const getAllRoutine = async (req: Request, res: Response) => {
  try {
    const routines = await Routine.findAll();
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

// Obtener una rutina con sus ejercicios
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

// Crear una nueva rutina con ejercicios
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

// Actualizar una rutina y sus ejercicios
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

// Eliminar una rutina y sus relaciones con ejercicios
export const deleteRoutine = async (req: Request, res: Response) => {
  try {
    const routine = await Routine.findByPk(req.params.id);
    if (!routine) {
      return res.status(404).send('Not Found');
    }

    await RoutineExercises.destroy({ where: { routine_id: routine.id } });
    await routine.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar la rutina:", error);
    res.status(500).json({ message: "Error al eliminar la rutina." });
  }
};

export default router;
