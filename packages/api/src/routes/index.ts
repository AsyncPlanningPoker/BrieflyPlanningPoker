import * as errorHandler from '../middlewares/schemaHandler';
import { create, login } from '../schemas/user';
import { checkSchema } from 'express-validator';
import * as user from './user';
import { Router } from 'express';

const routes = Router();

routes.post('/user', checkSchema(create), errorHandler.schemaError, user.create);
routes.post('/user/login', checkSchema(login), errorHandler.schemaError, user.login);
routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default routes;
