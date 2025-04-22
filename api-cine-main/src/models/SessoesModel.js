import { DataTypes } from "sequelize";
import { sequelize } from "../configs/postgres.js";
import Sala from "./SalasModel.js";
import Filme from "./FilmesModel.js";

const Sessao = sequelize.define(
  'sessoes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lugares: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    dataInicio: {
      field: 'data_inicio',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW()
    },
    dataFim: {
        field: 'data_fim',
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW()
      },
    preco: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Sessao.belongsTo(Sala, {
    as: 'sala',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name:'idSala',
        allowNull: false,
        field: 'id_sala'
    }
});

Sessao.belongsTo(Filme, {
    as: 'filme',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name:'idFilme',
        allowNull: false,
        field: 'id_filme'
    }
});



export default Sessao;