import { defineStore } from 'pinia';
import { userSchemas } from '@briefly/apidef';
import api from '../services/api';

interface State {
  userToken: string,
  userEmail: string,
  errorMessage: string,
  success: boolean,
};

const userStore = defineStore('userStore',{
  state: (): State => {
    const token = localStorage.getItem('userToken');
    const userToken = token ? JSON.parse(token) : "";
    const email = localStorage.getItem('userEmail');
    const userEmail = email ? JSON.parse(email) : "";
    return ({
    userToken,
    userEmail,
    errorMessage: '',
    success: false,
  })},
  
  actions: {
    updateUserToken(token: string) {
      this.userToken = token;
      localStorage.removeItem('userToken');
      localStorage.setItem('userToken', JSON.stringify(this.userToken));
    },
    updateUserEmail(email: string) {
      this.userEmail = email;
      localStorage.removeItem('userEmail');
      localStorage.setItem('userEmail', JSON.stringify(this.userEmail));
    },
    logout() {
      this.userToken = '';
      this.userEmail = '';
      localStorage.removeItem('userToken');
      localStorage.removeItem('userEmail');
    },

    async updateYourself(payload: userSchemas.UpdateSchemaReq) {
      this.errorMessage = '';
      this.success = false;
      try {
        await api.updateUser(payload);
        this.success = true;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message;
        if (typeof errorMessage === 'object') {
          this. errorMessage = err.response.data.message[0].msg;
        } else if (typeof errorMessage === 'string') {
          this. errorMessage = err.response.data.message;
        } else {
          this. errorMessage = 'Something went wrong.';
        }
      }
    },

    async deleteYourself() {
      await api.deleteUser(undefined);
      this.logout();
    },
  },
});

export { userStore };
