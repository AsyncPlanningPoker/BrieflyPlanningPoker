import { randomUUID } from 'crypto';
import { FactoryStore } from '../../src/factory'

describe('Squad', () => {

    const factory = new FactoryStore();
    const { close, userDbStore, squadDbStore } = factory.createStores();

    const user = [{   
      id: randomUUID(),
      name: 'user test 1',
      email: 'squadtest1@briefly.com',
      password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
    },
    {   
      id: randomUUID(),
      name: 'user test 2',
      email: 'squadtest2@briefly.com',
      password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq'
    }]

    const squad = [{
      id: randomUUID(),
      name: 'squad test 1',
      currentMaxRounds: 3,
      currentPercentual: 0.3,
    },
    {
      id: randomUUID(),
      name: 'squad test 2',
      currentMaxRounds: 15,
      currentPercentual: 0.7,
    }]

    afterAll(()=>{
      close()
    })

    beforeAll(async ()=>{
      await Promise.all([userDbStore.create(user[0]), userDbStore.create(user[1])]) 
      await Promise.all([squadDbStore.create(squad[0]), squadDbStore.create(squad[1])]) 
      await Promise.all([squadDbStore.addSquadUsersByEmail(squad[0].id, user[0].email, true), squadDbStore.addSquadUsersByEmail(squad[0].id, user[1].email, true), squadDbStore.addSquadUsersByEmail(squad[1].id,user[0].email, true)])
    })

    it('Should list squads by user email', async () => {
     
      const res = await squadDbStore.list('squadtest1@briefly.com')
      const expected = [
      {
        id: squad[1].id,
        squad: 'squad test 2',
        currentMaxRounds: 15,
        currentPercentual: '0.70',
      },
      {
        id: squad[0].id,
        squad: 'squad test 1',
        currentMaxRounds: 3,
        currentPercentual: '0.30',
      }
    ]
      res.forEach((squad)=> delete squad.updatedAt)
      expect(res).toStrictEqual(expected)
    });

    
    it('Should list users by squad id', async () => {
     
      const res = await squadDbStore.listUsers(squad[0].id)

      const expected = [{
        id: user[0].id,
        name: user[0].name,
        email: user[0].email
      },
      {
        id: user[1].id,
        name: user[1].name,
        email: user[1].email
      },
    ]
      expect(res).toStrictEqual(expected)
    });

    it('Should create a squad', async () => {
     
      const squad =  {
        id: randomUUID(),
        name: 'squad test 3',
        currentMaxRounds: 20,
        currentPercentual: 0.72,
      }

      const expected = {
        id: squad.id,
        squad: 'squad test 3',
      }

      const res = await squadDbStore.create(squad)
  
      expect(res).toStrictEqual(expected)
    });

    it('Should update a squad', async () => {
     
      const squad =  {
        id: randomUUID(),
        name: 'squad test 4',
        currentMaxRounds: 24,
        currentPercentual: 0.23,
      }

      await squadDbStore.create(squad)
      await squadDbStore.addSquadUsersByEmail(squad.id, user[0].email, true), 
      await squadDbStore.updateById(squad.id, {name: 'squad test update', currentMaxRounds: 1, currentPercentual: 1})
      const res = await squadDbStore.list('squadtest1@briefly.com')
      const updatedSquad = res.find((squad)=> squad.squad === 'squad test update')

      expect(updatedSquad?.currentMaxRounds).toBe(1)
      expect(updatedSquad?.currentPercentual).toBe('1.00')
      expect(updatedSquad?.squad).toBe('squad test update')

    });

    it('Should add a new user', async () => {
     
      const squad =  {
        id: randomUUID(),
        name: 'squad test 6',
        users: [],
        currentMaxRounds: 20,
        currentPercentual: 0.1,
      }

      await squadDbStore.create(squad)
      await squadDbStore.addSquadUsersByEmail(squad.id, 'squadtest1@briefly.com', true)
      await squadDbStore.addSquadUsersByEmail(squad.id,'squadtest2@briefly.com', false)
      const res = await squadDbStore.list('squadtest1@briefly.com')
      const findSquad = res.find((squad) => squad.squad === 'squad test 6')
      expect(findSquad).not.toBe(undefined)

    });

    it('Should delete a user', async () => {
     
      const squad =  {
        id: randomUUID(),
        name: 'squad test 7',
        users: [],
        currentMaxRounds: 20,
        currentPercentual: 0.1,
      }

      await squadDbStore.create(squad)
      await squadDbStore.addSquadUsersByEmail(squad.id, 'squadtest1@briefly.com', true)
      await squadDbStore.delSquadUserByEmail(squad.id, 'squadtest1@briefly.com')
      const res = await squadDbStore.list('squadtest1@briefly.com')
      const findSquad = res.find((squad) => squad.squad === 'squad test 7')
      expect(findSquad).toBe(undefined)

    });

    it('Should throw an error after trying to create a squad with duplicate id', async () => {
      const newSquad = {   
        id: squad[0].id,
        name: 'squad test 3',
        currentMaxRounds: 20,
        currentPercentual: 0.72,
      }
      await expect(squadDbStore.create(newSquad)).rejects.toThrow(Error);
    });

  });