import cargoController from "../controllers/cargoController.js";

export default (app) => {
  app.get('/cargos', cargoController.get);
  app.get('/cargos/:id', cargoController.get);
  app.post('/cargos', cargoController.persist);
  app.patch('/cargos/:id', cargoController.persist);
  app.delete('/cargos/:id', cargoController.destroy);
};
