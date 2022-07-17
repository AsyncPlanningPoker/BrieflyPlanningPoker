import jwt from 'jsonwebtoken';

function create(email: string, role: string, expiresIn = 3600) {
  return jwt.sign({ email: email, role: role }, process.env.SECRET!, {
    expiresIn: expiresIn,
  });
}

function verify(token: string): any {
  return jwt.verify(token, process.env.SECRET!, (err: any, decoded: any) => {
    if (decoded) {
      return { email: decoded.email, role: decoded.role };
    }
  });
}

export { create, verify };
