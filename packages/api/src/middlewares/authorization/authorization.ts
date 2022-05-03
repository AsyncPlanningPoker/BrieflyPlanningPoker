import jwt from 'jsonwebtoken';

function create(user: string, role: string, expiresIn = 3600) {
  return jwt.sign({ user: user, role: role }, process.env.SECRET!, {
    expiresIn: expiresIn,
  });
}

function verify(token: string): any {
  return jwt.verify(token, process.env.SECRET!, (err: any, decoded: any) => {
    if (decoded) {
      return { user: decoded.user, role: decoded.role };
    }
  });
}

export { create, verify };
