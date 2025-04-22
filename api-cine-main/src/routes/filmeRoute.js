import filmesController from "../controllers/filmesController.js";

export default (app) => {
  app.get('/filmes', filmesController.get);
  app.get('/filmes/:id', filmesController.get);
  app.post('/filmes', filmesController.persist);
  app.patch('/filmes/:id', filmesController.persist);
  app.delete('/filmes/:id', filmesController.destroy);
};
