import { defineStore } from 'pinia';
import { userSchemas } from '@briefly/apidef';
import { AxiosError } from 'axios';
import { readonly, ref, watch } from 'vue';
import api from '@/services/api';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { squadStore } from '.';

const userStore = defineStore('userStore', () => {
  const storageToken = localStorage.getItem('userToken');
  const storageEmail = localStorage.getItem('userEmail');
  const token = ref<string | null>(storageToken && JSON.parse(storageToken));
  const email = ref<string | null>(storageEmail && JSON.parse(storageEmail));
  const errorMessage = ref<string | undefined>();

  const squad = squadStore();
  const events = new Map();
  events.set("added-user", onAddedUser(squad));

  watch(token, (newToken) => {
    localStorage.removeItem('userToken');
    if(newToken != '') localStorage.setItem('userToken', JSON.stringify(newToken));
  });

  watch(email, (newEmail) => {
    localStorage.removeItem('userEmail');
    if(newEmail != '') localStorage.setItem('userEmail', JSON.stringify(newEmail));
  });

  async function login(data: {email: string, password: string}): Promise<void> {
    try{
      const response = await api.loginUser(data);
      email.value = data.email;
      token.value = response.token;
      errorMessage.value = undefined;
    } catch (e: unknown){
      if(e instanceof AxiosError){
        if(e.response?.status == 401) 
          errorMessage.value = "Invalid credentials"
          console.error(e.message);
      } else console.error(e);
    }
  }

  async function register(data: { name: string, email: string, password: string }) {
    try{
      const response = await api.createUser(data);
      email.value = data.email;
      token.value = response.token;
      errorMessage.value = undefined;
    } catch (e: unknown){
      console.error(e);
    }
  }

  function logout() {
    token.value = '';
    email.value = '';
  }

  function getEvents(){
    fetchEventSource('http://localhost:8000/api/users/events', {
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      async onopen(response) {
          console.log("Tentando!");
          console.log(response);
      },
      onmessage(ev) {
        console.log("Mensagem!");
        ev.data =  ev.data ? JSON.parse(ev.data) : undefined;
        const eventDispatcher = events.get(ev.event);
        console.log(eventDispatcher);
        if(eventDispatcher) eventDispatcher(ev.data);
      },
      onerror(err) {
        console.error("ERRO!");
        console.error(err);
      },
    })
  }

  async function updateYourself(payload: userSchemas.UpdateSchemaReq) {
    try {
      const response = await api.updateUser(payload);
      email.value = response.email;
      errorMessage.value = undefined;
    } catch (e: unknown){
      if(e instanceof AxiosError){
        if(e.response?.status == 401) 
          errorMessage.value = "Invalid credentials"
          console.error(e.message);
      } else console.error(e);
    }
  }

  async function deleteYourself() {
    await api.deleteUser(undefined);
    logout();
  }
  return { email: readonly(email), errorMessage: readonly(errorMessage), login, logout,
    register, updateYourself, deleteYourself, getEvents }
});

export { userStore };

const onAddedUser = (squad: ReturnType<typeof squadStore>) => {
  return (data: any) => {squad.squadList.push(data)};
}