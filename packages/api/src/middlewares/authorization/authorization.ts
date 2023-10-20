import jwt from 'jsonwebtoken';

function create(user: string, role: string, expiresIn = 3600) {
  return jwt.sign({ user, role }, process.env.SECRET!, { expiresIn });
}

function verify(token: string): {user: string, role: string} | void {
  return jwt.verify(token, process.env.SECRET!, (err, decoded: any) => {
    if (decoded) 
      return { user: decoded.user, role: decoded.role };
  });
}

export { create, verify };
