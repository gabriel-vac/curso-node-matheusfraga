import { Router } from 'express';
import userController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', userController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // Todas as rotas que estiverem abaixo desse middleware irão precisar se autenticar (não preciso necessariamente passar o midleware como parâmetro no put abaixo)
routes.put('/users/:id', userController.update);

export default routes;
