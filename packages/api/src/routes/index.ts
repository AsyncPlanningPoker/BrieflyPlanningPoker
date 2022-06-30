import { createUser, login, passRecovery, passUpdate } from '../schemas/user';
import { createSquad, updateSquad, members } from '../schemas/squad';
import * as schema from '../middlewares/schema/schema';
import { checkSchema } from 'express-validator';
import { Router } from 'express';
import * as user from './user';
import * as squad from './squad';
import * as auth from '../middlewares/authorization/handler';

const routes = Router();

routes.post('/user', checkSchema(createUser), schema.handler, user.create);
routes.post('/user/login', checkSchema(login), schema.handler, user.login);
routes.post('/user/pass-recovery', checkSchema(passRecovery), schema.handler, user.passRecovery);
routes.patch('/user/pass-recovery', checkSchema(passUpdate), schema.handler, user.passUpdate);

routes.post('/squad', checkSchema(createSquad), schema.handler, auth.handler, squad.create);
routes.get('/squad/:userId', auth.handler, squad.list);
routes.delete('/squad/:squadId', auth.handler, squad.del);
routes.put('/squad/:squadId', checkSchema(updateSquad), schema.handler, auth.handler, squad.update);
routes.post('/squad/:squadId', checkSchema(members), schema.handler, auth.handler, squad.addMembers);
routes.delete('/squad/:squadId', checkSchema(members), schema.handler, auth.handler, squad.deleteMembers);

routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default routes;
