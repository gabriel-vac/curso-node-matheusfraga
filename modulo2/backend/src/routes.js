//aqui vamos trabalhar só com rotas, então vou importar apenas o Router do express
// const { Router } = require('express');
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardController';
import ReserveController from './controllers/ReserveController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/houses', HouseController.index);
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.put(
    '/houses/:house_id',
    upload.single('thumbnail'),
    HouseController.update
);
routes.delete('/houses/:house_id', HouseController.destroy);

//Dashboard
routes.get('/dashboard', DashboardController.show);

//Reserve
routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel/:reserve_id', ReserveController.destroy);

//exportas as rotas
// module.exports = routes;
export default routes;
