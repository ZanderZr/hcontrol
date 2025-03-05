import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

/**
 * @description Configura la conexión a la base de datos utilizando Sequelize.
 * Utiliza variables de entorno para la configuración de la base de datos, incluyendo el nombre, el usuario, la contraseña, 
 * el host, y el puerto. Si alguna variable de entorno no está definida, se usan valores predeterminados.
 * 
 * @returns {Sequelize} Instancia de Sequelize configurada para conectar con la base de datos MySQL.
 * @throws {Error} Si alguna de las variables de entorno necesarias no está definida, puede fallar la conexión.
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || '',          // Nombre de la base de datos, se toma de la variable de entorno DB_NAME
  process.env.DB_USER || '',          // Usuario de la base de datos, se toma de la variable de entorno DB_USER
  process.env.DB_PASSWORD,            // Contraseña de la base de datos, se toma de la variable de entorno DB_PASSWORD
  {
    host: process.env.DB_HOST || 'localhost',   // Dirección del servidor MySQL, por defecto 'localhost'
    port: Number(process.env.DB_PORT) || 3306,  // Puerto donde el servidor MySQL escucha, por defecto 3306
    dialect: 'mysql'                    // Tipo de base de datos (MySQL)
  }
);

// Exporta la instancia de Sequelize para que pueda ser utilizada en otras partes del proyecto
export default sequelize;
