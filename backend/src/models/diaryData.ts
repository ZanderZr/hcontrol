import { DataTypes, Model, Sequelize } from "sequelize";
import database from "../database/connection";


class DiaryData extends Model {
  id?:number
  idUser!: number;
  data!: string;
  timestamp!: string;

}
DiaryData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
    idUser: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.STRING, allowNull: false },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  },
  { sequelize: database, modelName: "diary_data" }
);

export default DiaryData;
