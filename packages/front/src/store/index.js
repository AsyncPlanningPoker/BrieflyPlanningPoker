import { createStore } from 'vuex';
import { signInStore } from './sign-in';
import { signUpStore } from './sign-up';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { signIn: signInStore, signUp: signUpStore },
});
