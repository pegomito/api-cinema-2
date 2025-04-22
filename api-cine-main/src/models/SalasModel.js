import { DataTypes } from "sequelize";
import { sequelize } from "../configs/postgres.js";
import PadraoLugar from "./PadraoLugaresModel.js";

const Sala = sequelize.define(
  'salas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    observacao: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Sala.belongsTo(PadraoLugar, {
    as: 'padraolugares',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name:'idPadraoLugares',
        allowNull: false,
        field: 'id_padrao_lugares'
    }
});



export  default Sala;