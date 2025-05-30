
import { DataTypes } from "sequelize";
import { sequelize } from "../configs/postgres.js";

const Filme = sequelize.define(
  'filmes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    autor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    duracao: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    imagemCartaz: { 
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Filme;
