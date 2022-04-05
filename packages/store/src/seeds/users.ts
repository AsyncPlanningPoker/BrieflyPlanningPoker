import { Knex } from 'knex';

type IUserSeed = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export async function seed(knex: Knex): Promise<void> {
  const users: IUserSeed[] = [
    { id: '715cadc0-bae2-453b-97cf-d5a54d8f2c86', name: 'Line Conquista', email: 'line@briefly.com', password: 'line12' },
    { id: '7e13d8f9-159e-4bfb-b67f-1f9cd3084813', name: 'Lucca Jacomassi', email: 'lulcca@briefly.com', password: 'lulcca12' },
  ];

  await knex('users').del();
  for (const user of users) {
    await knex('users').insert(user);
  }
}
