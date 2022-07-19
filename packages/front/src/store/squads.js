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

    getActiveId(state) {
      return state.squadActive.id;
    },
  },

  mutations: {
    ADD_SQUAD(state, payload) {
      state.squadList = [...state.squadList, payload];
    },

    ADD_SQUAD_LIST(state, payload) {
      state.squadList = payload;
    },

    ADD_SQUAD_ACTIVE(state, payload) {
      state.squadActive = payload;
    },

    UPDATE_SQUAD_ACTIVE(state, payload) {
      const updatedSquad = state.squadList.find((x) => x.id === payload);
      state.squadActive = updatedSquad;
    },
  },

  actions: {
    async addSquad({dispatch}, payload) {
      await api.post('squad', payload).catch((error) => {error = error.data.message});
      dispatch('addSquadList');
    },

    async addSquadList({commit}) {
      const req = await api.get('squad');
      const reqdata = req.data;
      commit('ADD_SQUAD_LIST', reqdata);
    },

    async addUser({commit, dispatch, getters}, payload) {
      const id = getters.getActiveId;
      console.log(id);
      const aa = {"users":[payload]}
      console.log(aa)
      await api.post(`squad/${id}/users`, aa).catch((error) => {error = error.data.message});
      await dispatch('addSquadList');
      commit('UPDATE_SQUAD_ACTIVE', id);
    },

    async leaveSquad({commit, dispatch, getters}, payload) {
      const id = getters.getSquadActive.id;
      await api.delete(`squad/${id}/users/${payload.email}`).catch((error) => {error = error.data.message});
      await dispatch('addSquadList');
      commit('UPDATE_SQUAD_ACTIVE', id);
    },

    async updateSquad({commit, dispatch, getters}, payload) {
      const id = getters.getSquadActive.id;
      await api.put(`squad/${id}`, payload).catch((error) => {error = error.data.message});
      await dispatch('addSquadList');
      commit('UPDATE_SQUAD_ACTIVE', id);
    },

    addSquadActive({commit}, payload) {
      commit('ADD_SQUAD_ACTIVE', payload);
    },
  }
}