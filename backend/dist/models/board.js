"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Board extends sequelize_1.Model {
}
Board.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idPro: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    rolePro: {
        type: sequelize_1.DataTypes.ENUM("COACH", "DIETITIST", "PSYCHOLOGIST", "DEVELOPER", "USER"),
        allowNull: false,
    },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    price: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.fn("NOW"),
    },
}, { sequelize: connection_1.default, modelName: "boards", timestamps: false });
exports.default = Board;
