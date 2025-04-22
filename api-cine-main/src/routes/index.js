import padraolugarRoute from "./padraolugarRoute.js";
import usuarioRoute from "./usuarioRoute.js";
import cargoRoute from "./cargoRoute.js";
import filmeRoute from "./filmeRoute.js";
import salaRoute from "./salaRoute.js";
import sessaoRoute from "./sessaoRoute.js";
import usuariosessaoRoute from "./usuariosessaoRoute.js";
import parametroRoute from "./parametroRoute.js";
import compraIngressoRoute from "./compraIngressoRoute.js";

function Routes(app) {
    usuarioRoute(app);
    padraolugarRoute(app);
    cargoRoute(app);
    filmeRoute(app);
    salaRoute(app);
    sessaoRoute(app);
    usuariosessaoRoute(app);
    parametroRoute(app);
    compraIngressoRoute(app);
}

export default Routes;
