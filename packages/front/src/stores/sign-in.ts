import { defineStore } from 'pinia';
import api from '../services/api';
import router from '../router/index';
import { userStore } from './user';

interface State {
  email: string,
  errorMessage: string,
  password: string
};

const user = userStore();

const signInStore = defineStore('signInStore',{
  state: (): State => ({
    email: '',
    errorMessage: '',
    password: '',
  }),

  actions: {
    async login() {
      await api
        .loginUser(this)
        .then((res) => {
          const { token } = res;
          user.updateUserToken(token)
          user.updateUserEmail(this.email)
          router.push('/');
        })
        .catch((err) => {
          this.errorMessage = err.response.data.message;
        });
    },
  }
});

export { signInStore };
