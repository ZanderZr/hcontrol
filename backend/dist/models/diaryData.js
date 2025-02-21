"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class DiaryData extends sequelize_1.Model {
}
DiaryData.init({
    idUser: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    data: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.fn("NOW"),
    },
}, { sequelize: connection_1.default, modelName: "diary_data" });
exports.default = DiaryData;
