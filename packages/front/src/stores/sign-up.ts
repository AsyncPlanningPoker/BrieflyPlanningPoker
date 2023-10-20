import { defineStore } from 'pinia';
import { api } from '../services/api';
import router from '../router/index';
import { userStore } from './user';

interface State {
  confirmPassword: string,
  email: string,
  errorMessage: string,
  name: string,
  password: string,
}

const user = userStore()

const signUpStore = defineStore('signUpStore',{
  state: (): State => ({
    confirmPassword: '',
    email: '',
    errorMessage: '',
    name: '',
    password: ''
  }),

  actions: {
    register() {
      api
        .post('user', { name: this.name, email: this.email, password: this.password })
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

export { signUpStore };
