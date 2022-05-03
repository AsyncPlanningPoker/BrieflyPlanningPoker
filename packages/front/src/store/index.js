import { createStore } from 'vuex';
import { signInStore } from './sign-in';
import { signUpStore } from './sign-up';
import { passRecoveryOneStore } from './pass-recovery-one';
import { passRecoveryTwoStore } from './pass-recovery-two';

export default createStore({
  state: { userToken: '', isAuth: false },
  getters: {},
  mutations: {
    updateUserToken(state, userToken) {
      state.userToken = userToken;
    },
    updateIsAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
  },
  actions: {},
  modules: { signIn: signInStore, signUp: signUpStore, passRecoveryOne: passRecoveryOneStore, passRecoveryTwo: passRecoveryTwoStore },
});
