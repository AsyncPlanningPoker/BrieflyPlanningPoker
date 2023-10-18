import * as auth from '../middlewares/authorization';
import * as squad from './squad';
import * as task from './task';
import * as user from './user';
import * as voting from './voting';
import { zodiosRouter } from '@zodios/express';
import apiDef from '@briefly/prisma/dist/apiDef'
import context from 'context';

const routes = zodiosRouter(apiDef, { context });
routes.use("/users", user.usersRouter);

// routes.post('/users/login', user.login);
// // routes.post('/user/pass-recovery', checkSchema(passRecovery), schema.handler, user.passRecovery);
// // routes.patch('/user/pass-recovery', checkSchema(passUpdate), schema.handler, user.passUpdate);
// routes.put('/users', auth.handler, user.updateUser);
// routes.delete('/users', auth.handler, user.deleteUser);

// routes.get('/squads', auth.handler, squad.findAll);
// routes.post('/squads', auth.handler, squad.create);
// routes.put('/squads/:squadId', auth.handler, squad.update);
// routes.get('/squads/:squadId', auth.handler, squad.find);
// routes.post('/squads/:squadId/users', auth.handler, squad.addUsers);
// routes.delete('/squads/:squadId/users', auth.handler, squad.delUsers);

// routes.get('/squad/:squadId/tasks', auth.handler, task.findAll);
// routes.post('/squads/:squadId/tasks', auth.handler, task.create);

// routes.get('/tasks/:taskId', auth.handler, task.find);
// routes.delete('/tasks/:taskId', auth.handler, task.deleteTask);
// routes.put('/tasks/:taskId/deactivate', auth.handler, task.deactivate);

// routes.post('/tasks/:taskId/votes', auth.handler, voting.vote);
// routes.post('/tasks/:taskId/messages', auth.handler, voting.message);

// routes.get('/health', (req, res) => {
//   res.sendStatus(200);
// });

export default routes;
