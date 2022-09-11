import { api } from '../services/api';

import router from '../router/index';


const signInStore = {
  state: {
    email: '',
    errorMessage: '',
    password: '',
  },

  getters: {
    getUserEmail(state) {
      return state.email;
    },
  },

  mutations: {
    updateEmail(state, email) {
      state.email = email;
    },
    updateErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    updatePassword(state, password) {
      state.password = password;
    },
  },

  actions: {
    login({ dispatch, commit }) {
      api.post('user/login', { email: this.state.signIn.email, password: this.state.signIn.password })
        .then((res) => {
          const token = res.data.token;
          dispatch('updateUserToken', token);
          router.push('/');
        })
        .catch((err) => {
          commit('updateErrorMessage', err.response.data.message);
        });
    },
  },

  modules: {},
};

export { signInStore };
