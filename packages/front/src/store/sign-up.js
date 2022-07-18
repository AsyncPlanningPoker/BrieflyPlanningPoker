import { api, setToken } from '../services/api';
import router from '../router/index';

const signUpStore = {
  state: {
    confirmPassword: '',
    email: '',
    errorMessage: '',
    name: '',
    password: '',
  },

  getters: {},

  mutations: {
    updateEmail(state, email) {
      state.email = email;
    },
    updateErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    updateName(state, name) {
      state.name = name;
    },
    updatePassword(state, password) {
      state.password = password;
    },
    updateConfirmPassword(state, confirmPassword) {
      state.confirmPassword = confirmPassword;
    },
  },

  actions: {
    registry({ commit }) {
      api
        .post('user', { name: this.state.signUp.name, email: this.state.signUp.email, password: this.state.signUp.password })
        .then((res) => {
          const token = res.data.token;
          commit('updateUserToken', token);
          commit('updateIsAuth', true);
          setToken(token);
          router.push('/');
        })
        .catch((err) => {
          commit('updateErrorMessage', err.response.data.message);
        });
    },
  },

  modules: {},
};

export { signUpStore };
