import { randomUUID } from 'crypto';
import { FactoryStore } from '../../src/factory'

describe('Task', () => {

    const factory = new FactoryStore();
    const { close, taskDbStore, squadDbStore } = factory.createStores();

    const squad = {
      id: randomUUID(),
      name: 'squad test 1',
      currentMaxRounds: 3,
      currentPercentual: 0.3,
    }

    const task = {
      id: randomUUID(),
      squad: squad.id,
      name: 'task test 1',
    }

    afterAll(()=>{
      close()
    })

    beforeAll(async ()=>{
      await squadDbStore.create(squad)
      await taskDbStore.create(task)
    })

    it('Should create a task', async () => {
     
      const task =  {
        id: randomUUID(),
        squad: squad.id,
        name: 'task test 2',
        description: 'description test 2'
      }

      const expected = {
        id: task.id
      }

      const res = await taskDbStore.create(task)
      expect(res).toStrictEqual(expected)
    });

    // it('Should delete a task', async () => {
     
    //   const task =  {
    //     id: randomUUID(),
    //     squad: squad.id,
    //     name: 'task test 2',
    //     description: 'description test 2'
    //   }

    //   await taskDbStore.create(task)
    //   await taskDbStore.delete({id: task.id, squad: task.squad})
      
    //   expect(res).toStrictEqual(expected)
    //   expect(updatedSquad?.currentMaxRounds).toBe(1)
    //   expect(updatedSquad?.currentPercentual).toBe('1.00')
    //   expect(updatedSquad?.squad).toBe('squad test update')

    // });

    // it('Should active a task', async () => {
     
    //   const squad =  {
    //     id: randomUUID(),
    //     name: 'squad test 6',
    //     users: [],
    //     currentMaxRounds: 20,
    //     currentPercentual: 0.1,
    //   }

    //   await squadDbStore.create(squad)
    //   await squadDbStore.addSquadUsersByEmail(squad.id, 'squadtest1@briefly.com', true)
    //   await squadDbStore.addSquadUsersByEmail(squad.id,'squadtest2@briefly.com', false)
    //   const res = await squadDbStore.list('squadtest1@briefly.com')
    //   const findSquad = res.find((squad) => squad.squad === 'squad test 6')
    //   expect(findSquad).not.toBe(undefined)

    // });

    it('Should throw an error after trying to create a task with duplicate id', async () => {

      const task =  {
        id: randomUUID(),
        squad: squad.id,
        name: 'task test 2',
        description: 'description test 2'
      }

      await taskDbStore.create(task)

      await expect(taskDbStore.create(task)).rejects.toThrow(Error);
    });

    it('Should throw an error after trying to create a task with an invalid squad', async () => {
      const task =  {
        id: randomUUID(),
        squad: randomUUID(),
        name: 'task test 2',
        description: 'description test 2'
      }
      await expect(taskDbStore.create(task)).rejects.toThrow(Error);
    });

  });