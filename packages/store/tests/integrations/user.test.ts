import { FactoryStore } from '../../src/factory';
import knexfile from '../../knexfile';
import { randomUUID } from 'crypto';
import knex from 'knex';

describe('User', () => {
  const db = knex(knexfile);
  const factory = new FactoryStore();
  const { close, userDbStore } = factory.createStores();

  const user = {
    id: randomUUID(),
    name: 'user test',
    email: 'usertest@briefly.com',
    password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq',
  };

  afterAll(() => {
    close();
    db.destroy();
  });

  beforeEach(async () => {
    await db('users').insert(user);
  });

  afterEach(async () => {
    await db('users').del();
  });

  it('Should find a user by email', async () => {
    const res = await userDbStore.findByEmail(user.email);
    expect(res).toStrictEqual(user);
  });

  it('Should not find find a user by an invalid email', async () => {
    const res = await userDbStore.findByEmail('invalid@briefly.com');
    expect(res).toBe(undefined);
  });

  it('Should a create a user', async () => {
    const user = {
      id: randomUUID(),
      name: 'user test 2',
      email: 'usertest2@briefly.com',
      password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq',
    };

    await userDbStore.create(user);
    const res = await userDbStore.findByEmail('usertest2@briefly.com');
    expect(res).toStrictEqual(user);
  });

  it('Should throw an error after trying to create a user with duplicate email', async () => {
    await expect(userDbStore.create(user)).rejects.toThrow(Error);
  });

  it('Should throw an error after trying to create a user with duplicate id', async () => {
    const newUser = { ...user };
    newUser.email = 'usertest3@briefly.com';
    await expect(userDbStore.create(newUser)).rejects.toThrow(Error);
  });

  it('Should update the password by user email', async () => {
    const updatedUser = {
      password: 'newpassword',
      updatedAt: new Date()
    }

    const user = {
      id: randomUUID(),
      name: 'user test 4',
      email: 'usertest4@briefly.com',
      password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
    }

    await userDbStore.create(user)
    await userDbStore.updatePassByEmail(user.email, updatedUser)
    const res = await userDbStore.findByEmail(user.email)
    expect(res?.password).toBe(updatedUser.password)
  });

  it('Should delete a user', async () => {
    const deletedUser = {
      updatedAt: new Date()
    }

    const user = {
      id: randomUUID(),
      name: 'user test 5',
      email: 'usertest5@briefly.com',
      password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
    }

    await userDbStore.create(user)
    await userDbStore.deleteByEmail(user.email, deletedUser)
    const res = await userDbStore.findByEmail(user.email)
    expect(res).toBe(undefined)
  });

  it('Should update a username', async () => {
    const updateUsername = {
      name: 'user test 6 updated',
      updatedAt: new Date()
    }

    const user = {
      id: randomUUID(),
      name: 'user test 6',
      email: 'usertest6@briefly.com',
      password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
    }

    await userDbStore.create(user);
    await userDbStore.updatePassByEmail(user.email, updateUsername);
    const res = await userDbStore.findByEmail(user.email)
    expect(res?.name).toBe(updateUsername.name);
  });

  it('Should update a username and password', async () => {
    const updateUsernameAndPass = {
      name: 'user test 7 updated',
      password: '654321', // new password
      updatedAt: new Date()
    }

    const user = {
      id: randomUUID(),
      name: 'user test 7',
      email: 'usertest7@briefly.com',
      password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
    }

    await userDbStore.create(user);
    await userDbStore.updatePassByEmail(user.email, updateUsernameAndPass);
    const res = await userDbStore.findByEmail(user.email)
    expect(res?.name).toBe(updateUsernameAndPass.name);
    expect(res?.password).toBe(updateUsernameAndPass.password);
  });

  it('Should update password', async () => {
    const updatePassword = {
      password: '654321', // new password
      updatedAt: new Date()
    }

    const user = {
      id: randomUUID(),
      name: 'user test 7',
      email: 'usertest7@briefly.com',
      password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
    }

    await userDbStore.create(user);
    await userDbStore.updatePassByEmail(user.email, updatePassword);
    const res = await userDbStore.findByEmail(user.email)
    expect(res?.password).toBe(updatePassword.password);
  });
});