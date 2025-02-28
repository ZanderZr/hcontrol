import { DataTypes, Model } from 'sequelize';
import database from '../database/connection';

class Routine extends Model {
    public id!: number; // <-- Agrega esta propiedad explícitamente
    public idUser!: number;
    public name!: string;
    public description?: string;
}

Routine.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idUser: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true }
    },
    { sequelize: database, modelName: 'routines', timestamps: false }
);

export default Routine;
