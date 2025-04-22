import parametroController from "../controllers/parametroController.js";

export default (app) => {
  app.get('/parametros', parametroController.get);
  app.get('/parametros/:id', parametroController.get);
  app.post('/parametros', parametroController.persist);
  app.patch('/parametros/:id', parametroController.persist);
  app.delete('/parametros/:id', parametroController.destroy);
};
