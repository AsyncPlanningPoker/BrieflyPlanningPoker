import { createStore } from 'vuex';
import { signInStore } from './sign-in';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { signIn: signInStore },
});
