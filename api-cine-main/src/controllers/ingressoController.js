import Sessao from "../models/SessoesModel.js";

const get = async (req, res) => {
    const { id } = req.params;
    try {
        const sessao = await Sessao.findByPk(id);

        if (!sessao) {
            return res.status(404).json({ message: "Sessão não encontrada" });
        }

        const { lugares } = sessao;
        
        if (!Array.isArray(lugares)) {
            return res.status(400).json({ message: "Formato de lugares inválido" });
        }
        const lugaresLivres = lugares.filter(l => l.alocado === false);

        return res.status(200).json(lugaresLivres);

    } catch (error) {
        console.error("Erro ao buscar lugares livres:", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

export default {
    get
};
