
import usuarioController from "../controllers/usuarioController.js";

export default (app) => {
  app.get('/usuarios', usuarioController.get);
  app.get('/usuarios/:id', usuarioController.get);
  app.post('/usuarios', usuarioController.persist);
  app.patch('/usuarios/:id', usuarioController.persist);
  app.delete('/usuarios/:id', usuarioController.destroy);
};