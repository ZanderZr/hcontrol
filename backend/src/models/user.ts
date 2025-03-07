import { DataTypes, Model } from 'sequelize';
import database from '../database/connection';

/**
 * Interface que define el modelo de datos para el usuario.
 * @interface IUser
 * @extends {Model}
 */
interface IUser extends Model {
    id: number; // Identificador único del usuario
    email: string; // Correo electrónico del usuario
    username: string; // Nombre de usuario único
    password: string; // Contraseña del usuario
    role: 'COACH' | 'DIETITIST' | 'PSYCHOLOGIST' | 'USER'; // Rol del usuario
    verified: boolean; // Indica si el usuario ha verificado su email
}

/**
 * Definición del modelo de usuario en la base de datos.
 * @function User
 */
const User = database.define<IUser>('User', {
    id: {
        type: DataTypes.INTEGER, // Tipo de dato para el ID
        primaryKey: true, // Establece este campo como clave primaria
        autoIncrement: true, // El ID se autoincrementará
    },
    email: {
        type: DataTypes.STRING, // Tipo de dato para el email
        unique: true, // El email debe ser único
        allowNull: false // El campo no puede ser nulo
    },
    username: {
        type: DataTypes.STRING, // Tipo de dato para el nombre de usuario
        unique: true, // El nombre de usuario debe ser único
        allowNull: false // El campo no puede ser nulo
    },
    password: {
        type: DataTypes.STRING, // Tipo de dato para la contraseña
        allowNull: false // El campo no puede ser nulo
    },
    role: {
        type: DataTypes.ENUM('COACH', 'DIETITIST', 'PSYCHOLOGIST', 'DEVELOPER', 'USER'), // Enum para definir los roles disponibles
        allowNull: false // El campo no puede ser nulo
    },
    verified: {
        type: DataTypes.BOOLEAN, // Campo booleano para verificar el email
        allowNull: false, // No puede ser nulo
        defaultValue: false // Por defecto, el usuario no está verificado
    }
}, {
    createdAt: false, // No se generará el campo createdAt
    updatedAt: false // No se generará el campo updatedAt
})

export default User;
