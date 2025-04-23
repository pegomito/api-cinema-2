import usuariosessaoController from "../controllers/usuariosessaoController.js";

export default (app) => {
  app.get('/usuarios-sessoes', usuariosessaoController.get);
  app.get('/usuarios-sessoes/:id', usuariosessaoController.get);
  app.post('/usuarios-sessoes', usuariosessaoController.persist);
  app.patch('/usuarios-sessoes/:id', usuariosessaoController.persist);
  app.delete('/usuarios-sessoes/:id', usuariosessaoController.destroy);
};
