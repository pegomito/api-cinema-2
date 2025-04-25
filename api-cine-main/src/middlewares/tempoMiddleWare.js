
import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).send({
                message: 'token não informado'
            })
        }

        const user = jwt.verify(token, process.env.TOKEN_KEY);

        if (!user) {
            return res.status(401).send({
                message: 'token inválido'
            })
        }
        
    if(user) {
        return res.status(200).send({
          message: 'token valido',
          data: user
        })
      }
        next();

    } catch (error) {
        return res.status(500).send({
            message:'erro no middleware',
            error
        });
    }
}