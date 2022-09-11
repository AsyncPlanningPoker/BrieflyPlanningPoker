import { deactiveTaskType, CreateTaskType, deleteTaskType, IStoreTask, LoadedTaskType, LoadedAllTask, findTaskType } from '../types/task';
import { Knex } from 'knex';

class TaskDbStore implements IStoreTask {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  async create(task: CreateTaskType): Promise<LoadedTaskType | void> {
    const currentConfig = (await this.#client('squads').select('currentMaxRounds', 'currentPercentual').where({enabled: true, id: task.squad}))[0]
    await this.#client('tasks').insert({ id: task.id, squad: task.squad, name: task.name, description: task.description, maxRounds: currentConfig.currentMaxRounds, percentual: currentConfig.currentPercentual })
    return {id: task.id}
  }

  async deactive(task: deactiveTaskType): Promise<void> {
    await this.#client('tasks').where({ squad: task.squad, id: task.id, enabled: true })
      .update({
        active: false,
        finished: true,
        updatedAt: new Date(),
      })
  }

  async delete(task: deleteTaskType): Promise<void> {
    await this.#client('tasks').where({ squad: task.squad, id: task.id, enabled: true })
      .update({
        enabled: false,
        updatedAt: new Date(),
      })
  }

  async findAll(task: findTaskType): Promise<LoadedAllTask[]> {
    return this.#client
      .select('id', 'name', 'maxRounds', 'active', 'finished')
      .from('tasks')
      .where({squad: task.squad, enabled:true})
  }
}

export { TaskDbStore };
