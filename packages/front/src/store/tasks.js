import { api } from '../services/api';

export default {
  state: {
    enabledTasks: [],

    disabledTasks: [],
  },

  getters: {
    getEnabledTasks(state) {
      return state.enabledTasks;
    },

    getDisabledTasks(state) {
      return state.disabledTasks;
    },
  },

  mutations: {
    ADD_ENABLED_TASKS(state, payload) {
      state.enabledTasks = payload;
    },

    ADD_DISABLED_TASKS(state, payload) {
      state.disabledTasks = payload;
    },
  },

  actions: {
    async gatherTasks({ commit }, payload) {
      const req = await api.get(`/squad/${payload}/task`);
      commit('ADD_ENABLED_TASKS', req.data.active);
      commit('ADD_DISABLED_TASKS', req.data.deactive);
    },

    async addTask({ getters, dispatch }, payload) {
      const id = getters.getActiveId;
      await api.post(`/squad/${id}/task`, payload).catch((error) => {
        throw error;
      });
      await dispatch('gatherTasks', id);
    },

    async disableTask({ dispatch, getters }, payload) {
      const id = getters.getActiveId;
      await api.put(`/squad/${id}/task/${payload}/deactive`).catch((error) => {
        throw error;
      });
      await dispatch('gatherTasks', id);
    },

    async deleteTask({ dispatch, getters }, payload) {
      const id = getters.getActiveId;
      await api.delete(`/squad/${id}/task/${payload}`).catch((error) => {
        throw error;
      });
      await dispatch('gatherTasks', id);
    },
  },
};
