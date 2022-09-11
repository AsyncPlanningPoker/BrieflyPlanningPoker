import { createStore } from 'vuex';
import { signInStore } from './sign-in';
import { signUpStore } from './sign-up';
import { passRecoveryOneStore } from './pass-recovery-one';
import { passRecoveryTwoStore } from './pass-recovery-two';
import squads from './squads'

export default createStore({
  state: { 
    userToken: JSON.parse(localStorage.getItem('userToken')) || '',
  },

  getters: {},

  mutations: {
    UPDATE_USER_TOKEN(state, payload) {
      state.userToken = payload;
      localStorage.removeItem("userToken");
      localStorage.setItem("userToken", JSON.stringify(state.userToken));
    }
  },

  actions: {
    updateUserToken({commit}, payload) {
      commit('UPDATE_USER_TOKEN', payload);
    },
  },
  
  modules: { signIn: signInStore, signUp: signUpStore, passRecoveryOne: passRecoveryOneStore, passRecoveryTwo: passRecoveryTwoStore, squads },
});
