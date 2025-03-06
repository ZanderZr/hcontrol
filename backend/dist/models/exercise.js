"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
/**
 * Clase que representa el modelo de la entidad `Exercise`.
 *
 * @extends Model
 */
class Exercise extends sequelize_1.Model {
}
// Inicialización del modelo Exercise
Exercise.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        autoIncrement: true, // El valor se autoincrementará con cada nuevo registro
        primaryKey: true, // Este campo es la clave primaria
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        allowNull: false, // No puede ser nulo
    },
    name: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato: texto
        allowNull: false, // No puede ser nulo
    },
    max_weight: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero (opcional)
    },
    max_rep: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero (opcional)
    },
    exec_time: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero (opcional)
    },
}, {
    sequelize: connection_1.default, // Conexión a la base de datos
    modelName: "exercises", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar los campos `createdAt` y `updatedAt`
});
exports.default = Exercise; // Exportar el modelo Exercise para usarlo en otros archivos
