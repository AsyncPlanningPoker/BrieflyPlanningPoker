import { defineStore } from 'pinia';
import { api } from '../services/api';
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
        .post('user/login', { email: this.email, password: this.password })
        .then((res) => {
          const token = res.data.token;
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
