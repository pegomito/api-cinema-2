import ingressoController from "../controllers/ingressoController.js";
import usuariosessaoController from "../controllers/usuariosessaoController.js";

export default (app) => {
  app.get("/sessoes/lugares-livres/:id", ingressoController.get);
  app.post("-", usuariosessaoController.persist);
};

/*{
  "idSessao": 5,
  "lugar": 3
}*/

// o que enviar no body do post