import { DataTypes, Model } from 'sequelize';
import database from '../database/connection';

export interface IExercise {
    difficulty: string;
    equipment: string;
    instructions: string;
    muscle: string;
    name: string;
    type: string;
    maxWeight?: number;
    maxRep?: number;
    execTime?: number;
}

class Exercise extends Model {}
Exercise.init({
    difficulty: { type: DataTypes.STRING, allowNull: false },
    equipment: { type: DataTypes.STRING, allowNull: false },
    instructions: { type: DataTypes.STRING, allowNull: false },
    muscle: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    maxWeight: { type: DataTypes.INTEGER },
    maxRep: { type: DataTypes.INTEGER },
    execTime: { type: DataTypes.INTEGER }
}, { sequelize: database, modelName: 'Exercise' });

export default Exercise;