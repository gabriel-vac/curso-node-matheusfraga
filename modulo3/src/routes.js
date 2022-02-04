import { Router } from 'express';
import userController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', userController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // Todas as rotas que estiverem abaixo desse middleware irão precisar se autenticar (não preciso necessariamente passar o midleware como parâmetro no put abaixo)
routes.put('/users/:id', userController.update);
// Tasks
routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.store);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.delete);

export default routes;
