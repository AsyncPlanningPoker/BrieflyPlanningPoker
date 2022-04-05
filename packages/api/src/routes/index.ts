import * as errorHandler from '../middlewares/errorHandler';
import { checkSchema } from 'express-validator';
import { create, login } from '../schemas/user';
import * as user from './user/user';
import { Router } from 'express';

const routes = Router();

routes.post('/user', checkSchema(create), errorHandler.schemaError, user.create);
routes.post('/user/login', checkSchema(login), errorHandler.schemaError, user.login);
// routes.patch('/user/recovery', User.recovery);
routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default routes;
