import salaController from "../controllers/salaController.js";

export default (app) => {
  app.get('/salas', salaController.get);
  app.get('/salas/:id', salaController.get);
  app.post('/salas', salaController.persist);
  app.patch('/salas/:id', salaController.persist);
  app.delete('/salas/:id', salaController.destroy);
};
