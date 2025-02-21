import { DataTypes, Model } from "sequelize";
import database from "../database/connection";


class RoutineExercises extends Model {
    id!: number;
    routine_id!: number;
    exercise_name!: string;
 }

RoutineExercises.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        routine_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        exercise_name: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
    },
    { sequelize: database, modelName: "routine_exercises", timestamps: false }
);

export default RoutineExercises;
