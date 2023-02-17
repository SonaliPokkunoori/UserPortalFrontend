export default {
  state: {
    userDetails: [],
    userId: "",
  },
  getters: {
    getUserDetails: (state) => state.userDetails,
    getUserIdProfile: (state) => state.userId,
  },
  mutations: {
    setUserDetails: (state, value) => (state.userDetails = value),
  },
  actions: {
    getUserDetailsApi: ({ commit }, { success, userId }) => {
      console.log(userId);
      fetch(`/api/kafkaUser/getUserDetails/${userId}`)
        .then((resp) => resp.json())
        .then((response) => {
          console.log("view details", response);
          commit("setUserDetails", response);
          success && success(response);
        });
    },
  },
};
