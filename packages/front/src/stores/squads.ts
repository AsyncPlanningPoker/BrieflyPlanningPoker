import { defineStore } from 'pinia';

import api from '../services/api';
import router from '../router';
import { userStore } from './user';
import { squads } from '@briefly/prisma/src/apiSchemas';

interface State {
  squadList: squads.FindAllSchemaRes,
  squadActive: squads.FindSchemaRes | undefined,
};

const user = userStore();

const squadStore =  defineStore('squadStore', {
  state: (): State => ({
    squadList: [],
    squadActive: undefined,
  }),

  getters: {
    activeId: (state) => {
      return state.squadActive?.id ?? '';
    },
  },

  actions: {
    async gatherSquadList() {
      await api
        .findAllSquads()
        .then((res) => {
          return this.squadList = res;
        })
        .catch(() => {
          return router.push('signin');
        });
    },

    async gatherSquad(squadId: string) {
      const data = await api.findSquad({ params: { squadId }});
      this.squadActive = data;
    },

    async addUser(email: string) {
      const squadId = this.activeId;
      const squad = await api.addUsersSquad({ email }, { params: { squadId }})
      .catch((error) => {
        throw error;
      });
      this.squadActive = squad;
    },

    async addYourself(squadId: string) {
      const email = user.userEmail;
      const squad = await api.addUsersSquad({ email, owner: false }, { params: { squadId }})
      .catch((error) => {
        throw error;
      });
      this.squadActive = squad;
    },

    async delUser(email: string) {
      const squadId = this.activeId;
      const squad = await api.delUsersSquad(
        undefined,
        {
          params: { squadId },
          queries: { email }
        })
      .catch((error) => {
        throw error;
      });
      this.squadActive = squad;
    },

    async delYourself() {
      const squadId = this.activeId;
      const email = user.userEmail;
      const squad = await api.delUsersSquad(
        undefined,
        {
          params: { squadId },
          queries: { email }
        })
      .catch((error) => {
        throw error;
      });
      this.squadActive = squad;
    },

    async addSquad(payload: any) {
      const { id } = await api.createSquad(payload)
      .catch((error) => {
        throw error;
      });
      await this.addYourself(id);
      await this.gatherSquadList();
    },

    async updateSquad(payload: any) {
      const squadId = this.activeId;
      const squad = await api.updateSquad(payload, { params: { squadId } })
      .catch((error) => {
        throw error;
      });
      this.squadActive = squad;
    },
  }
});

export { squadStore };