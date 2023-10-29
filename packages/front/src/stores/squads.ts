import { defineStore } from 'pinia';

import api from '../services/api';
import router from '../router';
import { userStore } from './user';
import { squadSchemas } from '@briefly/apidef';

interface State {
  squadList: squadSchemas.FindAllSchemaRes,
  squadActive: squadSchemas.FindSchemaRes | undefined,
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

    async addUser({email, owner = false}: {email: string, owner?: boolean}) {
      const squadId = this.activeId;
      const squad = await api.addUsersSquad({ email, owner }, { params: { squadId }})
      .catch((error) => {
        throw error;
      });
      this.squadActive = squad;
    },

    async addYourself({squadId, owner = false}: {squadId: string, owner?: boolean}) {
      const email = user.userEmail;
      const squad = await api.addUsersSquad({ email, owner }, { params: { squadId }})
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

    async addSquad(payload: squadSchemas.CreateSchemaReq) {
      const { id } = await api.createSquad(payload)
      .catch((error) => {
        throw error;
      });
      await this.addYourself({ squadId: id, owner: true });
      await this.gatherSquadList();
    },

    async updateSquad(payload: squadSchemas.UpdateSchemaReq) {
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