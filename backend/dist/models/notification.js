"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Notification extends sequelize_1.Model {
}
Notification.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idEmitter: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    idReceiver: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, { sequelize: connection_1.default, modelName: "notifications", timestamps: false });
exports.default = Notification;
