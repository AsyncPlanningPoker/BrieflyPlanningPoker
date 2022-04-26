import axios from 'axios';
import router from '../router/index';

const signUpStore = {
  state: {
    name: '',
    email: '',
    errorMessage: '',
    isAuth: false,
    password: '',
    userToken: '',
  },

  getters: {},

  mutations: {
    updateName(state, name) {
      state.name = name;
    },
    updateEmail(state, email) {
      state.email = email;
    },
    updatePassword(state, password) {
      state.password = password;
    },
    updateErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    updateUserToken(state, userToken) {
      state.userToken = userToken;
    },
    updateIsAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
  },

  actions: {
    registry({ commit }) {
      axios
        .post('http://localhost:8000/user', { name: this.state.signUp.name, email: this.state.signUp.email, password: this.state.signUp.password })
        .then((res) => {
          const token = res.data.token;
          commit('updateUserToken', token);
          commit('updateIsAuth', true);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
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
