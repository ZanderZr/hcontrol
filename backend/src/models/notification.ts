import { DataTypes, Model } from "sequelize";
import database from "../database/connection";

/**
 * Clase que representa el modelo de la entidad `Notification`.
 * 
 * @extends Model
 */
class Notification extends Model {
  id?: number; // Identificador único de la notificación
  idEmitter!: number; // ID del emisor de la notificación
  idReceiver!: number; // ID del receptor de la notificación
  description!: string; // Descripción de la notificación
}

/**
 * Inicializa el modelo Notification.
 * 
 * - `id`: clave primaria, autoincrementable
 * - `idEmitter`: ID del emisor, no puede ser nulo
 * - `idReceiver`: ID del receptor, no puede ser nulo
 * - `description`: Descripción de la notificación, no puede ser nula
 * 
 * @param sequelize Instancia de Sequelize para la conexión a la base de datos.
 */
Notification.init(
  {
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      autoIncrement: true, // Este campo se autoincrementa
      primaryKey: true, // Este campo es la clave primaria
    },
    idEmitter: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      allowNull: false, // No puede ser nulo
    },
    idReceiver: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      allowNull: false, // No puede ser nulo
    },
    description: {
      type: DataTypes.STRING, // Tipo de dato: texto
      allowNull: false, // No puede ser nulo
    },
  },
  {
    sequelize: database, // Conexión con la base de datos
    modelName: "notifications", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar los campos `createdAt` y `updatedAt`
  }
);

export default Notification; // Exporta el modelo Notification para ser utilizado en otras partes de la aplicación
