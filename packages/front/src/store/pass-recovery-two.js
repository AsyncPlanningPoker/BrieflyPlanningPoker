import { api } from '../services/api';
import router from '../router/index';

const passRecoveryTwoStore = {
  state: {
    confirmPassword: '',
    errorMessage: '',
    newPassword: '',
  },

  getters: {},

  mutations: {
    updateConfirmPassword(state, confirmPassword) {
      state.confirmPassword = confirmPassword;
    },
    updateErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    updateNewPassword(state, newPassword) {
      state.newPassword = newPassword;
    },
  },

  actions: {
    update({ commit }, token) {
      api
        .patch('user/pass-recovery', { password: this.state.passRecoveryTwo.newPassword, token })
        .then(() => {
          router.push('/signin');
        })
        .catch((err) => {
          commit('updateErrorMessage', err.response.data.message);
        });
    },
  },

  modules: {},
};

export { passRecoveryTwoStore };
