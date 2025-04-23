
import { DataTypes } from "sequelize";
import { sequelize } from "../configs/postgres.js";
import Usuario from "./UsuariosModel.js";
import Sessao from "./SessoesModel.js";

const UsuarioSessao = sequelize.define(
  'usuarios_sessoes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valorAtual: {
      field: 'valor_atual',
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

UsuarioSessao.belongsTo(Usuario, {
    as: 'usuario',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name:'idUsuario',
        allowNull: false,
        field: 'id_usuario'
    }
}); 

UsuarioSessao.belongsTo(Sessao, {
    as: 'sessao',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name:'idSessao',
        allowNull: false,
        field: 'id_sessao'
    }
});

export default UsuarioSessao;