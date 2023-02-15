import axios from "axios";
export default {
  state: {
    isvalid: !!sessionStorage.getItem("loginStatus"),
    userId: "",
  },
  getters: {
    getAuthenticationStatus: (state) => state.isvalid,
    // getLoginStatus: (state) => state.isvalid,
    getUserId: (state) => state.userId,
  },
  actions: {
    getLogoutStatusApi: ({ commit }, { success, userId }) => {
      axios
        .post(`/api/kafkaUser/getLogoutStatus/${userId}`)
        .then((response) => {
          console.log(response);
          commit("setAuthenticationStatus", response.data.isvalid);
          success && success(response);
        });
    },
    getLoginStatusApi: ({ commit }, { success, userDetails }) => {
      axios
        .post("/api/kafkaUser/getLoginStatus", userDetails)
        .then((response) => {
          console.log(response);
          commit("setAuthenticationStatus", response.data.isvalid);
          commit("setUserId", response.data.userId);
          success && success(response);
        });
    },
  },
  mutations: {
    // setLogoutStatus: (state, value) => (state.isvalid = value),
    setAuthenticationStatus: (state, value) => (state.isvalid = value),
    setUserId: (state, value) => (state.userId = value),
  },
};
