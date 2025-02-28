import { DataTypes, Model, Sequelize } from "sequelize";
import database from "../database/connection";

class Board extends Model {
  id!: number;
  idPro!: number;
  rolePro!: "COACH" | "DIETITIST" | "PSYCHOLOGIST" | "USER";
  title!: string;
  description!: string;
  price!: string;
  timestamp!: string;
}

Board.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idPro: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rolePro: {
      type: DataTypes.ENUM(
        "COACH",
        "DIETITIST",
        "PSYCHOLOGIST",
        "DEVELOPER",
        "USER"
      ),
      allowNull: false,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  },
  { sequelize: database, modelName: "boards", timestamps: false }
);

export default Board;
