import { defineStore } from 'pinia';

import api from '../services/api';
import router from '../router';
import { userStore } from './user';
import { squadSchemas } from '@briefly/apidef';
import { AxiosError } from 'axios';

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
      try{
        const res = await api.findAllSquads();
        this.squadList = res;
        } catch(e: unknown){
          if(e instanceof AxiosError && e.response?.status == 401){
            console.error(e);
            user.logout();
            router.push('signin');
          } else console.error(e);
      }
    },

    async gatherSquad(squadId: string) {
      try{
        const data = await api.findSquad({ params: { squadId }});
        this.squadActive = data;
      } catch(e: unknown){
        console.error(e);
        // router.push('signin');
      }
    },

    async addUser({email, owner = false}: {email: string, owner?: boolean}) {
      try {
        const squadId = this.activeId;
        const squad = await api.addUsersSquad({ email, owner }, { params: { squadId }})
        this.squadActive = squad;
      } catch (e: unknown) {
        console.error(e)
        // router.push('signin');
      }
    },

    async addYourself({squadId, owner = false}: {squadId: string, owner?: boolean}) {
      try {
        const email = user.userEmail;
        const squad = await api.addUsersSquad({ email, owner }, { params: { squadId }})
        this.squadActive = squad;
      } catch (e: unknown) {
        console.error(e)
        // router.push('signin');
      }
    },

    async delUser(email: string) {
      try{
        const squadId = this.activeId;
        const squad = await api.delUsersSquad(
          undefined,
          { params: { squadId }, queries: { email }});
        this.squadActive = squad;
      } catch (e: unknown) {
        console.error(e)
        // router.push('signin');
      }
    },

    async delYourself() {
      try{
        const squadId = this.activeId;
        const email = user.userEmail;
        const squad = await api.delUsersSquad(
          undefined,
          { params: { squadId }, queries: { email }})
        this.squadActive = squad;
      } catch (e: unknown) {
        console.error(e)
        // router.push('signin');
      }
    },

    async addSquad(payload: squadSchemas.CreateSchemaReq) {
      try{
        const { id } = await api.createSquad(payload)
        await this.addYourself({ squadId: id, owner: true });
        await this.gatherSquadList();
      } catch (e: unknown) {
        console.error(e)
        // router.push('signin');
      }
    },

    async updateSquad(payload: squadSchemas.UpdateSchemaReq) {
      try{
        const squadId = this.activeId;
        const squad = await api.updateSquad(payload, { params: { squadId } })
        this.squadActive = squad;
      } catch (e: unknown) {
        console.error(e)
        // router.push('signin');
      }
    },
  }
});

export { squadStore };