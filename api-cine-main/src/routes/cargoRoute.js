import cargoController from "../controllers/cargoController.js";
import tempoMiddleWare from "../middlewares/tempoMiddleWare.js";

export default (app) => {
  
  app.get('/cargos/:id',tempoMiddleWare, cargoController.get);
  app.get('/cargos', cargoController.get);
  app.post('/cargos', cargoController.persist);
  app.patch('/cargos/:id', cargoController.persist);
  app.delete('/cargos/:id', cargoController.destroy);
};
