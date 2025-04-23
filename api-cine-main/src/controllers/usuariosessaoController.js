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

const postcompra1 = async (req, res) => {
  try {
    const { idSessao } = req.body;
    const { lugar } = req.body;
    const { lugares } = sessao.lugares
    const sessao = await Sessao.findByPk(idSessao);

    if (!sessao) {
      return res.status(404).send('sessão não encontrada');
    }
    const lugaresAlocados = lugares.lugares.alocado = true;

    if (lugaresAlocados.includes(lugar)) {
      return res.status(400).send('lugar ocupado po');
    }

    if (!lugaresAlocados.includes(lugar)) {
      await UsuarioSessao.findOne({
        where: { idUsuario: req.usuario.id, idSessao }
      });

    }


    /*  if (usuarioSessao) {
        return res.status(400).send('usuario já possui um ingresso para esta sessão');
      }*/


  } catch (error) {
    error.message
    //= 'erro da compra';

    return res.status(500).send({
      error: error.message
    });
  }
};

const postcompra2 = async (req, res) => {
  try {
    const { idSessao, lugar, idUsuario } = req.body;

    if (!idSessao) {
      return res.status(400).send('Informe um ID de sessão válido');
    }

    if (!idUsuario) {
      return res.status(400).send('Informe um ID de usuário válido');
    }

    const sessao = await Sessao.findByPk(idSessao);

    if (!sessao) {
      return res.status(404).send('Sessão não encontrada');
    }

    const lugares = sessao.toJSON().lugares;

    //if (!lugares) {
    // return res.status(400).send({
    //    message: "Formato errado de lugares"
    //  });
    //}

    const lugarIn = lugares.lugares.findIndex(l => l.numero === lugar.numero);

    if (lugarIn === -1) {
      return res.status(404).send('Lugar não existe');
    }

    if (lugares[lugarIn].alocado) {
      return res.status(400).send('Lugar ocupado');
    }

    lugares[lugarIn].idUsuario = idUsuario;
    lugares[lugarIn].alocado = true;

    const usuarioSessao = await UsuarioSessao.create({
      idUsuario,
      idSessao,
      lugar: lugar.numero 
    });
    
    sessao.lugares = lugares;
    await sessao.save();

    return res.status(200).send({
      message: 'Lugar reservado com sucesso',
      lugar: lugares[lugarIn],
      usuarioSessao
    });
  } catch (error) {
    error.message = 'erro na reserva do lugar';

    return res.status(500).send({
      message: 'erro no processamento',
    });
  }
};


//body do JSON
// {
//   "idSessao": 1,
//   "lugar": {
//     "numero": 5
//   },
//   "idUsuario": 123
// }


export default {
  get,
  persist,
  destroy,
  postcompra2,
  postcompra1
};


