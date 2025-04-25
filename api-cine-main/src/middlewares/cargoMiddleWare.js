import  Cargo  from "../models/CargosModel.js";
import Usuario  from "../models/UsuariosModel.js";

export default async (req, res, next) => {
  try {
    
    const userId = req.user?.id; 
    if (!userId) {
      return res.status(401).send({
        message: "usuário não autenticado",
      });
    }

    const user = await Usuario.findOne({
      where: { id: userId },
      include: [{ model: Cargo, as: "cargo" }],
    });

    if (!user || !user.cargo) {
      return res.status(403).send({
        message: "seu cargo não tem acesso a essa funcionalidade",
      });
    }

    if (user.cargo.id !== 1) { 
      return res.status(403).send({
        message: "seu cargo não tem acesso a essa funcionalidade",
      });
    }

    if (user.cargo.id === 1) {
      return res.status(200).send({
        message: "cargo autorizado",
        data: user,
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};