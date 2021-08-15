import axios from 'axios';
import * as types from '../types';
import constants from '@/../constants';

const initialState = () => ({
  isFormSubmissionInProgress: false,
  completedCalculation: null,
});

const api = axios.create({ baseURL: constants.API.ENDPOINT });

export default {
  namespaced: true,
  state: initialState(),
  actions: {
    clear({ commit }) {
      commit(types.DATA_ENTRY_CLEAR);
    },
    async doSubmitDataEntryForm({ commit }, data) {
      commit(types.DATA_ENTRY_SET_SUBMISSION_IN_PROGRESS, true);

      const result = await api.post('/test', { data });

      commit(types.DATA_ENTRY_SET_COMPLETED_CALCULATION, result.data);
      commit(types.DATA_ENTRY_SET_SUBMISSION_IN_PROGRESS, false);
    },
  },
  mutations: {
    [types.DATA_ENTRY_CLEAR](state) {
      Object.assign(state, initialState());
    },
    [types.DATA_ENTRY_SET_COMPLETED_CALCULATION](state, data) {
      Object.assign(state, { completedCalculation: data });
    },
    [types.DATA_ENTRY_SET_SUBMISSION_IN_PROGRESS](state, data) {
      Object.assign(state, { isFormSubmissionInProgress: data });
    },
  },
};
