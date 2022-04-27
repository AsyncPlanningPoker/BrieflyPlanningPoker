import axios from 'axios';
import router from '../router/index';

const passRecoveryTwoStore = {
  state: {
    newPassword: '',
    confirmPassword: '',
    errorMessage: '',
  },

  getters: {},

  mutations: {
    updateNewPassword(state, newPassword) {
      state.newPassword = newPassword;
    },
    updateConfirmPassword(state, confirmPassword) {
      state.confirmPassword = confirmPassword;
    },
    updateToken(state, token) {
      state.token = token;
    },
    updateErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
  },

  actions: {
    update({ commit }, token) {
      axios
        .patch('http://localhost:8000/user/pass-recovery', { password: this.state.passRecoveryTwo.newPassword, token })
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
