import { api } from '../services/api';

export default {

  state: {
    squadList: [],

    squadActive: {},
  },

  getters: {
    getSquadList(state) {
      return state.squadList;
    },

    getSquadActive(state) {
      return state.squadActive;
    },
  },

  mutations: {
    ADD_SQUAD_LIST(state, payload) {
      state.squadList = payload;
    },

    ADD_SQUAD_ACTIVE(state, payload) {
      state.squadActive = payload;
    },
  },

  actions: {
    async addSquadList({commit}) {
      const req = await api.get('squad/7e13d8f9-159e-4bfb-b67f-1f9cd3084813');
      const reqdata = req.data;
      commit('ADD_SQUAD_LIST', reqdata);
    },

    addSquadActive({commit}, payload) {
      commit('ADD_SQUAD_ACTIVE', payload);
    }
  }
}