import UsuarioSessao from "../models/UsuariosSessoesModel.js";
import Usuario from "../models/UsuariosModel.js";
import Sessao from "../models/SessoesModel.js";

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
    const { valorAtual, idUsuario } = corpo;

    const response = await UsuarioSessao.create({
      valorAtual,
      idUsuario
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

const postcompra = async (req, res) => {
  try {
    const { idSessao } = req.body;
    const sessao = await Sessao.findByPk(idSessao);

    if (!sessao) {
      return res.status(404).send('Sessão não encontrada');
    }
  } catch (error) {
    console.error("Erro na criação da compra:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export default {
  get,
  persist,
  destroy,
  postcompra
};


