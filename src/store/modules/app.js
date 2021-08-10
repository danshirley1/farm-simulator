import axios from 'axios';
import * as types from '../types';
import constants from '@/constants';

const initialState = () => ({});

const api = axios.create({ baseURL: constants.API.ENDPOINT });

export default {
  namespaced: true,
  state: initialState(),
  actions: {
    async testBackend({ commit }) {
      console.log('starting backend test!');

      await api.post('/test', { message: 'Hello world!' });

      commit(types.APP_BACKEND_TEST_WORKED);
    },
  },
  mutations: {
    [types.APP_BACKEND_TEST_WORKED]() {
      console.log('backend test worked!');
    },
  },
};
