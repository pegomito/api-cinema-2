import Sessao from "../models/SessoesModel";
import Sala from "../models/SalasModel";
import Filme from "../models/FilmesModel";
//import UsuarioSessao from "../models/UsuariosSessoesModel";
//import usuarioController from "./usuarioController";
//import usuarioSessaoController from "./usuariosessaoController";

const get  = async (req, res) => {

const { id } = req.url.split('/').slice(-2)[0];

  try {
    const sessao = await Sessao.findByPk(id);

    const { idSala } = req.params;
    const sala = await Sala.findByPk(idSala);
    if (!sala) return res.status(400).json({ message: "Sala não encontrada" });

    const { idFilme } = req.params;
    const filme = await Filme.findByPk(idFilme);
    if (!filme) return res.status(400).json({ message: "Filme não encontrado" });

    if (!sessao) {
      return res.status(404).json({ message: "Sessão não encontrada" });
    }

    const { lugares } = sessao.lugares;

    if (!Array.isArray(lugares)) {
      return res.status(400).json({ message: "Formato de lugares inválido" });
    }

    const livres = lugares.filter(l => l.alocado === false);

    return res.status(200).json(livres);

  } catch (error) {
    console.error("Erro ao buscar lugares livres:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export default {
    get,
};
