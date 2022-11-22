import { createUser, login, passRecovery, passUpdate, updateUser } from '../schemas/user';
import { createSquad, updateSquad, addMembers } from '../schemas/squad';
import { createTask } from '../schemas/task';
import { vote, message } from '../schemas/voting';
import * as auth from '../middlewares/authorization/handler';
import * as schema from '../middlewares/schema/schema';
import { checkSchema } from 'express-validator';
import { Router } from 'express';
import * as squad from './squad';
import * as task from './task';
import * as user from './user';
import * as voting from './voting';

const routes = Router();

routes.post('/user', checkSchema(createUser), schema.handler, user.create);
routes.post('/user/login', checkSchema(login), schema.handler, user.login);
routes.post('/user/pass-recovery', checkSchema(passRecovery), schema.handler, user.passRecovery);
routes.patch('/user/pass-recovery', checkSchema(passUpdate), schema.handler, user.passUpdate);
routes.delete('/user', auth.handler, user.deleteUser);
routes.put('/user', checkSchema(updateUser), schema.handler, auth.handler, user.updateUser);

routes.post('/squad', checkSchema(createSquad), schema.handler, auth.handler, squad.create);
routes.get('/squad/', auth.handler, squad.findAll);
routes.put('/squad/:squadId', checkSchema(updateSquad), schema.handler, auth.handler, squad.update);
routes.get('/squad/:squadId', auth.handler, squad.find);
routes.post('/squad/:squadId/users', checkSchema(addMembers), schema.handler, auth.handler, squad.addUsers);
routes.delete('/squad/:squadId/users', auth.handler, squad.delUsers);

routes.post('/squad/:squadId/task', checkSchema(createTask), schema.handler, auth.handler, task.create);
routes.put('/squad/:squadId/task/:taskId/deactive', auth.handler, task.deactive);
routes.delete('/squad/:squadId/task/:taskId', auth.handler, task.deleteTask);
routes.get('/squad/:squadId/task', auth.handler, task.findAll);
routes.get('/squad/:squadId/task/:taskId', auth.handler, task.find);

routes.post('/squad/:squadId/task/:taskId/vote', checkSchema(vote), schema.handler, auth.handler, voting.vote);
routes.post('/squad/:squadId/task/:taskId/message', checkSchema(message), schema.handler, auth.handler, voting.message);

routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default routes;
