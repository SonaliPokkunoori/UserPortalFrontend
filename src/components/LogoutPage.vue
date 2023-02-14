<template>
  <div>
    <button type="button" class="btn btn-primary" @click="logout">
      Logout
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userId: sessionStorage.getItem("userId"),
    };
  },
  methods: {
    logout() {
      axios
        .post(`/api/kafkaUser/getLogoutStatus/${this.userId}`)
        .then((response) => {
          console.log(response);
          if (response.data == true) {
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("loginStatus");
          } else {
            console.log("no logged user");
          }
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
