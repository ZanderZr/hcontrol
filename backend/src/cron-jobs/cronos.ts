import cron from "node-cron";
import { Op } from "sequelize";
import Board from "../models/board"; // Ajusta la ruta según tu estructura

// Ejecuta todos los días a medianoche
cron.schedule("0 0 * * *", async () => {
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
    const deleted = await Board.destroy({
      where: {
        timestamp: {
          [Op.lt]: sevenDaysAgo, // Elimina los registros con timestamp menor a siete días
        },
      },
    });
    console.log(`Eliminados ${deleted} registros de Board antiguos.`);
  } catch (error) {
    console.error("Error eliminando registros antiguos:", error); // Si ocurre un error, se logea el mensaje
  }
});
