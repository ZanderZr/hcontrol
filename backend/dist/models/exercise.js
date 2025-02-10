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
    difficulty: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    equipment: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    instructions: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    muscle: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    type: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    maxWeight: { type: sequelize_1.DataTypes.INTEGER },
    maxRep: { type: sequelize_1.DataTypes.INTEGER },
    execTime: { type: sequelize_1.DataTypes.INTEGER }
}, { sequelize: connection_1.default, modelName: 'Exercise' });
exports.default = Exercise;
