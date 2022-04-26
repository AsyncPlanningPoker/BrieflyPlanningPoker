import axios from 'axios';

const signInStore = {
  state: {
    email: '',
    errorMessage: '',
    isAuth: false,
    password: '',
    userToken: '',
  },

  getters: {},

  mutations: {
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
    login({ commit }) {
      axios
        .post('http://localhost:8000/user/login', { email: this.state.signIn.email, password: this.state.signIn.password })
        .then((res) => {
          const token = res.data.token;
          commit('updateUserToken', token);
          commit('updateIsAuth', true);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        })
        .catch((err) => {
          commit('updateErrorMessage', err.response.data.message);
        });
    },
  },

  modules: {},
};

export { signInStore };
