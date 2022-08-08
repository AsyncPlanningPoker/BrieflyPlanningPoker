import { createUser, login, passRecovery, passUpdate } from '../schemas/user';
import { createSquad, updateSquad, addMembers } from '../schemas/squad';
import * as auth from '../middlewares/authorization/handler';
import * as schema from '../middlewares/schema/schema';
import { checkSchema } from 'express-validator';
import { Router } from 'express';
import * as squad from './squad';
import * as user from './user';

const routes = Router();

routes.post('/user', checkSchema(createUser), schema.handler, user.create);
routes.post('/user/login', checkSchema(login), schema.handler, user.login);
routes.post('/user/pass-recovery', checkSchema(passRecovery), schema.handler, user.passRecovery);
routes.patch('/user/pass-recovery', checkSchema(passUpdate), schema.handler, user.passUpdate);

routes.post('/squad', checkSchema(createSquad), schema.handler, auth.handler, squad.create);
routes.get('/squad/', auth.handler, squad.list);
routes.put('/squad/:squadId', checkSchema(updateSquad), schema.handler, auth.handler, squad.update);
routes.get('/squad/:squadId/users', auth.handler, squad.listUsers);
routes.post('/squad/:squadId/users', checkSchema(addMembers), schema.handler, auth.handler, squad.addUsers);
routes.delete('/squad/:squadId/users', auth.handler, squad.delUsers);

routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default routes;
