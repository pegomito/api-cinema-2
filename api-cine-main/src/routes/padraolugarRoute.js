import padraoLugarController from "../controllers/padraolugarController.js";

export default (app) => {
  app.get('/padrao-lugares', padraoLugarController.get);
  app.get('/padrao-lugares/:id', padraoLugarController.get);
  app.post('/padrao-lugares', padraoLugarController.persist);
  app.patch('/padrao-lugares/:id', padraoLugarController.persist);
  app.delete('/padrao-lugares/:id', padraoLugarController.destroy);
};
