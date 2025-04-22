import padraolugarController from "../controllers/padraolugarController.js";

export default (app) => {
  app.get('/padrao-lugares', padraolugarController.get);
  app.get('/padrao-lugares/:id', padraolugarController.get);
  app.post('/padrao-lugares', padraolugarController.persist);
  app.patch('/padrao-lugares/:id', padraolugarController.persist);
  app.delete('/padrao-lugares/:id', padraolugarController.destroy);
};
