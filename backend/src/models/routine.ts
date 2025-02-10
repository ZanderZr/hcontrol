import { DataTypes, Model } from 'sequelize';
import database from '../database/connection';
import { IExercise } from './exercise';

export interface IRoutine {
    idUser: number;
    name: string;
    description?: string;
    exercises: IExercise[];
}

class Routine extends Model {}
Routine.init({
    idUser: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    exercises: { type: DataTypes.JSON, allowNull: false }
}, { sequelize: database, modelName: 'Routine' });

export default Routine;
