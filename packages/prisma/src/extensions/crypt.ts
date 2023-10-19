import bcrypt from 'bcryptjs';

async function create(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function compare(passwordBody: string, passwordUser: string) {
  return bcrypt.compare(passwordBody, passwordUser);
}

export { create, compare };
