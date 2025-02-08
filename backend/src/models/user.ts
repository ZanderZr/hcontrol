import { DataTypes, Model } from 'sequelize';
import database from '../database/connection';

interface UserInstance extends Model {
    id: number;
    email: string;
    username: string;
    password: string;
    role:  'COACH' | 'DIETITIST' | 'PSYCHOLOGIST' | 'DEVELOPER';
  }

const User = database.define<UserInstance>('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false

    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    role: {
        type:DataTypes.ENUM( 'COACH' , 'DIETITIST' , 'PSYCHOLOGIST' , 'DEVELOPER', 'USER'),
        allowNull:true
    }

}, {
    createdAt: false,
    updatedAt: false
})

export default User;