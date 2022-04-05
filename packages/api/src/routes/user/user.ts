import * as auth from '../../utils/authorization';
import { Request, Response } from 'express';
import * as crypt from '../../utils/crypt';
import { randomUUID } from 'crypto';

async function create(req: Request, res: Response): Promise<Response> {
  const user = {
    id: randomUUID(),
    name: req.body.name,
    email: req.body.email,
    password: await crypt.create(req.body.password),
  };

  const db = req.app.get('userDbStore');
  const response = await db
    .create(user)
    .then(() => {
      return { response: { id: user.id }, status: 201 };
    })
    .catch(() => {
      return { response: { error: 'Internal server error' }, status: 500 };
    });
  return res.status(response.status).json(response.response);
}

async function login(req: Request, res: Response): Promise<Response> {
  const credentials = {
    email: req.body.email,
  };

  const db = req.app.get('userDbStore');
  const response = await db.findByCredentials(credentials).then(async (res: any) => {
    if (!res) {
      return { response: { error: 'The email provided is not connected to an account' }, status: 401 };
    }

    if (await crypt.compare(req.body.password, res.password)) {
      return { response: { token: auth.create(db.id) }, status: 200 };
    } else {
      return { response: { error: 'Wrong password' }, status: 401 };
    }
  });

  return res.status(response.status).json(response.response);
}

export { create, login };
