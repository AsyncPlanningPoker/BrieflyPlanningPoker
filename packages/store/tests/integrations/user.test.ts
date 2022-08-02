import { randomUUID } from 'crypto';
import {FactoryStore} from '../../src/factory'

describe('User', () => {

    const factory = new FactoryStore();
    const { close, userDbStore } = factory.createStores();

    const user = {   
      id: randomUUID(),
      name: 'user test',
      email: 'usertest@briefly.com',
      password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
    }

    afterAll(()=>{
      close()
    })

    beforeAll(async ()=>{
      await userDbStore.create(user)
    })

    it('Should find a user by email', async () => {
      const res = await userDbStore.findByEmail('usertest@briefly.com')
      expect(res).toStrictEqual(user)
    });

    it('Should not find find a user by an invalid email', async () => {
      const res = await userDbStore.findByEmail('invalid@briefly.com')
      expect(res).toBe(undefined)
    });

    it('Should a create a user', async () => {
      const user = {   
        id: '715cadc0-bae2-453b-97cf-d5a54d8f2c11',
        name: 'user test 2',
        email: 'usertest2@briefly.com',
        password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
      }
      await userDbStore.create(user)
      const res = await userDbStore.findByEmail('usertest2@briefly.com')
      expect(res).toStrictEqual({   
        id: '715cadc0-bae2-453b-97cf-d5a54d8f2c11',
        name: 'user test 2',
        email: 'usertest2@briefly.com',
        password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
      })
    });

    it('Should throw an error after trying to create a user with duplicate email', async () => {
      const user = {   
        id: '715cadc0-bae2-453b-97cf-d5a54d8f2c12',
        name: 'user test',
        email: 'usertest@briefly.com',
        password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
      }
      await expect(userDbStore.create(user)).rejects.toThrow(Error);
    });

    it('Should update the password by user email', async () => {
      const updatedUser = {
        password: 'newpassword',
        updatedAt: new Date()
      }
      
      const user = {   
        id: '715cadc0-bae2-453b-97cf-d5a54d8f2c13',
        name: 'user test 3',
        email: 'usertest3@briefly.com',
        password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
      }

      await userDbStore.create(user)
      await userDbStore.updatePassByEmail('usertest3@briefly.com', updatedUser)
      const res = await userDbStore.findByEmail('usertest3@briefly.com')
      expect(res?.password).toBe(updatedUser.password)
    });

    it('Should delete a user', async () => {
      const deletedUser = {
        updatedAt: new Date()
      }

      const user = {   
        id: '715cadc0-bae2-453b-97cf-d5a54d8f2c14',
        name: 'user test 4',
        email: 'usertest4@briefly.com',
        password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
      }

      await userDbStore.create(user)
      await userDbStore.deleteByEmail('usertest4@briefly.com', deletedUser)
      const res = await userDbStore.findByEmail('usertest4@briefly.com')
      expect(res).toBe(undefined)
    });
  });