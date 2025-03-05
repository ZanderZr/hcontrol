import { DataTypes, Model, Sequelize } from "sequelize";
import database from "../database/connection";

/**
 * Clase que representa el modelo de la entidad `Board`.
 * 
 * @extends Model
 */
class Board extends Model {
  // Definición de los atributos del modelo Board
  id!: number; // Identificador único de la tabla (autoincremental)
  idPro!: number; // ID del profesional relacionado (COACH, DIETITIST, etc.)
  rolePro!: "COACH" | "DIETITIST" | "PSYCHOLOGIST" | "DEVELOPER" | "USER"; // Rol del profesional
  title!: string; // Título de la tabla
  description!: string; // Descripción de la tabla
  price!: string; // Precio del servicio o producto
  timestamp!: string; // Marca temporal cuando se crea el registro
}

// Inicialización del modelo Board
Board.init(
  {
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      autoIncrement: true, // El valor se autoincrementará con cada nuevo registro
      primaryKey: true, // Este campo es la clave primaria
    },
    idPro: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      allowNull: false, // No puede ser nulo
    },
    rolePro: {
      type: DataTypes.ENUM( // Enum con valores predefinidos para el rol del profesional
        "COACH",
        "DIETITIST",
        "PSYCHOLOGIST",
        "DEVELOPER",
        "USER"
      ),
      allowNull: false, // No puede ser nulo
    },
    title: { 
      type: DataTypes.STRING, // Tipo de dato: texto
      allowNull: false, // No puede ser nulo
    },
    description: { 
      type: DataTypes.STRING, // Tipo de dato: texto
      allowNull: false, // No puede ser nulo
    },
    price: { 
      type: DataTypes.STRING, // Tipo de dato: texto
      allowNull: false, // No puede ser nulo
    },
    timestamp: {
      type: DataTypes.DATE, // Tipo de dato: fecha y hora
      allowNull: false, // No puede ser nulo
      defaultValue: Sequelize.fn("NOW"), // Valor por defecto: hora actual
    },
  },
  {
    sequelize: database, // Conexión a la base de datos
    modelName: "boards", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar los campos `createdAt` y `updatedAt`
  }
);

export default Board; // Exportar el modelo Board para usarlo en otros archivos
