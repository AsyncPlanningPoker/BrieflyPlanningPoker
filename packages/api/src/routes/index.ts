import squadsRouter from './squad';
import tasksRouter from './task';
import usersRouter from './user';
import { zodiosRouter } from '@zodios/express';
import apiDef from '@briefly/prisma/dist/apiDef'
import context from 'context';

const routes = context.router(apiDef);
routes.use("/users", usersRouter);
routes.use("/squads", squadsRouter);
routes.use("/tasks", tasksRouter);

// routes.get('/health', (req, res) => {
//   res.sendStatus(200);
// });

export default routes;
