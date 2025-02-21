"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Exercise extends sequelize_1.Model {
}
Exercise.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    max_weight: { type: sequelize_1.DataTypes.INTEGER },
    max_rep: { type: sequelize_1.DataTypes.INTEGER },
    exec_time: { type: sequelize_1.DataTypes.INTEGER },
}, { sequelize: connection_1.default, modelName: "exercises", timestamps: false });
exports.default = Exercise;
