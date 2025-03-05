import { DataTypes, Model, Sequelize } from "sequelize";
import database from "../database/connection";

/**
 * Clase que representa el modelo de la entidad `DiaryData`.
 * 
 * @extends Model
 */
class DiaryData extends Model {
  // Definición de los atributos del modelo DiaryData
  id?: number; // Identificador único de la tabla (autoincremental)
  idUser!: number; // ID del usuario al que pertenece el diario
  data!: string; // Contenido de los datos del diario
  timestamp!: string; // Marca temporal cuando se crea el registro
}

// Inicialización del modelo DiaryData
DiaryData.init(
  {
    id: {
      type: DataTypes.INTEGER, // Tipo de dato: entero
      autoIncrement: true, // El valor se autoincrementará con cada nuevo registro
      primaryKey: true, // Este campo es la clave primaria
    },
    idUser: { 
      type: DataTypes.INTEGER, // Tipo de dato: entero
      allowNull: false, // No puede ser nulo
    },
    data: { 
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
    modelName: "diary_data", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar los campos `createdAt` y `updatedAt`
  }
);

export default DiaryData; // Exportar el modelo DiaryData para usarlo en otros archivos
