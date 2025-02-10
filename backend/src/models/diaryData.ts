import { DataTypes, Model, Sequelize } from "sequelize";
import database from "../database/connection";

export interface IDiaryData {
  idUser: number;
  data: string;
  timestamp: string;
}

class DiaryData extends Model {}
DiaryData.init(
  {
    idUser: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.STRING, allowNull: false },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  },
  { sequelize: database, modelName: "DiaryData" }
);

export default DiaryData;
