import { defineStore } from 'pinia';
import { api } from '../services/api';
import { squadStore } from './squads';

interface Task {
  id?: string
};

interface State {
  enabledTasks: Task[],
  disabledTasks: Task[],
};

const squad = squadStore();

const taskStore =  defineStore('taskStore', {
  state: (): State => ({
    enabledTasks: [],
    disabledTasks: [],
  }),

  actions: {
    async gatherTasks(squadId: string) {
      const { data } = await api.get(`/squad/${squadId}/task`);
      this.enabledTasks = data.active;
      this.disabledTasks = data.unactive;
    },

    async addTask(payload: Task) {
      const squadId = squad.getActiveId;
      await api.post(`/squad/${squadId}/task`, payload)
      .catch((error) => {
        throw error;
      });
      await this.gatherTasks(squadId);
    },

    async disableTask(taskId: string) {
      const squadId = squad.getActiveId;
      await api.put(`/tasks/${taskId}/deactive`)
      .catch((error) => {
        throw error;
      });
      await this.gatherTasks(squadId);
    },

    async deleteTask(taskId: string) {
      const squadId = squad.getActiveId;
      await api.delete(`/tasks/${taskId}`)
      .catch((error) => {
        throw error;
      });
      await this.gatherTasks(squadId);
    },
  }
});

export { taskStore }