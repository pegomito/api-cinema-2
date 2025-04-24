import UsuarioSessao from "../models/UsuariosSessoesModel.js";
import Usuario from "../models/UsuariosModel.js";
import Sessao from "../models/SessoesModel.js";
import { Op } from "sequelize";
import moment from "moment-timezone";
import { sequelize } from "../configs/postgres.js";

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await UsuarioSessao.findAll({
        order: [['id', 'desc']],
        include: [{ model: Usuario, as: 'usuario' }]
      });

      return res.status(200).send({
        message: 'Sessões de usuários encontradas',
        data: response
      });
    }

    const response = await UsuarioSessao.findOne({
      where: { id },
      include: [{ model: Usuario, as: 'usuario' }]
    });

    if (!response) {
      return res.status(404).send('Sessão de usuário não encontrada');
    }

    return res.status(200).send({
      message: 'Sessão de usuário encontrada',
      data: response
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

const update = async (corpo, id) => {
  try {
    const response = await UsuarioSessao.findOne({
      where: { id }
    });

    if (!response) {
      throw new Error('Sessão de usuário não encontrada');
    }

    Object.keys(corpo).forEach((item) => response[item] = corpo[item]);
    await response.save();

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const create = async (corpo) => {
  try {
    const { valorAtual, idUsuario, idSessao } = corpo;

    const response = await UsuarioSessao.create({
      valorAtual,
      idUsuario,
      idSessao
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const persist = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await create(req.body);
      return res.status(201).send({
        message: 'Sessão de usuário criada com sucesso!',
        data: response
      });
    }

    const response = await update(req.body, id);
    return res.status(200).send({
      message: 'Sessão de usuário atualizada com sucesso!',
      data: response
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return res.status(400).send('Informe um ID válido');
    }

    const response = await UsuarioSessao.findOne({
      where: { id }
    });

    if (!response) {
      return res.status(404).send('Sessão de usuário não encontrada');
    }

    await response.destroy();

    return res.status(200).send({
      message: 'Sessão de usuário excluída com sucesso',
      data: response
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

class AlternativoController {

  static formatDate(date) {
    return moment(date).format("DD/MM/YYYY HH:mm");
  }

  static async comprarSessao(req, res) {
    try {
      const { lugar } = req.params;
      
      if (!lugar) {
        return res.status(400).send({ error: "Lugar não informado" });
      } 
      const dados = req.body; 

      if (!dados.idSessao || !dados.idUsuario ) {
        return res.status(400).send({ error: "Informações inválidas" });
      }

      const usuario = await Usuario.findByPk(dados.idUsuario);
      if (!usuario) {
        return res.status(400).send({
          error: `Nenhum usuário encontrado com o id ${dados.idUsuario}`,
        });
      }

      usuario.idCargo = await usuario.getCargo();
      
      if (usuario.idCargo?.descricao === "atendente") {
        return res.status(400).send({
          error: "Atendentes não podem comprar ingressos",
        });
      }

      const sessaoBanco = await Sessao.findOne({
        where: {
          id: dados.idSessao,
          dataInicio: {
            [Op.gt]: new Date(Date.now()),
          },
        },
      });

      if (!sessaoBanco) {
        return res.status(400).send({
          error: `Nenhuma sessão válida encontrada com o id ${dados.idSessao}`,
        });
      }

      const sessao = sessaoBanco.toJSON();

      const dataInicio = moment.tz(sessao.dataInicio, "utc").format();
      const dataFim = moment.tz(sessao.dataFim, "utc").format();

      const sessoesConflito = await sequelize
        .query(
          `
        SELECT
          s.*
        FROM sessoes AS s
        JOIN usuarios_sessoes AS us ON (s.id = us.id_sessao)
        WHERE us.id_usuario = ${usuario.id} 
          AND (('${dataInicio}' BETWEEN s.data_inicio AND s.data_fim) 
          OR ('${dataFim}' BETWEEN s.data_inicio AND s.data_fim) 
          OR ('${dataInicio}' < s.data_inicio AND '${dataFim}' > s.data_fim));
      `
        )
        .then((a) => a[0]);

      if (sessoesConflito.find((a) => a.id === sessao.id)) {
        return res.status(400).send({
          error: "Usuário já comprou ingresso para essa sessão!",
        });
      }

      if (sessoesConflito.length) {
        return res.status(400).send({
          error: "Usuário já comprou ingresso para outra(s) sessões neste horário!",
        });
      }

    console.log(sessao);
    
      const indexLugar = sessao.lugares.findIndex(
        (a) => a.lugar === Number(lugar)
      );

      if (indexLugar === -1) {
        return res.status(400).send({ error: "Lugar não encontrado na sessão!" });
      }

      if (sessao.lugares[indexLugar].alocado) {
        return res.status(400).send({
          error: "Lugar escolhido já se encontra vendido!",
        });
      }

      sessao.lugares[indexLugar].alocado = true;
      sessao.lugares[indexLugar].idUsuario = usuario.id;
      sessaoBanco.lugares = sessao.lugares;

      await sessaoBanco.save();

      sessaoBanco.idFilme = await sessaoBanco.getFilme();

      const responseFim = {
        Filme: sessaoBanco.idFilme.nome,
        Sessão: AlternativoController.formatDate(sessao.dataInicio), 
        Valor: Number(sessao.preco),
      };

      await create({
        idUsuario: usuario.id,
        idSessao: sessaoBanco.id,
        valorAtual: sessaoBanco.preco,
      });

      return res.status(201).send(responseFim);

    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Erro interno no servidor" });
    }
  }

  static async cancelarSessao(req, res) {
    try {
      const { lugar } = req.params;
      const dados = req.body; 

      if (!lugar) {
        return res.status(400).send({ error: "Lugar não informado" });
      } 

      if (!dados.idSessao || !dados.idUsuario ) {
        return res.status(400).send({ error: "Informações inválidas" });
      }

      const usuario = await Usuario.findByPk(dados.idUsuario);
      if (!usuario) {
        return res.status(400).send({
          error: `Nenhum usuário encontrado com o id ${dados.idUsuario}`,
        });
      }

      const sessaoBanco = await Sessao.findOne({
        where: {
          id: dados.idSessao,
          dataInicio: {
            [Op.gt]: new Date(Date.now()),
          },
        },
      });

      if (!sessaoBanco) {
        return res.status(400).send({
          error: `Nenhuma sessão válida encontrada com o id ${dados.idSessao}`,
        });
      }

      const sessao = sessaoBanco.toJSON();

      const indexLugar = sessao.lugares.findIndex(
        (a) => a.lugar === Number(lugar)
      );

      if (indexLugar === -1) {
        return res.status(400).send({ error: "Lugar não encontrado na sessão!" });
      }

      if (!sessao.lugares[indexLugar].alocado) {
        return res.status(400).send({
          error: "Lugar escolhido não está vendido!",
        });
      }

      sessao.lugares[indexLugar].alocado = false;
      sessao.lugares[indexLugar].idUsuario = null;
      sessaoBanco.lugares = sessao.lugares;

      await sessaoBanco.save();

      return res.status(200).send({ message: "Ingresso cancelado com sucesso!" });

    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Erro interno no servidor" });
    }
  }
}

export default {
  get,
  persist,
  destroy,
  comprarSessao: AlternativoController.comprarSessao,
  cancelarSessao: AlternativoController.cancelarSessao
};


