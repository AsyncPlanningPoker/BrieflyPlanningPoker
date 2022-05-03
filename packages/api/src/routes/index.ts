import { create, login, passRecovery, passUpdate } from '../schemas/user';
import * as schema from '../middlewares/schema/schema';
import { checkSchema } from 'express-validator';
import { Router } from 'express';
import * as user from './user';

const routes = Router();

routes.post('/user', checkSchema(create), schema.handler, user.create);
routes.post('/user/login', checkSchema(login), schema.handler, user.login);
routes.post('/user/pass-recovery', checkSchema(passRecovery), schema.handler, user.passRecovery);
routes.patch('/user/pass-recovery', checkSchema(passUpdate), schema.handler, user.passUpdate);
routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default routes;
