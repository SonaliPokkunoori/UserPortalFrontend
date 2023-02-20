import axios from "axios";
export default {
  state: {
    isvalid: !!sessionStorage.getItem("loginStatus"),
    userId: "",
  },
  getters: {
    getLoginStatus: (state) => state.isvalid,
    getUserId: (state) => state.userId,
  },
  actions: {
    getLoginStatusApi: ({ commit }, { success, userDetails }) => {
      axios
        .post("/api/kafkaUser/getLoginStatus", userDetails)
        .then((response) => {
          console.log(response);
          commit("setLoginStatus", response.data.isvalid);
          commit("setUserId", response.data.userId);
          success && success(response);
        });
    },
  },
  mutations: {
    setLoginStatus: (state, value) => (state.isvalid = value),
    setUserId: (state, value) => (state.userId = value),
  },
};
