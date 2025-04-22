import PadraoLugar from "../models/PadraoLugaresModel.js";

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await PadraoLugar.findAll({
        order: [['id', 'desc']]
      });

      return res.status(200).send({
        message: 'Padrões de lugares encontrados',
        data: response
      });
    }

    const response = await PadraoLugar.findOne({
      where: { id }
    });

    if (!response) {
      return res.status(404).send('Padrão de lugar não encontrado');
    }

    return res.status(200).send({
      message: 'Padrão de lugar encontrado',
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
    const response = await PadraoLugar.findOne({
      where: { id }
    });

    if (!response) {
      throw new Error('Padrão de lugar não encontrado');
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
    const { lugares } = corpo;

    const response = await PadraoLugar.create({
      lugares
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
        message: 'Padrão de lugar criado com sucesso!',
        data: response
      });
    }

    const response = await update(req.body, id);
    return res.status(200).send({
      message: 'Padrão de lugar atualizado com sucesso!',
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

    const response = await PadraoLugar.findOne({
      where: { id }
    });

    if (!response) {
      return res.status(404).send('Padrão de lugar não encontrado');
    }

    await response.destroy();

    return res.status(200).send({
      message: 'Padrão de lugar excluído com sucesso',
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
