import { CreateTaskType, IdentifierTaskType, IStoreTask, FindTaskType, LoadedTaskType, LoadedAllTask, LoadedTask } from '../types/task';
import { Knex } from 'knex';

class TaskDbStore implements IStoreTask {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  //Create a new task for the give squad
  async create({ id, squad, name, description }: CreateTaskType): Promise<LoadedTaskType | void> {
    const currentConfig = (await this.#client('squads').select('currentMaxRounds', 'currentPercentual').where({ enabled: true, id: squad }))[0];
    await this.#client('tasks').insert({ id, squad, name, description, maxRounds: currentConfig.currentMaxRounds, percentual: currentConfig.currentPercentual });
    return { id };
  }

  //Change the active field to false
  async deactive({ id, squad }: IdentifierTaskType): Promise<void> {
    await this.#client('tasks').where({ squad, id, enabled: true }).update({
      active: false,
      finished: true,
      updatedAt: new Date(),
    });
  }

  //Delete the logical record
  async delete({ id, squad }: IdentifierTaskType): Promise<void> {
    Promise.all([
      this.#client('tasks').where({ squad, id, enabled: true }).update({
        enabled: false,
        updatedAt: new Date(),
      }),
      this.#client('tasks-points').where({ task: id, enabled: true }).update({
        enabled: false,
        updatedAt: new Date(),
      }),
      this.#client('tasks-messages').where({ task: id, enabled: true }).update({
        enabled: false,
        updatedAt: new Date(),
      }),
    ]);
  }

  //Find all tasks and their corresponding informations for the given squad
  async findAll({ squad }: FindTaskType): Promise<LoadedAllTask> {
    const tasks = await this.#client
      .select('tasks.id as task', 'tasks.name', 'tasks.maxRounds', this.#client.raw('max(??)  as "currentRound"', ['tasks-points.currentRound']), 'tasks.points', 'tasks.active', 'tasks.finished')
      .where({ squad, 'tasks.enabled': true })
      .orderBy('tasks.createdAt', 'desc')
      .from('tasks')
      .leftJoin('tasks-points', 'tasks-points.task', '=', 'tasks.id')
      .groupBy('tasks.id', 'name', 'maxRounds', 'tasks.points', 'finished', 'active', 'tasks.updatedAt');

    const res: LoadedAllTask = { active: [], deactive: [] };

    tasks.forEach((task) => {
      const status = task.active ? 'active' : 'deactive';
      delete task.active;
      res[status].push(task);
    });

    return res;
  }

  getValidUsers(votes: any, usersSquad: string[], currentRound: number) {
    return votes
      .map((v: any) => {
        if (usersSquad.includes(v.userId) && v.round === currentRound) {
          return v.user;
        }
      })
      .filter((f: string) => {
        return f !== undefined;
      });
  }

  async find({ squad, id }: IdentifierTaskType): Promise<LoadedTask | void> {
    const [votes, comment] = await Promise.all([
      this.#client
        .select('tasks.name as task', 'tasks.description', 'tasks.finished', 'tasks.active', this.#client.raw('\'vote\' as "type"'), 'users.id as userId', 'users.name as user', 'users.email', 'tasks-points.currentRound as round', 'tasks-points.points as content', 'tasks-points.updatedAt', this.#client.raw('max(??)  as "currentRound"', ['tasks-points.currentRound']))
        .where({ squad, 'tasks.id': id, 'tasks.enabled': true })
        .from('tasks')
        .leftJoin('tasks-points', 'tasks-points.task', '=', 'tasks.id')
        .leftJoin('users', 'users.id', '=', 'tasks-points.user')
        .groupBy('tasks.name', 'tasks.description', 'tasks.finished', 'tasks.active', 'users.id', 'users.name', 'users.email', 'tasks-points.currentRound', 'tasks-points.points', 'tasks-points.updatedAt')
        .orderBy('tasks-points.updatedAt', 'desc'),
      this.#client
        .select('tasks.name as task', 'tasks.description', 'tasks.finished', 'tasks.active', this.#client.raw('\'comment\' as "type"'), 'users.id as userId', 'users.name as user', 'users.email', 'tasks-messages.currentRound as round', 'tasks-messages.message as content', 'tasks-messages.updatedAt', this.#client.raw('max(??)  as "currentRound"', ['tasks-messages.currentRound']))
        .where({ squad, 'tasks.id': id, 'tasks.enabled': true })
        .from('tasks')
        .leftJoin('tasks-messages', 'tasks-messages.task', '=', 'tasks.id')
        .leftJoin('users', 'users.id', '=', 'tasks-messages.user')
        .groupBy('tasks.name', 'tasks.description', 'tasks.finished', 'tasks.active', 'users.id', 'users.name', 'users.email', 'tasks-messages.currentRound', 'tasks-messages.message', 'tasks-messages.updatedAt'),
    ]);

    if (!(votes.length === 0 && comment.length === 0)) {
      const squadUsers = (await this.#client.select('user').where({ squad, enabled: true }).from('squads-users')).map((u) => {
        return u.user;
      });

      const validUsers = this.getValidUsers(votes, squadUsers, votes[0].currentRound);

      const a = validUsers.length === squadUsers.length ? votes[0].currentRound + 1 : votes[0].currentRound;

      const res: LoadedTask = {
        task: votes[0].task,
        description: votes[0].description,
        finished: votes[0].finished,
        actions: [],
      };

      votes.concat(comment).forEach((v) => {
        if (v.content) {
          res.actions.push({
            type: v.type,
            content: v.content,
            user: v.user,
            email: v.email,
            date: v.updatedAt,
            round: v.round,
            currentRound: v.active ? (a ? v.round === a : true) : false,
          });
        }
      });

      res.actions.sort(function (a: any, b: any) {
        return a.date - b.date;
      });

      return res;
    }
  }
}

/*
5 cenários

primeiro voto do universo
finished = false
not vote in action[]
botao habilitado!

lucca abre modal, lucca já votou, line n votou
finished = false
vote in action []
lucca in action(tipo voto).user && currentRound = true
botao desabilitado!

line abre modal, lucca já votou
finished = false
vote in action []
line not in action(tipo voto).user && currentRound = true
botao habilitado!

line abre modal, lucca já votou
finished = false
vote in action []
action(tipo voto) && currentRound = true = []
botao habilitado!

line ja votou, lucca abre modal
finished = false
vote in action []
line not in action(tipo voto).user && currentRound = true
botao habilitado!

line ja votou, lucca abre modal (acabouuu)
finished = true

*/

export { TaskDbStore };
