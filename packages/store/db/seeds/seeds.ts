import { Knex } from 'knex';

type ISquadSeed = {
  id: string;
  name: string;
  currentMaxRounds: number;
  currentPercentual: number;
};

type ISquadUserSeed = {
  id: string;
  user: string;
  squad: string;
};

type ITaskMessagesSeed = {
  id: string;
  task: string;
  user: string;
  currentRound: number;
  message: string;
}

type ITaskPointsSeed = {
  id: string;
  task: string;
  user: string;
  points: number;
  currentRound: number;
}

type ITaskSeed = {
  id: string;
  squad: string;
  name: string;
  description?: string;
  maxRounds: number;
  percentual: number;
  active?: boolean;
  finished?: boolean;
};

type IUserSeed = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export async function seed(knex: Knex): Promise<void> {
  const users: IUserSeed[] = [
    { id: '715cadc0-bae2-453b-97cf-d5a54d8f2c86', name: 'Line Conquista', email: 'line@briefly.com', password: '$2a$10$IrVhCnXDAxEhVknwQlI/IONAJZwDXRSSzRt5Yb.n46CXVxj27jFSq' },
    { id: '7e13d8f9-159e-4bfb-b67f-1f9cd3084813', name: 'Lucca Jacomassi', email: 'lulcca@briefly.com', password: '$2a$10$QBf6GkMWsMh8X3PpRC7Kbu9JDxTVwH3xdo2NxumJWSbsgGocUCntm' },
  ];

  const squads: ISquadSeed[] = [
    { id: '715cadc0-bae2-453b-97cf-d5a54d8f2c82', name: 'Squad 1', currentMaxRounds: 3, currentPercentual: 0.9 },
    { id: '7e13d8f9-159e-4bfb-b67f-1f9cd3084815', name: 'Squad 2', currentMaxRounds: 5, currentPercentual: 0.5 },
  ];

  const squadsUsers: ISquadUserSeed[] = [
    { id: '715cadc0-bae2-453b-97cf-d5a54d8f2c42', squad: '715cadc0-bae2-453b-97cf-d5a54d8f2c82', user: '715cadc0-bae2-453b-97cf-d5a54d8f2c86' },
    { id: '7e13d8f9-159e-4bfb-b67f-1f9cd3084855', squad: '715cadc0-bae2-453b-97cf-d5a54d8f2c82', user: '7e13d8f9-159e-4bfb-b67f-1f9cd3084813' },
  ];

  const tasks: ITaskSeed[] = [
    { id: '715cadc0-bae2-453b-97cf-d5a54d8f2c80', squad: '715cadc0-bae2-453b-97cf-d5a54d8f2c82', name: 'Task 1', description: "Description 1",  maxRounds: 3, percentual: 0.9 },
    { id: '7e13d8f9-159e-4bfb-b67f-1f9cd3084811', squad: '715cadc0-bae2-453b-97cf-d5a54d8f2c82', name: 'Task 2', description: "Description 2", maxRounds: 3, percentual: 0.9 },
    { id: '7e13d8f9-159e-4bfb-b67f-1f9cd3084812', squad: '715cadc0-bae2-453b-97cf-d5a54d8f2c82', name: 'Task 3', description: "Description 3", maxRounds: 3, percentual: 0.9, active: false, finished: true },
  ];

  const tasksPoints: ITaskPointsSeed[] = [
    { id: '715cadc0-bae2-453b-97cf-d5a54d8f2c47', task: '715cadc0-bae2-453b-97cf-d5a54d8f2c80', user: '715cadc0-bae2-453b-97cf-d5a54d8f2c86', points: 2, currentRound: 1 },
  ];

  const tasksMessages: ITaskMessagesSeed[] = [
    { id: '715cadc0-bae2-453b-97cf-d5a54d8f2c45', task: '715cadc0-bae2-453b-97cf-d5a54d8f2c80', user: '715cadc0-bae2-453b-97cf-d5a54d8f2c86', currentRound: 2, message: "I think its a simple task" },
  ];

  //Delete all data from squads, squad-users, tasks, tasks-messages, tasks-messages and users table
  await Promise.all([knex('squads-users').del(), knex('tasks-points').del()])
  await Promise.all([knex('tasks').del(), knex('squads').del(), knex('users').del()]);

  //Insert new data
  await Promise.all([insertData(squads, 'squads', knex), insertData(users, 'users', knex)]);
  await Promise.all([insertData(squadsUsers, 'squads-users', knex), insertData(tasks, 'tasks', knex)]);
  await Promise.all([insertData(tasksPoints, 'tasks-points', knex), insertData(tasksMessages, 'tasks-messages', knex)]);
}

async function insertData(data: any, table: string, knex: Knex) {
  for (const d of data) {
    await knex(table).insert(d);
  }
}
