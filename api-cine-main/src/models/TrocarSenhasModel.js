import { DataTypes } from 'sequelize';
import { sequelize } from '../configs/postgres.js';
import Usuario from './UsuariosModel.js';

const Troca = sequelize.define('troca', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigoTemp: {
        field: 'codigo_temp',
        type: DataTypes.STRING,
        allowNull: true
    },
    codigoTempExp: {
        field: 'codigo_temp_exp',
        type: DataTypes.DATE,
        allowNull: true
    },
    
},

{
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
},

);

Troca.belongsTo(Usuario, {
    as: 'usuario',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name:'idUsuario',
        allowNull: false,
        field: 'id_usuario'
    }
});

export default Troca;
