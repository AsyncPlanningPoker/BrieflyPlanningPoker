import { defineStore } from 'pinia';
import { squads } from '@briefly/prisma/src/apiSchemas';

import api from '../services/api';
import { squadStore } from './squads';


interface State {
  enabledTasks: squads.FindSchemaRes["tasks"],
  disabledTasks: squads.FindSchemaRes["tasks"],
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

    async addTask(payload: squads.CreateTaskSchemaReq) {
      const squadId = squad.activeId;
      const newTask = await api.createTaskSquad(payload, { params: { squadId }})
      .catch((error) => {
        throw error;
      });

      if(squad.squadActive)
        squad.squadActive.tasks = squad.squadActive.tasks
          .concat([newTask]);

      await this.gatherTasks();
    },

    async disableTask(taskId: string) {
      const disabledTask = await api.deactivateTask(undefined, { params: { taskId } })
      .catch((error) => {
        throw error;
      });

      if(squad.squadActive)
        squad.squadActive.tasks = squad.squadActive.tasks
          .filter(({ id }) => disabledTask.id != id)
          .concat([disabledTask]);

      await this.gatherTasks();
    },

    async deleteTask(taskId: string) {
      const deletedTask = await api.deleteTask(undefined, { params: { taskId } })
      .catch((error) => {
        throw error;
      });

      if(squad.squadActive)
        squad.squadActive.tasks = squad.squadActive.tasks
          .filter(({ id }) => deletedTask.id != id);

      await this.gatherTasks();
    },
  }
});

export { taskStore }