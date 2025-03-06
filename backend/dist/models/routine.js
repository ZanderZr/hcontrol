"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
/**
 * Clase que representa una rutina de ejercicio de un usuario.
 *
 * @extends Model
 */
class Routine extends sequelize_1.Model {
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
Routine.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        autoIncrement: true, // El campo es autoincrementable
        primaryKey: true, // Este campo es la clave primaria
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        allowNull: false, // No puede ser nulo
    },
    name: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: false, // No puede ser nulo
    },
    description: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: true, // Es un campo opcional
    },
}, {
    sequelize: connection_1.default, // Conexión con la base de datos
    modelName: 'routines', // Nombre de la tabla en la base de datos
    timestamps: false, // No se agregan `createdAt` ni `updatedAt`
});
exports.default = Routine; // Exporta el modelo Routine para ser utilizado en otras partes de la aplicación
