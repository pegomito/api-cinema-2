
import Usuario from "../models/UsuariosModel.js";
import Cargo from "../models/CargosModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const getDataByToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 

    if (!token) {
      return res.status(401).send({
        message: 'token não informado'
      })
    }

    const user = jwt.verify(token, process.env.TOKEN_KEY);

    if (!user) {
      return res.status(401).send({
        message: 'token inválido'
      })
    }
    
    const userId = user.idUsuario;

    const userData = await Usuario.findOne({
      where: {
        id: userId
      },
      include: [{ model: Cargo, as: 'cargo' }]
    });
    
    if (!userData) {
      return res.status(404).send({
        message: 'usuario não encontrado'
      })
    }

    return res.status(200).send({
      message: 'usuario encontrado',
      response: userData,
    });

  } catch (error) {
    return res.status(500).send({
      message: error.message,
      data: null
    });
  }
}

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
  
  const login = async (req, res) => {
    try {
      const{ 
        email, 
        password } = req.body;

        const user = await Usuario.findOne({
          where: {
            email
          }
        });
        if (!user) {
          return res.status(400).send('email ou senha invalidos');
        }
        const comparacaoSenha = await bcrypt.compare(password, user.passwordHash);

        if (!comparacaoSenha) {
          return res.status(400).send('email ou senha invalidos');
        }
        if(comparacaoSenha){
          const token = jwt.sign({
            idUsuario: user.id, 
            nome: user.nome,
            email: user.email,
            idCargo: user.idCargo
          }, process.env.TOKEN_KEY, {
            expiresIn: '8h'
          });

          return res.status(200).send({
            message: 'login realizado com sucesso',
            data: user,
            response: token
          });
        }

        
    }    catch (error) {
      return res.status(500).send({
        message: error.message
      });
    }
  }

  const persist = async (req, res) => {
    try {
      const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
  
      if (!id) {
        const response = await create(req.body, res);
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

const create = async (corpo, res) => {
    
  try {
      const {
        nome,
        cpf,
        email,
        estudante,
        password,
        idCargo
      } = corpo;

      const verficarEmail = await Usuario.findOne({
        where: {
          email
        }
      });

      if (verficarEmail) {  
        return res.status(400).send('email ja cadastrado'); 
      }

      const passwordHash = await bcrypt.hash(password,10);

      const response = await Usuario.create({
        nome: nome,
        cpf,
        email,
        passwordHash,
        estudante,
        idCargo 
      });
      console.log(passwordHash);
  
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
    destroy,
    login,
    getDataByToken
  }