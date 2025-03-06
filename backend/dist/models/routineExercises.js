"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
/**
 * Modelo que representa la relación entre las rutinas y los ejercicios
 * asociados a ellas.
 *
 * @extends Model
 */
class RoutineExercises extends sequelize_1.Model {
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
RoutineExercises.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        autoIncrement: true, // El campo es autoincrementable
        primaryKey: true, // Este campo es la clave primaria
    },
    routine_id: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        allowNull: false, // No puede ser nulo
    },
    exercise_name: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato: cadena de texto
        allowNull: false, // No puede ser nulo
    },
}, {
    sequelize: connection_1.default, // Conexión con la base de datos
    modelName: "routine_exercises", // Nombre de la tabla en la base de datos
    timestamps: false, // No se agregan `createdAt` ni `updatedAt`
});
exports.default = RoutineExercises;
