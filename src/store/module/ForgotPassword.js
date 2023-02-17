import axios from "axios";
export default {
  state: {
    password: "",
    userId: "",
  },
  getters: {
    getNewPassword: (state) => state.password,
    getUserIdPass: (state) => state.userId,
  },
  mutations: {
    setNewPassword: (state, value) => (state.password = value),
  },
  actions: {
    getNewPasswordApi: ({ commit }, { success, userId, password }) => {
      axios
        .post(`/api/kafkaUser/forgotPassword/${userId}/${password}`)
        .then((response) => {
          console.log(response);
          commit("setNewPassword", response.data.password);
          success && success(response);
        });
    },
  },
};
