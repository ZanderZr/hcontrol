import { DataTypes, Model } from "sequelize";
import database from "../database/connection";

/**
 * Modelo que representa la relación entre las rutinas y los ejercicios
 * asociados a ellas.
 * 
 * @extends Model
 */
class RoutineExercises extends Model {
  public id!: number; // Identificador único de la relación
  public routine_id!: number; // ID de la rutina asociada
  public exercise_name!: string; // Nombre del ejercicio asociado a la rutina
}

/**
 * Inicializa el modelo RoutineExercises.
 * 
 * - `id`: Clave primaria autoincrementable
 * - `routine_id`: ID de la rutina asociada
 * - `exercise_name`: Nombre del ejercicio
 * 
 * @param sequelize Instancia de Sequelize para la conexión a la base de datos.
 */
RoutineExercises.init(
  {
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      autoIncrement: true, // El campo es autoincrementable
      primaryKey: true, // Este campo es la clave primaria
    },
    routine_id: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      allowNull: false, // No puede ser nulo
    },
    exercise_name: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto
      allowNull: false, // No puede ser nulo
    },
  },
  {
    sequelize: database, // Conexión con la base de datos
    modelName: "routine_exercises", // Nombre de la tabla en la base de datos
    timestamps: false, // No se agregan `createdAt` ni `updatedAt`
  }
);

export default RoutineExercises;
