import { defineStore } from 'pinia';

import api from '../services/api';
import router from '../router';
import { userStore } from './user';
import { squadSchemas } from '@briefly/apidef';
import { AxiosError } from 'axios';
import { computed, ref } from 'vue';
import { readonly } from 'vue';

const user = userStore();
const squadStore =  defineStore('squadStore', () => {
  
  const squadList = ref<squadSchemas.FindAllSchemaRes>([]);
  const activeSquad = ref<squadSchemas.FindSchemaRes | undefined>();
  const activeId = computed(() => activeSquad.value?.id);
  
  async function gatherSquadList() {
    try {
      const res = await api.findAllSquads();
      squadList.value = res;
      } catch(e: unknown){
        if(e instanceof AxiosError && e.response?.status == 401){
          console.error(e);
          user.logout();
          router.push('signin');
      } else console.error(e);
    }
  }

  async function gatherSquad(squadId: string) {
    try{
      const data = await api.findSquad({ params: { squadId }});
      activeSquad.value = data;
    } catch(e: unknown){
      console.error(e);
    }
  }

  async function addUser({email, owner = false}: {email: string, owner?: boolean}) {
    try {
      const squadId = activeId.value;
      if(! squadId) throw new Error("No squad is active!");
      const squad = await api.addUsersSquad({ email, owner }, { params: { squadId }})
      activeSquad.value = squad;
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function addYourself({squadId, owner = false}: {squadId: string, owner?: boolean}) {
    try {
      const email = user.email;
      if(! email) throw new Error("Must be logged in to perform this action!");
      const squad = await api.addUsersSquad({ email, owner }, { params: { squadId }})
      activeSquad.value = squad;
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function delUser(email: string) {
    try{
      const squadId = activeId.value;
      if(! squadId) throw new Error("No squad is active!");
      const squad = await api.delUsersSquad(
        undefined,
        { params: { squadId }, queries: { email }});
      activeSquad.value = squad;
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function delYourself() {
    try{
      const email = user.email;
      if(! email) throw new Error("Must be logged in to perform this action!");
      await delUser(email);
      activeSquad.value = undefined;
      await gatherSquadList();
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function addSquad(payload: squadSchemas.CreateSchemaReq) {
    try{
      const { id } = await api.createSquad(payload)
      await addYourself({ squadId: id, owner: true });
      await gatherSquadList();
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  async function updateSquad(payload: squadSchemas.UpdateSchemaReq) {
    try{
      const squadId = activeId.value;
      if(! squadId) throw new Error("No squad is active!");
      const squad = await api.updateSquad(payload, { params: { squadId } })
      activeSquad.value = squad;
    } catch (e: unknown) {
      console.error(e)
      // router.push('signin');
    }
  }

  return { squadList: readonly(squadList), activeSquad, activeId,
    gatherSquadList, gatherSquad, addSquad, updateSquad, addUser, addYourself, delUser, delYourself }
});

export { squadStore };
