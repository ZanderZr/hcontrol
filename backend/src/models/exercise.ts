import { DataTypes, Model } from "sequelize";
import database from "../database/connection";

export interface IExercise {
  id: number;
  idUser: number;
  name: string;
  maxWeight?: number;
  maxRep?: number;
  execTime?: number;
}

class Exercise extends Model {}
Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    max_weight: { type: DataTypes.INTEGER },
    max_rep: { type: DataTypes.INTEGER },
    exec_time: { type: DataTypes.INTEGER },
  },
  { sequelize: database, modelName: "exercises", timestamps: false }
);

export default Exercise;
