import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

const vuexStore = process.env.NODE_ENV === 'testing'
  ? new Vuex.Store({})
  : new Vuex.Store({
    modules,
    plugins: [],
    strict: process.env.NODE_ENV !== 'production',
  });

export default vuexStore;
