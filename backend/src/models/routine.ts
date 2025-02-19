import { DataTypes, Model } from 'sequelize';
import database from '../database/connection';
import { IExercise } from './exercise';

export interface IRoutine {
    idUser: number;
    name: string;
    description?: string;
    exercise: string;
}

class Routine extends Model {}
Routine.init({
    idUser: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    exercise: { type: DataTypes.STRING, allowNull: false }
}, { sequelize: database, modelName: 'routines', timestamps: false });

export default Routine;
