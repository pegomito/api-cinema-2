import usuarioSessaoController from "../controllers/usuariosessaoController.js";

export default (app) => {
  app.get('/usuarios-sessoes', usuarioSessaoController.get);
  app.get('/usuarios-sessoes/:id', usuarioSessaoController.get);
  app.post('/usuarios-sessoes', usuarioSessaoController.persist);
  app.patch('/usuarios-sessoes/:id', usuarioSessaoController.persist);
  app.delete('/usuarios-sessoes/:id', usuarioSessaoController.destroy);
};
