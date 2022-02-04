import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // Verificando se email existe
    // como usa o mesmo nome posso usar a forma simplificada (se não teria que ser emaiL : email)
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuario não existe' });
    }

    // Verificar se a senha nao bate
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, name } = user;

    // 0800fc577294c34e0b28ad2839435945 hash da palavra hash
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
