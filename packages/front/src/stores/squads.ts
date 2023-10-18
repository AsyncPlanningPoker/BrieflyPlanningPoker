import { defineStore } from 'pinia';

import { api } from '../services/api';
import router from '../router';
import { userStore } from './user';

type Squad = {
  id?: string
};

interface State {
  squadList: Squad[],
  squadActive: Squad,
};

const user = userStore();

const squadStore =  defineStore('squadStore', {
  state: (): State => ({
    squadList: [],
    squadActive: {},
  }),

  getters: {
    getActiveId(): string{
      return this.squadActive.id ?? '';
    },
  },

  actions: {
    async gatherSquadList() {
      await api
        .get('squad')
        .then((res) => {
          return this.squadList = res.data;
        })
        .catch(() => {
          return router.push('signin');
        });
    },

    async gatherSquad(id: string) {
      const { data } = await api.get(`squad/${id}`);
      this.squadActive =  data;
    },

    async addUser(payload: string) {
      const id = this.getActiveId;
      await api.post(`squad/${id}/users`, { email: payload, owner: true })
      .catch((error) => {
        throw error;
      });
      await this.gatherSquad(id);
    },

    async addYourself(id: string) {
      const email = user.userEmail;
      await api.post(`squad/${id}/users`, { email: email, owner: true })
      .catch((error) => {
        throw error;
      });
      await this.gatherSquad(id);
    },

    async delUser(payload: string) {
      const id = this.getActiveId;
      await api.delete(`squad/${id}/users?email=${payload}`).catch((error) => {
        throw error;
      });
      await this.gatherSquad(id);
    },

    async delYourself() {
      const id = this.getActiveId;
      const email = user.userEmail;
      await api.delete(`squad/${id}/users?email=${email}`)
      .catch((error) => {
        throw error;
      });
      await this.gatherSquadList();
      this.squadActive = {};
    },

    async addSquad(payload: Squad) {
      const { data } = await api.post('squad', payload)
      .catch((error) => {
        throw error;
      });
      await this.addYourself(data.id);
      await this.gatherSquadList();
    },

    async updateSquad(payload: Squad) {
      const id = this.getActiveId;
      await api.put(`squad/${id}`, payload).catch((error) => {
        throw error;
      });
      await this.gatherSquad(id);
    },
  }
});

export { squadStore };