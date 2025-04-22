
import Usuario from "../models/UsuariosModel.js";
import Cargo from "../models/CargosModel.js";

const get = async (req, res) => {
  try {
    
    const id = req.params.id ? Number(req.params.id) : null;

    if (!id) {
      const response = await Usuario.findAll({
        order: [['id', 'desc']],
        include: [{ model: Cargo, as: 'cargo' }] 
      });

      return res.status(200).send({
        message: 'Usuários encontrados',
        data: response
      });
    }

    if (isNaN(id)) {
      return res.status(400).send({ message: 'ID inválido' }); 
    }

    const response = await Usuario.findOne({
      where: { id },
      include: [{ model: Cargo, as: 'cargo' }]
    });

    if (!response) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    return res.status(200).send({
      message: 'Usuário encontrado',
      data: response,
    });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


const update = async (corpo, id) => {
    try {
      const response = await Usuario.findOne({
        where: {
          id
        }
      });
  
      if (!response) {
        throw new Error('Nao achou');
      }
  
      Object.keys(corpo).forEach((item) => response[item] = corpo[item]);
      await response.save();
  
      return response;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const persist = async (req, res) => {
    try {
      const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
  
      if (!id) {
        const response = await create(req.body);
        return res.status(201).send({
          message: 'criado com sucesso!',
          data: response
        });
      }
  
      const response = await update(req.body, id);
      return res.status(201).send({
        message: 'atualizado com sucesso!',
        data: response
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message
      });
    }
  }

const create = async (corpo) => {
    try {
      const {
        nome,
        cpf,
        email,
        estudante,
        idCargo
      } = corpo
  
      const response = await Usuario.create({
        nome: nome,
        cpf,
        email,
        estudante,
        idCargo
      });
  
      return response;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const destroy = async (req, res) => {
    try {
      const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
      if (!id) {
        return res.status(400).send('informa ai paezao')
      }
  
      const response = await Usuario.findOne({
        where: {
          id
        }
      });
  
      if (!response) {
        return res.status(404).send('nao achou');
      }
  
      await response.destroy();
  
      return res.status(200).send({
        message: 'registro excluido',
        data: response
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message
      });
    }
  }

  export default {
    get,
    persist,
    destroy
  }