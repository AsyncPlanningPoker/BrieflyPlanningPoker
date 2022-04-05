import { Router } from 'express';
import User from './user/user';
const routes = Router();

routes.post('/user', User.create);
// routes.post('/user/login', User.logar);
// routes.patch('/user/recovery', User.recovery);
routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default routes;
