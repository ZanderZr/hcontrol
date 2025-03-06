"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const sequelize_1 = require("sequelize");
const board_1 = __importDefault(require("../models/board")); // Ajusta la ruta según tu estructura
// Ejecuta todos los días a medianoche
node_cron_1.default.schedule("0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * @description Elimina los registros de Board que tienen un timestamp anterior a 7 días desde la fecha actual.
     * Esta tarea se ejecuta todos los días a medianoche.
     *
     * @async
     * @function
     * @throws {Error} Si ocurre un error durante la eliminación de los registros antiguos.
     */
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Calcula la fecha de hace 7 días
    try {
        const deleted = yield board_1.default.destroy({
            where: {
                timestamp: {
                    [sequelize_1.Op.lt]: sevenDaysAgo, // Elimina los registros con timestamp menor a siete días
                },
            },
        });
        console.log(`Eliminados ${deleted} registros de Board antiguos.`);
    }
    catch (error) {
        console.error("Error eliminando registros antiguos:", error); // Si ocurre un error, se logea el mensaje
    }
}));
