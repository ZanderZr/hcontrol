"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
/**
 * Definición del modelo de usuario en la base de datos.
 * @function User
 */
const User = connection_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo de dato para el ID
        primaryKey: true, // Establece este campo como clave primaria
        autoIncrement: true, // El ID se autoincrementará
    },
    email: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato para el email
        unique: true, // El email debe ser único
        allowNull: false // El campo no puede ser nulo
    },
    username: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato para el nombre de usuario
        unique: true, // El nombre de usuario debe ser único
        allowNull: false // El campo no puede ser nulo
    },
    password: {
        type: sequelize_1.DataTypes.STRING, // Tipo de dato para la contraseña
        allowNull: false // El campo no puede ser nulo
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('COACH', 'DIETITIST', 'PSYCHOLOGIST', 'DEVELOPER', 'USER'), // Enum para definir los roles disponibles
        allowNull: false // El campo no puede ser nulo
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN, // Campo booleano para verificar el email
        allowNull: false, // No puede ser nulo
        defaultValue: false // Por defecto, el usuario no está verificado
    }
}, {
    createdAt: false, // No se generará el campo createdAt
    updatedAt: false // No se generará el campo updatedAt
});
exports.default = User;
