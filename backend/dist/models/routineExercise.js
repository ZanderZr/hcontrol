"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class RoutineExercises extends sequelize_1.Model {
}
RoutineExercises.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    routine_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    exercise_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, { sequelize: connection_1.default, modelName: "routine_exercises", timestamps: false });
exports.default = RoutineExercises;
