import Vue from "vue";
import Vuex from "vuex";
import Authentication from "./module/Authentication.js";
import ViewProfile from "./module/ViewProfile.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Authentication, ViewProfile },
});
