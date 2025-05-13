import Filme from "../models/FilmesModel.js";
import uploadFile from "../utils/uploadFile.js";

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Filme.findAll({
        order: [['id', 'desc']]
      });

      return res.status(200).send({
        message: 'Filmes encontrados',
        data: response
      });
    }

    const response = await Filme.findOne({
      where: { id }
    });

    if (!response) {
      return res.status(404).send('Filme não encontrado');
    }

    return res.status(200).send({
      message: 'Filme encontrado',
      data: response,
    });

  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

const update = async (corpo, id) => {
  try {
    const response = await Filme.findOne({
      where: { id }
    });

    if (!response) {
      throw new Error('Filme não encontrado');
    }

    Object.keys(corpo).forEach((item) => response[item] = corpo[item]);
    await response.save();

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const create = async (corpo, file) => {
  try {
    const { nome, descricao, autor, duracao } = corpo;

    if (!nome || !descricao || !autor || !duracao) {
      throw new Error("Preencha todos os campos obrigatórios");
    }

    let imagemCartaz = null;

    if (file) {
      const uploadResult = await uploadFile(file, {
        tipo: "imagem",
        tabela: "filmes",
        id: nome.replace(/\s+/g, "_").toLowerCase(),
      });

      if (uploadResult.type === "erro") {
        throw new Error(uploadResult.message);
      }

      imagemCartaz = uploadResult.uploadPath;
    }

    const response = await Filme.create({
      nome,
      descricao,
      autor,
      duracao,
      imagemCartaz,
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const persist = async (req, res) => {
  try {
    console.log("Arquivos recebidos:", req.files);
    console.log("Dados recebidos:", req.body); 

    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      
      const response = await create(req.body, req.files ? req.files.imagemCartaz : null);
      return res.status(201).send({
        message: "Filme criado com sucesso!",
        data: response,
      });
    }

    const response = await update(req.body, id);
    return res.status(200).send({
      message: "Filme atualizado com sucesso!",
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return res.status(400).send('Informe um ID válido');
    }

    const response = await Filme.findOne({
      where: { id }
    });

    if (!response) {
      return res.status(404).send('Filme não encontrado');
    }

    await response.destroy();

    return res.status(200).send({
      message: 'Filme excluído com sucesso',
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
