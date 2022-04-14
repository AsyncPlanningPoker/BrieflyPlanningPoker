import * as schema from '../middlewares/schema/schema';
import { create, login } from '../schemas/user';
import { checkSchema } from 'express-validator';
import * as user from './user';
import { Router } from 'express';

const routes = Router();

routes.post('/user', checkSchema(create), schema.handler, user.create);
routes.post('/user/login', checkSchema(login), schema.handler, user.login);
routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default routes;
