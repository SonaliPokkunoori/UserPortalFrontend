import axios from "axios";
export default {
  state: {
    isvalid: false,
  },
  getters: {
    getLogoutStatus: (state) => state.isvalid,
  },
  actions: {
    getLogoutStatusApi: ({ commit }, { success, userId }) => {
      axios
        .post(`/api/kafkaUser/getLogoutStatus/${userId}`)
        .then((response) => {
          console.log(response);
          commit("setLogoutStatus", response.data.isvalid);
          success && success(response);
        });
    },
  },
  mutations: {
    setLogoutStatus: (state, value) => (state.isvalid = value),
  },
};
