
import usuarioController from "../controllers/usuarioController.js";
import cargoMiddleWare from "../middlewares/cargoMiddleWare.js";

export default (app) => {
  app.get('/usuarios/validar', usuarioController.getDataByToken);
  app.get('/usuarios', usuarioController.get);
  app.get('/usuarios/:id',cargoMiddleWare, usuarioController.get);
  app.post('/usuarios', usuarioController.persist);
  app.patch('/usuarios/:id', usuarioController.persist);
  app.delete('/usuarios/:id', usuarioController.destroy);
  app.post('/usuarios/login', usuarioController.login);

};