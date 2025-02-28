import { DataTypes, Model } from "sequelize";
import database from "../database/connection";

class Notification extends Model {
  id?: number;
  idEmitter!: number;
  idReceiver!: number;
  description!: string;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idEmitter: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idReceiver: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize: database, modelName: "notifications", timestamps: false }
);

export default Notification;
