"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
/**
 * Clase que representa el modelo de la entidad `Notification`.
 *
 * @extends Model
 */
class Notification extends sequelize_1.Model {
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
Notification.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        autoIncrement: true, // Este campo se autoincrementa
        primaryKey: true, // Este campo es la clave primaria
    },
    idEmitter: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        allowNull: false, // No puede ser nulo
    },
    idReceiver: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        allowNull: false, // No puede ser nulo
    },
    description: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato: texto
        allowNull: false, // No puede ser nulo
    },
}, {
    sequelize: connection_1.default, // Conexión con la base de datos
    modelName: "notifications", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar los campos `createdAt` y `updatedAt`
});
exports.default = Notification; // Exporta el modelo Notification para ser utilizado en otras partes de la aplicación
