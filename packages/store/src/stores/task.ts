import { deactiveTaskType, CreateTaskType, deleteTaskType, IStoreTask, LoadedTaskType, LoadedAllTask, findTaskType } from '../types/task';
import { Knex } from 'knex';

class TaskDbStore implements IStoreTask {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  async create(task: CreateTaskType): Promise<LoadedTaskType | void> {

    const currentConfig = (await this.#client('squads').select('currentMaxRounds', 'currentPercentual').where({enabled: true, id: task.squad}))[0]

    return this.#client('tasks')
      .insert({ id: task.id, squad: task.squad, name: task.name, description: task.description, maxRounds: currentConfig.currentMaxRounds, percentual: currentConfig.currentPercentual })
      .catch((error) => {
        throw new Error(error.detail);
      })
      .then(() => {
        return {id: task.id}
      })
  }

  async deactive(task: deactiveTaskType): Promise<void> {
  
    await this.#client('tasks').where({ squad: task.squad, id: task.id, enabled: true })
      .update({
        active: false,
        finished: true,
        updatedAt: new Date(),
      })
      .catch((error) => {
        throw new Error(error.detail);
      })
      .then(() => {
        return {id: task.id}
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
    const res = await this.#client
      .select('id', 'name', 'maxRounds', 'active', 'finished')
      .from('tasks')
      .where({squad: task.squad, enabled:true})
    return res;
  }
}

export { TaskDbStore };
