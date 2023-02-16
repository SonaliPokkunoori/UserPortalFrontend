<template>
  <div>
    <button type="button" class="btn btn-primary" @click="logout">
      Logout
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      userId: sessionStorage.getItem("userId"),
    };
  },
  computed: {
    ...mapGetters(["getAuthenticationStatus"]),
  },
  methods: {
    ...mapActions(["getLogoutStatusApi"]),
    logout() {
      this.$store.dispatch("getLogoutStatusApi", {
        userId: this.userId,
        success: (res) => {
          this.isvalid = res.data.isvalid;
          if (res.data == true) {
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("loginStatus");
          } else if (res.data == false) {
            console.log("no logged user");
          } else if (res.data == "") {
            console.log("No user");
          }
          console.log("logout status", res);
        },
      });

      //   alert("Logout Success!!");
      this.$toasted.show("Logout Success!!", {
        duration: 3000,
        position: "bottom-center",
        // onComplete: () => {
        //   location.reload();
        // },
      });
      //   setTimeout(() => {
      //     location.reload();
      //   }, 1000);
      this.$router.push("/signUp");
    },
  },
};
</script>
