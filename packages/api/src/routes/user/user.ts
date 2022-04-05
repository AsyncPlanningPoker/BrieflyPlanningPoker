import { Request, Response } from 'express';

class User {
  public async create(req: Request, res: Response): Promise<Response> {
    //req.userDbStore.create();
    return res.send('oi');
  }
}

export default new User();
