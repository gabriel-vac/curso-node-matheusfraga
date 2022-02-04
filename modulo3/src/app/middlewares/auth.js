import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não existe' });
  }

  // split : retirar
  // a virgula descara a primeira posição, assim pegando só o token
  const [, token] = authHeader.split(' ');

  try {
    // const decoded = jwt.verify(token, authConfig.secret, () => {
    //   console.log(decoded); // usando callback
    //   return next();
    // });
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    console.log(decoded);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
