import { Knex } from 'knex';

type IUserSeed = {
  id: string;
  name: string;
  email: string;
  password: string;
};

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

  await knex('squads-users').del();
  await knex('squads').del();
  await knex('users').del();

  for (const squad of squads) {
    await knex('squads').insert(squad);
  }

  for (const user of users) {
    await knex('users').insert(user);
  }

  for (const squadUser of squadsUsers) {
    await knex('squads-users').insert(squadUser);
  }
}
