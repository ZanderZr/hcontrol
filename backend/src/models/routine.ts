import { DataTypes, Model } from 'sequelize';
import database from '../database/connection';

/**
 * Clase que representa una rutina de ejercicio de un usuario.
 * 
 * @extends Model
 */
class Routine extends Model {
  public id!: number; // Identificador único de la rutina
  public idUser!: number; // ID del usuario que crea la rutina
  public name!: string; // Nombre de la rutina
  public description?: string; // Descripción de la rutina, opcional
}

/**
 * Inicializa el modelo Routine.
 * 
 * - `id`: Clave primaria autoincrementable
 * - `idUser`: ID del usuario, no puede ser nulo
 * - `name`: Nombre de la rutina, no puede ser nulo
 * - `description`: Descripción opcional de la rutina
 * 
 * @param sequelize Instancia de Sequelize para la conexión a la base de datos.
 */
Routine.init(
  {
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      autoIncrement: true, // El campo es autoincrementable
      primaryKey: true, // Este campo es la clave primaria
    },
    idUser: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      allowNull: false, // No puede ser nulo
    },
    name: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto
      allowNull: false, // No puede ser nulo
    },
    description: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto
      allowNull: true, // Es un campo opcional
    },
  },
  {
    sequelize: database, // Conexión con la base de datos
    modelName: 'routines', // Nombre de la tabla en la base de datos
    timestamps: false, // No se agregan `createdAt` ni `updatedAt`
  }
);

export default Routine; // Exporta el modelo Routine para ser utilizado en otras partes de la aplicación
