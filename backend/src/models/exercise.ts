import { DataTypes, Model } from "sequelize";
import database from "../database/connection";

/**
 * Clase que representa el modelo de la entidad `Exercise`.
 * 
 * @extends Model
 */
class Exercise extends Model {
  // Definición de los atributos del modelo Exercise
  id!: number; // Identificador único de la tabla (autoincremental)
  idUser!: number; // ID del usuario al que pertenece el ejercicio
  name!: string; // Nombre del ejercicio
  max_weight?: number; // Peso máximo en el ejercicio (opcional)
  max_rep?: number; // Número máximo de repeticiones (opcional)
  exec_time?: number; // Tiempo máximo de ejecución del ejercicio en segundos (opcional)
}

// Inicialización del modelo Exercise
Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      autoIncrement: true, // El valor se autoincrementará con cada nuevo registro
      primaryKey: true, // Este campo es la clave primaria
    },
    idUser: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      allowNull: false, // No puede ser nulo
    },
    name: {
      type: DataTypes.STRING, // Tipo de dato: texto
      allowNull: false, // No puede ser nulo
    },
    max_weight: {
      type: DataTypes.INTEGER, // Tipo de dato: entero (opcional)
    },
    max_rep: {
      type: DataTypes.INTEGER, // Tipo de dato: entero (opcional)
    },
    exec_time: {
      type: DataTypes.INTEGER, // Tipo de dato: entero (opcional)
    },
  },
  {
    sequelize: database, // Conexión a la base de datos
    modelName: "exercises", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar los campos `createdAt` y `updatedAt`
  }
);

export default Exercise; // Exportar el modelo Exercise para usarlo en otros archivos
