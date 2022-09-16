import { CreateTaskType, IdentifierTaskType, IStoreTask, FindTaskType, LoadedTaskType, LoadedAllTask } from '../types/task';
import { Knex } from 'knex';

class TaskDbStore implements IStoreTask {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  //Create a new task for the give squad
  async create({id, squad, name, description}: CreateTaskType): Promise<LoadedTaskType | void> {
    const currentConfig = (await this.#client('squads').select('currentMaxRounds', 'currentPercentual').where({enabled: true, id: squad}))[0]
    await this.#client('tasks').insert({ id, squad, name, description, maxRounds: currentConfig.currentMaxRounds, percentual: currentConfig.currentPercentual })
    return {id}
  }

  //Change the active field to false
  async deactive({id, squad}: IdentifierTaskType): Promise<void> {
    await this.#client('tasks').where({ squad, id, enabled: true })
      .update({
        active: false,
        finished: true,
        updatedAt: new Date(),
      })
  }

  //Delete the logical record
  async delete({id, squad}: IdentifierTaskType): Promise<void> {
    Promise.all([
      this.#client('tasks').where({ squad, id, enabled: true })
        .update({
          enabled: false,
          updatedAt: new Date(),
        }),
      this.#client('tasks-points').where({task: id, enabled: true })
      .update({
        enabled: false,
        updatedAt: new Date(),
      }),
      this.#client('tasks-messages').where({task: id, enabled: true })
      .update({
        enabled: false,
        updatedAt: new Date(),
      })
    ])
  }

  //Find all tasks and their corresponding informations for the given squad
  async findAll({squad}: FindTaskType): Promise<LoadedAllTask> {
      const tasks =  await this.#client
      .select('tasks.id as task', 'tasks.name', 'tasks.maxRounds', this.#client.raw('max(??)  as "currentRound"', ['tasks-points.currentRound']),  'tasks.points', 'tasks.active', 'tasks.finished')
      .where({squad, "tasks.enabled":true})
      .from('tasks')
      .leftJoin('tasks-points', 'tasks-points.task', '=', 'tasks.id')
      .groupBy('tasks.id', 'name', 'maxRounds', 'tasks.points', 'finished', 'active')

      const res : LoadedAllTask =  {active: [], deactive: []}

      tasks.forEach((task) => {
        const status = task.active ? 'active' : 'deactive'
        delete task.active
        res[status].push(task) 
      })

      return res
  }
}

export { TaskDbStore };
