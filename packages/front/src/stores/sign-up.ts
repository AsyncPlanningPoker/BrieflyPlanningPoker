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
    async register() {
      try{
        const { token } = await api.createUser(this);
        user.updateUserToken(token);
        user.updateUserEmail(this.email);
        router.push('/');
      } catch (e: any){
        this.errorMessage = e.response.data.message;
        // router.push("/signin");
      }
    }
  }
});

export { signUpStore };
