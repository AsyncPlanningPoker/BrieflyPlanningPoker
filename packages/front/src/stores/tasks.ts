import { defineStore } from 'pinia';
import { squadSchemas } from '@briefly/apidef';

import api from '../services/api';
import { squadStore } from './squads';


interface State {
  enabledTasks: squadSchemas.FindSchemaRes["tasks"],
  disabledTasks: squadSchemas.FindSchemaRes["tasks"],
};

const squad = squadStore();

const taskStore =  defineStore('taskStore', {
  state: (): State => ({
    enabledTasks: [],
    disabledTasks: [],
  }),

  actions: {
    async gatherTasks() {
      const tasks = squad.squadActive?.tasks;
      this.enabledTasks = tasks?.filter((task) => task.active) ?? [];
      this.disabledTasks = tasks?.filter((task) => task.active) ?? [];
    },

    async addTask(payload: squadSchemas.CreateTaskSchemaReq) {
      try{
        const squadId = squad.activeId;
        const newTask = await api.createTaskSquad(payload, { params: { squadId }});

        if(squad.squadActive)
          squad.squadActive.tasks = squad.squadActive.tasks
            .concat([newTask]);

        await this.gatherTasks();
      } catch (e: unknown) {
        console.error(e)
        // router.push('signin');
      }
    },

    async disableTask(taskId: string) {
      try{
        const disabledTask = await api.deactivateTask(undefined, { params: { taskId } });

        if(squad.squadActive)
          squad.squadActive.tasks = squad.squadActive.tasks
            .filter(({ id }) => disabledTask.id != id)
            .concat([disabledTask]);

        await this.gatherTasks();
      } catch (e: unknown) {
        console.error(e)
        // router.push('signin');
      }
    },

    async deleteTask(taskId: string) {
      try{
        const deletedTask = await api.deleteTask(undefined, { params: { taskId } });

        if(squad.squadActive)
          squad.squadActive.tasks = squad.squadActive.tasks
            .filter(({ id }) => deletedTask.id != id);

        await this.gatherTasks();
      } catch (e: unknown) {
        console.error(e)
        // router.push('signin');
      }
    },
  }
});

export { taskStore }