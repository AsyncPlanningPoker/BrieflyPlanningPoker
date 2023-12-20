import send from '../services/email';
import prisma from '@briefly/prisma';
import { usersAPI, type UsersAPI } from '@briefly/apidef';
import { type ZodiosRequestHandler } from '@zodios/express';
import type { Method, ZodiosPathsByMethod } from '@zodios/core';
import { Unauthorized } from '../middlewares/error/error';
import { mustAuth } from '../middlewares/authorization';
import context, { type Context } from '../context'
import * as auth from '../middlewares/authorization/authorization';
import * as sse from 'sse';

type UsersHandler<M extends Method, Path extends ZodiosPathsByMethod<UsersAPI, M>> =
  ZodiosRequestHandler<UsersAPI, Context, M, Path>;

const usersRouter = context.router(usersAPI);

const create: UsersHandler<"post", ""> = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await prisma.user.create({ data });
    return res.status(201).json({ token: auth.create(data.email, 'login') });
  } catch (error: unknown) {
    next(error);
  }
};

const login: UsersHandler<"post", "/login"> = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    if (await prisma.user.authenticate(email, password))
      return res.status(200).json({ token: auth.create(email, 'login') });
    
    throw new Unauthorized('Invalid credentials');
  } catch (error: unknown) {
    next(error);
  }
};

const update: UsersHandler<"put", ""> = async (req, res, next) => {
  try {
    const data = req.body;
    const { email } = req.user;

    if (data.password) {
      if (! data.oldPassword) {
        throw new Unauthorized('Must supply current password');
      }
      if (! await prisma.user.authenticate(email, data.oldPassword))
        throw new Unauthorized('Wrong password');
    }

    if(data.oldPassword) delete data.oldPassword;

    const user = await prisma.user
    .update({
      data,
      where: { email }
    });
  return res.status(200).json(user);
} catch (error: unknown) {
  next(error);
}
};

const del: UsersHandler<"delete", ""> = async (req, res, next) => {
  try {
    const { email } = req.user
    const user = await prisma.user
      .delete({
        where: { email },
      })
    return res.status(200).json(user);
  } catch (error: unknown) {
    next(error);
  }
};

const events: UsersHandler<'get', '/events'> = async (req, res, next) => {
  const { email } = req.user;
  const session = await sse.cSession(email, req, res);
  const { squads } = await prisma.user.findUniqueOrThrow({
    select: { squads: { select: { squadId: true }}},
    where: { email }
  });

  for(const { squadId } of squads) sse.register(squadId, session);
}

usersRouter.post("", create);
usersRouter.put("", mustAuth, update);
usersRouter.delete("", mustAuth, del);
usersRouter.post("/login", login);
usersRouter.get("/events", mustAuth, events);

export default usersRouter;

// async function passRecovery(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
//   const email = req.body.email;
//   const db = req.app.get('userDbStore');
//   const user = await db.findByEmail(email);
//   const token = user ? auth.create(email, 'pass-recovery') : auth.create('inexistentAccount', 'inexistentAccount', 0);
//   const url = process.env.URL;
//   const newUrl = `${url}/confirm_reset?token=${token}`;

//   const modelEmail = `<html>
//       <body
//           style='display: flex; justify-content: center; font-family: opensans-regular, arial;'    
//       >
//           <div style='width: 70%; border: #b0aeae solid 1px;'>
//               <header style='background-color: #1f1f1f; display: flex; justify-content: center; padding: 20px 0;'>
//                   <img style='width: 115px;' src='https://raw.githubusercontent.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/main/packages/front/src/assets/images/brand-icon-rectangle.png'></img>
//               </header>
//               <main style='display: flex; justify-content: center; padding: 10px 0;'>
//                   <div style='text-align: center;'>
//                       <p style='font-weight: bold; font-size: 20px; line-height: 2;'>
//                           HEY, @user!
//                       </p>
//                       <p style='font-size: 15px; line-height: 2; color: #232222;'>
//                           Did you ask for a password recovery?
//                       </p>
//                       <a 
//                         href=${newUrl}
//                         style='color: white; background-color: #191919; border-radius: 3px; font-size: 12px; padding: 8px 10px; 
//                         text-decoration: none; font-weight: bold; font-family: helvetica,arial,sans-serif; border: none;'
//                       >
//                           PASSWORD RECOVERY
//                       </a>
//                       <p style='font-size: 15px; line-height: 2; color: #666666;'>
//                           Or click on the link: <a style='text-decoration: none;' href=${newUrl}>${newUrl}</a>
//                       </p>
//                   </div>
//               </main>
//               <footer style="display: flex; justify-content: center;">
//                   <div style='border-top: #b0aeae solid 1px; width: 90%; padding: 5px 0; display: flex; justify-content: center;'>
//                       <img style='width: 40px;' src='https://raw.githubusercontent.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/main/packages/front/src/assets/images/brand-icon-circle.png'></img>
//                   </div>
//               </footer>
//           </div>  
//         </body>
//     </html>`

//   await send({ 
//       to: email, 
//       subject: 'BRIEFLY - Password Recovery', 
//       message: modelEmail
//       //message: `Hey, did you ask for a password recovery?\n\nThis is your link ${newUrl}` 
//     }) 
//     .then(() => {
//       console.log("email enviado com sucesso!");
//       return res.status(200).json({});
//     })
//     .catch((error: any) => {
//       console.log("erro linha 71: ", error);
//       return next(error);
//     });
// }

// async function passUpdate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
//   const password = await crypt.create(req.body.password);
//   const token = req.body.token;
//   const db = req.app.get('userDbStore');
//   const verify = auth.verify(token.replace('Bearer', '').trim());

//   try {
//     if (verify?.role === 'pass-recovery') {
//       await db.updatePassByEmail(verify.user, { password: password, updatedAt: new Date() });
//       return res.sendStatus(200);
//     } else {
//       throw new Unauthorized('your link is invalid or has expired');
//     }
//   } catch (error: any) {
//     next(error);
//   }
// }