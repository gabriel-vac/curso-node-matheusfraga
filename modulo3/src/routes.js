import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/teste', async (req, res) => {
  const user = await User.create({
    name: 'Matheus',
    email: 'matheus@gmail.com',
    password_hash: '123123',
  });
  res.json(user);
});

export default routes;
