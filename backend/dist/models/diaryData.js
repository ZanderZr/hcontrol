"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
/**
 * Clase que representa el modelo de la entidad `DiaryData`.
 *
 * @extends Model
 */
class DiaryData extends sequelize_1.Model {
}
// Inicialización del modelo DiaryData
DiaryData.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        autoIncrement: true, // El valor se autoincrementará con cada nuevo registro
        primaryKey: true, // Este campo es la clave primaria
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato: entero
        allowNull: false, // No puede ser nulo
    },
    data: {
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
    modelName: "diary_data", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar los campos `createdAt` y `updatedAt`
});
exports.default = DiaryData; // Exportar el modelo DiaryData para usarlo en otros archivos
