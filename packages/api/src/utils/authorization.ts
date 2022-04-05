import jwt from 'jsonwebtoken';

function create(id: string) {
  return jwt.sign({ id: id }, process.env.SECRET!, {
    expiresIn: 300,
  });
}

function verify(token: string) {
  return jwt.verify(token, process.env.SECRET!, (err: any, decoded: any) => {
    if (decoded) {
      return { id: decoded.id };
    }
  });
}

export { create, verify };
