import Sessao from "../models/SessoesModel.js";
import Sala from "../models/SalasModel.js";
import Filme from "../models/FilmesModel.js";

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Sessao.findAll({
        order: [['id', 'desc']],
        include: [
          { model: Sala, as: 'sala' },
          { model: Filme, as: 'filme' }
        ]
      });

      return res.status(200).send({
        message: 'Sessões encontradas',
        data: response
      });
    }

    const response = await Sessao.findOne({
      where: { id },
      include: [
        { model: Sala, as: 'sala' },
        { model: Filme, as: 'filme' }
      ]
    });

    if (!response) {
      return res.status(404).send('Sessão não encontrada');
    }

    return res.status(200).send({
      message: 'Sessão encontrada',
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
    const response = await Sessao.findOne({
      where: { id }
    });

    if (!response) {
      throw new Error('Sessão não encontrada');
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
    const { lugares, dataInicio, dataFim, preco, idSala, idFilme } = corpo;

    const response = await Sessao.create({
      lugares,
      dataInicio,
      dataFim,
      preco,
      idSala,
      idFilme
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
        message: 'Sessão criada com sucesso!',
        data: response
      });
    }

    const response = await update(req.body, id);
    return res.status(200).send({
      message: 'Sessão atualizada com sucesso!',
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

    const response = await Sessao.findOne({
      where: { id }
    });

    if (!response) {
      return res.status(404).send('Sessão não encontrada');
    }

    await response.destroy();

    return res.status(200).send({
      message: 'Sessão excluída com sucesso',
      data: response
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

export default {
  get,
  persist,
  destroy
};
