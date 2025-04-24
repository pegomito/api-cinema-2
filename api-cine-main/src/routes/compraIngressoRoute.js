import ingressoController from "../controllers/ingressoController.js";
import usuariosessaoController from "../controllers/usuariosessaoController.js";

export default (app) => {
  app.get("/sessoes/lugares-livres/:id", ingressoController.get);
  app.post("/sessoes/comprar/:lugar", usuariosessaoController.comprarSessao);
  app.patch("/sessoes/cancelar/:lugar", usuariosessaoController.cancelarSessao);
};
