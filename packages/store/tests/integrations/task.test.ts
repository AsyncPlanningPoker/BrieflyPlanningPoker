import { FactoryStore } from '../../src/factory';
import knexfile from '../../knexfile';
import { randomUUID } from 'crypto';
import knex from 'knex';

describe('Task', () => {
  const db = knex(knexfile);
  const factory = new FactoryStore();
  const { close, taskDbStore } = factory.createStores();

  const squad = {
    id: randomUUID(),
    name: 'squad test 1',
    currentMaxRounds: 3,
    currentPercentual: 0.3,
  };

  afterAll(() => {
    close();
    db.destroy();
  });

  beforeAll(async () => {
    await db('squads').insert(squad);
  });

  afterEach(async () => {
    await db('tasks').del();
  });

  it('Should create a task with description', async () => {
    const task = {
      id: randomUUID(),
      squad: squad.id,
      name: 'task test 1',
      description: 'description test 1',
    };

    const expected = {
      id: task.id,
    };

    const res = await taskDbStore.create(task);
    expect(res).toStrictEqual(expected);
  });

  it('Should create a task without description', async () => {
    const task = {
      id: randomUUID(),
      squad: squad.id,
      name: 'task test 1',
    };

    const expected = {
      id: task.id,
    };

    const res = await taskDbStore.create(task);
    expect(res).toStrictEqual(expected);
  });

  it.skip('Should list all tasks by squad id', async () => {
    const tasks = [
      {
        id: randomUUID(),
        squad: squad.id,
        name: 'task test',
        description: 'description test',
      },
      {
        id: randomUUID(),
        squad: squad.id,
        name: 'task test 1',
        description: 'description test 1',
      },
    ];

    const expected = {
      active: [
        {
          task: tasks[0].id,
          name: tasks[0].name,
          points: null,
          currentRound: null,
          maxRounds: squad.currentMaxRounds,
          finished: false,
        },
        {
          task: tasks[1].id,
          name: tasks[1].name,
          points: null,
          currentRound: null,
          maxRounds: squad.currentMaxRounds,
          finished: false,
        },
      ],
      deactive: [],
    };

    await taskDbStore.create(tasks[0]);
    await taskDbStore.create(tasks[1]);

    const res = await taskDbStore.findAll({ squad: squad.id });
    expect(res).toStrictEqual(expected);
  });

  it('Should deactive a task', async () => {
    const task = {
      id: randomUUID(),
      squad: squad.id,
      name: 'task test',
      description: 'description test',
    };

    await taskDbStore.create(task);
    await taskDbStore.deactive({ id: task.id, squad: task.squad });
    const res = await taskDbStore.findAll({ squad: task.id });

    const expected = {
      active: [],
      deactive: [],
    };

    expect(res).toStrictEqual(expected);
  });

  it('Should delete a task', async () => {
    const task = {
      id: randomUUID(),
      squad: squad.id,
      name: 'task test',
      description: 'description test',
    };

    await taskDbStore.create(task);
    await taskDbStore.delete({ id: task.id, squad: task.squad });
    const res = await taskDbStore.findAll({ squad: task.id });

    const expected = {
      active: [],
      deactive: [],
    };

    expect(res).toStrictEqual(expected);
  });

  it('Should throw an error after trying to create a task with duplicate id', async () => {
    const task = {
      id: randomUUID(),
      squad: squad.id,
      name: 'task test 2',
      description: 'description test 2',
    };

    await taskDbStore.create(task);

    await expect(taskDbStore.create(task)).rejects.toThrow(Error);
  });

  it('Should throw an error after trying to create a task with an invalid squad', async () => {
    const task = {
      id: randomUUID(),
      squad: randomUUID(),
      name: 'task test 2',
      description: 'description test 2',
    };
    await expect(taskDbStore.create(task)).rejects.toThrow(Error);
  });
});
