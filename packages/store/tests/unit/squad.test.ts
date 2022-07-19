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
      users: [{email: 'squadtest1@briefly.com'}, {email: 'squadtest2@briefly.com'}],
      currentMaxRounds: 3,
      currentPercentual: 0.3,
    },
    {
      id: randomUUID(),
      name: 'squad test 2',
      users: [{email: 'squadtest1@briefly.com'}],
      currentMaxRounds: 15,
      currentPercentual: 0.7,
    }]

    afterAll(()=>{
      close()
    })

    beforeAll(async ()=>{
      await Promise.all([userDbStore.create(user[0]), userDbStore.create(user[1])]) 
      await Promise.all([squadDbStore.create(squad[0]), squadDbStore.create(squad[1])]) 
    })

    it('Should list squads by user email', async () => {
     
      const res = await squadDbStore.list('squadtest1@briefly.com')
      const expected = [{
        id: squad[0].id,
        squad: 'squad test 1',
        users: [{id: user[0].id, name: 'user test 1', email: 'squadtest1@briefly.com'}, {id: user[1].id, name: 'user test 2', email: 'squadtest2@briefly.com'}],
        currentMaxRounds: 3,
        currentPercentual: '0.30',
      },
      {
        id: squad[1].id,
        squad: 'squad test 2',
        users: [{id: user[0].id, name: 'user test 1', email: 'squadtest1@briefly.com'}],
        currentMaxRounds: 15,
        currentPercentual: '0.70',
      },
    ]
      res.forEach((squad)=> delete squad.updatedAt)
      expect(res).toStrictEqual(expected)
    });

    it('Should create a squad', async () => {
     
      const squad =  {
        id: randomUUID(),
        name: 'squad test 3',
        users: [{email: 'squadtest1@briefly.com'}],
        currentMaxRounds: 20,
        currentPercentual: 0.72,
      }

      const expected = {
        id: squad.id,
        squad: 'squad test 3',
        users: [{id: user[0].id, name: 'user test 1', email: 'squadtest1@briefly.com'}],
      }

      const res = await squadDbStore.create(squad)
  
      expect(res).toStrictEqual(expected)
    });

    it('Should update a squad', async () => {
     
      const squad =  {
        id: randomUUID(),
        name: 'squad test 4',
        users: [{email: 'squadtest1@briefly.com'}],
        currentMaxRounds: 24,
        currentPercentual: 0.23,
      }

      await squadDbStore.create(squad)
      await squadDbStore.updateById(squad.id, {name: 'squad test update', currentMaxRounds: 1, currentPercentual: 1})
      const res = await squadDbStore.list('squadtest1@briefly.com')
      const updatedSquad = res.find((squad)=> squad.squad === 'squad test update')

      expect(updatedSquad?.currentMaxRounds).toBe(1)
      expect(updatedSquad?.currentPercentual).toBe('1.00')
      expect(updatedSquad?.squad).toBe('squad test update')

    });

    it('Should delete a squad', async () => {
     
      const squad =  {
        id: randomUUID(),
        name: 'squad test 5',
        users: [{email: 'squadtest1@briefly.com'}],
        currentMaxRounds: 20,
        currentPercentual: 0.1,
      }

      await squadDbStore.create(squad)
      await squadDbStore.delById(squad.id)
      const res = await squadDbStore.list('squadtest1@briefly.com')
      const findSquad = res.find((squad) => squad.squad === 'squad test 5')
      expect(findSquad).toBe(undefined)

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
      await squadDbStore.addSquadUsersByEmail(squad.id, [{email: 'squadtest1@briefly.com'}], true)
      await squadDbStore.addSquadUsersByEmail(squad.id, [{email: 'squadtest2@briefly.com'}])
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
      await squadDbStore.addSquadUsersByEmail(squad.id, [{email: 'squadtest1@briefly.com'}], true)
      await squadDbStore.delSquadUsersByEmail(squad.id, [{email: 'squadtest1@briefly.com'}])
      const res = await squadDbStore.list('squadtest1@briefly.com')
      const findSquad = res.find((squad) => squad.squad === 'squad test 7')
      expect(findSquad).toBe(undefined)

    });

    it('Should throw an error after trying to create a squad with duplicate id', async () => {
      const newSquad = {   
        id: squad[0].id,
        name: 'squad test 3',
        users: [{email: 'squadtest1@briefly.com'}],
        currentMaxRounds: 20,
        currentPercentual: 0.72,
      }
      await expect(squadDbStore.create(newSquad)).rejects.toThrow(Error);
    });

  });