import sessaoController from "../controllers/sessaoController.js";

export default (app) => {
  app.get('/sessoes', sessaoController.get);
  app.get('/sessoes/:id', sessaoController.get);
  app.post('/sessoes', sessaoController.persist);
  app.patch('/sessoes/:id', sessaoController.persist);
  app.delete('/sessoes/:id', sessaoController.destroy);
};
