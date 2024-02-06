import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
import file from "./file";
import rule from "./rule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    file,
    rule,
  },
});
