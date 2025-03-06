"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
/**
 * Clase que representa el modelo de la entidad `Board`.
 *
 * @extends Model
 */
class Board extends sequelize_1.Model {
}
// Inicialización del modelo Board
Board.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        autoIncrement: true, // El valor se autoincrementará con cada nuevo registro
        primaryKey: true, // Este campo es la clave primaria
    },
    idPro: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        allowNull: false, // No puede ser nulo
    },
    rolePro: {
        type: sequelize_1.DataTypes.ENUM(// Enum con valores predefinidos para el rol del profesional
        "COACH", "DIETITIST", "PSYCHOLOGIST", "DEVELOPER", "USER"),
        allowNull: false, // No puede ser nulo
    },
    title: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato: texto
        allowNull: false, // No puede ser nulo
    },
    description: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato: texto
        allowNull: false, // No puede ser nulo
    },
    price: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato: texto
        allowNull: false, // No puede ser nulo
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE, // Tipo de dato: fecha y hora
        allowNull: false, // No puede ser nulo
        defaultValue: sequelize_1.Sequelize.fn("NOW"), // Valor por defecto: hora actual
    },
}, {
    sequelize: connection_1.default, // Conexión a la base de datos
    modelName: "boards", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar los campos `createdAt` y `updatedAt`
});
exports.default = Board; // Exportar el modelo Board para usarlo en otros archivos
