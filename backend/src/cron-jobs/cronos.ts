import cron from "node-cron";
import { Op } from "sequelize";
import Board from "../models/board"; // Ajusta la ruta según tu estructura

// Ejecuta todos los días a medianoche
cron.schedule("0 0 * * *", async () => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  try {
    const deleted = await Board.destroy({
      where: {
        timestamp: {
          [Op.lt]: sevenDaysAgo,
        },
      },
    });
    console.log(`Eliminados ${deleted} registros de Board antiguos.`);
  } catch (error) {
    console.error("Error eliminando registros antiguos:", error);
  }
});
