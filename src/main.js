import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import Toasted from "vue-toasted";

Vue.config.productionTip = false;

Vue.use(Toasted, {
  duration: 2000,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
