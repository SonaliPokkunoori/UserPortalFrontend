import Vue from "vue";
import Vuex from "vuex";
import Authentication from "./module/Authentication.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Authentication },
});
