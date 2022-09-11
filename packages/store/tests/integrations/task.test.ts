import { randomUUID } from 'crypto';
import { FactoryStore } from '../../src/factory'

describe('Task', () => {

    const factory = new FactoryStore();
    const { close, taskDbStore, squadDbStore } = factory.createStores();

    const squads = [{
      id: randomUUID(),
      name: 'squad test 1',
      currentMaxRounds: 3,
      currentPercentual: 0.3,
    },
    {
      id: randomUUID(),
      name: 'squad test 2',
      currentMaxRounds: 4,
      currentPercentual: 0.4,
    }]

    const task = {
      id: randomUUID(),
      squad: squads[0].id,
      name: 'task test 1',
    }

    afterAll(()=>{
      close()
    })

    beforeAll(async ()=>{
      await Promise.all([squadDbStore.create(squads[0]), squadDbStore.create(squads[1])])
      await taskDbStore.create(task)
    })

    it('Should create a task', async () => {
     
      const task =  {
        id: randomUUID(),
        squad: squads[0].id,
        name: 'task test 2',
        description: 'description test 2'
      }

      const expected = {
        id: task.id
      }

      const res = await taskDbStore.create(task)
      expect(res).toStrictEqual(expected)
    });

    it('Should list all tasks by squad id', async () => {

      const tasks =  [{
        id: randomUUID(),
        squad: squads[1].id,
        name: 'task test 3',
        description: 'description test 3'
      },
      {
        id: randomUUID(),
        squad: squads[1].id,
        name: 'task test 4',
        description: 'description test 4'
      }]

      const expected = [{
        id: tasks[0].id,
        name: tasks[0].name,
        maxRounds: squads[1].currentMaxRounds,
        active: true,
        finished: false
      },
      {
        id: tasks[1].id,
        name: tasks[1].name,
        maxRounds: squads[1].currentMaxRounds,
        active: true,
        finished: false
      }]

      for(const task of tasks){
        await taskDbStore.create(task)
      }
     
      const res = await taskDbStore.findAll({squad: squads[1].id})
      expect(res).toStrictEqual(expected)
    });

    it('Should throw an error after trying to create a task with duplicate id', async () => {

      const task =  {
        id: randomUUID(),
        squad: squads[0].id,
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