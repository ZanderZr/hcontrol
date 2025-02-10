"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Routine extends sequelize_1.Model {
}
Routine.init({
    idUser: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING },
    exercises: { type: sequelize_1.DataTypes.JSON, allowNull: false }
}, { sequelize: connection_1.default, modelName: 'Routine' });
exports.default = Routine;
