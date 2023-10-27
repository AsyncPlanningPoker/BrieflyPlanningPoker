import { defineStore } from 'pinia';
import api from '../services/api';
import router from '../router/index';
import { userStore } from './user';

interface State {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  errorMessage: string,
}

const user = userStore()

const signUpStore = defineStore('signUpStore',{
  state: (): State => ({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: ''
  }),

  actions: {
    register() {
      api
        .createUser(this)
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

export { signUpStore };
