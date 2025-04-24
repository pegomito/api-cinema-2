import Sessao from "../models/SessoesModel.js";

const get = async (req, res) => {
    const { id } = req.params;
    try {
        const sessao = await Sessao.findByPk(id);

        if (!sessao) {
            return res.status(404).send({ 
                message: "sessao nao existe" 
            });
        }

        const { lugares } = sessao;
        //|| !Array.isArray(lugares)
        if (!lugares ) {
            return res.status(400).send({    
                message: "formato errado de lugares" 
            });
        }
        const lugaresLivres = lugares.filter(lugar => lugar.alocado === false);

        return res.status(200).send(lugaresLivres);

    } catch (error) {
        console.error("erro", error);
        return res.status(500).send({ 
            message: error.message
        });
    }
};

export default {
    get
};
