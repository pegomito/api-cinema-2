import ingressoController from "../controllers/ingressoController.js";
import usuariosessaoController from "../controllers/usuariosessaoController.js";

export default (app) => {
  app.get("/sessoes/:id/lugares-livres", ingressoController.get);
  app.post("-", usuariosessaoController.persist);
};

// o que enviar no body do get

/*{
  "idSessao": 5,
  "lugar": 3
}*/

// o que enviar no body do post