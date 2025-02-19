import { DataTypes, Model } from "sequelize";
import database from "../database/connection";

export interface IExercise {
    id:number;
    idUser: number;
    difficulty?: string;
    equipment?: string;
    instructions?: string;
    muscle?: string;
    name: string;
    type?: string;
    maxWeight?: number;
    maxRep?: number;
    execTime?: number;
}

class Exercise extends Model { }
Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        difficulty: { type: DataTypes.STRING, allowNull: true },
        equipment: { type: DataTypes.STRING, allowNull: true },
        instructions: { type: DataTypes.STRING, allowNull: true },
        muscle: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: true },
        max_weight: { type: DataTypes.INTEGER },
        max_rep: { type: DataTypes.INTEGER },
        exec_time: { type: DataTypes.INTEGER },
    },
    { sequelize: database, modelName: "exercises", timestamps: false }
);

export default Exercise;
