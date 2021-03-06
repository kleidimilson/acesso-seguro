import express, { response } from 'express';
import { celebrate, Joi} from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import AccessController from './controllers/AccessController';
import UsersController from './controllers/UsersController';

//index, show, create ,update, delete

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();
const usersController = new UsersController();
const accessController = new AccessController();

routes.get('/users', usersController.index);

routes.get('/users/:id', usersController.show);

routes.get('/access_control', accessController.index);
routes.post('/access_control', accessController.create);

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
  '/points', 
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }, {
    abortEarly: false
  }),
  pointsController.create
);

export default routes;

//Service Pattern
//Repostiroy Pattern (Data Mapper)