import { createStore } from 'vuex';
import { signInStore } from './sign-in';
import { signUpStore } from './sign-up';
import { passRecoveryOneStore } from './pass-recovery-one';
import { passRecoveryTwoStore } from './pass-recovery-two';
import squads from './squads';
import tasks from './tasks';

export default createStore({
  state: {
    userToken: JSON.parse(localStorage.getItem('userToken')) || '',
    userEmail: JSON.parse(localStorage.getItem('userEmail')) || '',
  },

  getters: {
    getUserEmail(state) {
      return state.userEmail;
    },
  },

  mutations: {
    UPDATE_USER_TOKEN(state, payload) {
      state.userToken = payload;
      localStorage.removeItem('userToken');
      localStorage.setItem('userToken', JSON.stringify(state.userToken));
    },
    UPDATE_USER_EMAIL(state, payload) {
      state.userEmail = payload;
      localStorage.removeItem('userEmail');
      localStorage.setItem('userEmail', JSON.stringify(state.userEmail));
    },
  },

  actions: {
    updateUserToken({ commit }, payload) {
      commit('UPDATE_USER_TOKEN', payload);
    },
    updateUserEmail({ commit }, payload) {
      commit('UPDATE_USER_EMAIL', payload);
    },
  },

  modules: {
    signIn: signInStore,
    signUp: signUpStore,
    passRecoveryOne: passRecoveryOneStore,
    passRecoveryTwo: passRecoveryTwoStore,
    squads,
    tasks,
  },
});
