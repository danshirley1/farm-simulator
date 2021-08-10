import axios from 'axios';
import * as types from '../types';
import constants from '@/constants';

const initialState = () => ({
  isFormSubmissionInProgress: false,
});

const api = axios.create({ baseURL: constants.API.ENDPOINT });

export default {
  namespaced: true,
  state: initialState(),
  actions: {
    async doSubmitDataEntryForm({ commit }, data) {
      commit(types.DATA_ENTRY_SET_SUBMISSION_IN_PROGRESS, true);

      console.log('action, for data:', data);

      await api.post('/test', { message: 'Hello world!' });

      commit(types.DATA_ENTRY_SET_SUBMISSION_IN_PROGRESS, false);
    },
  },
  mutations: {
    [types.DATA_ENTRY_SET_SUBMISSION_IN_PROGRESS](state, data) {
      Object.assign(state, { isFormSubmissionInProgress: data });
    },
  },
};
