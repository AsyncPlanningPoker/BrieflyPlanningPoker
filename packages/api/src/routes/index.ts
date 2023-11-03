import { apiDef } from '@briefly/apidef'
import squadsRouter from './squad';
import tasksRouter from './task';
import usersRouter from './user';
import context from '../context';

const routes = context.router(apiDef);
routes.use("/users", usersRouter);
routes.use("/squads", squadsRouter);
routes.use("/tasks", tasksRouter);

// routes.get('/health', (req, res) => {
//   res.sendStatus(200);
// });

export default routes;
