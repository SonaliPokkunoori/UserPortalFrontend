<template>
  <div>
    <form @submit.prevent="getLoginStatus">
      <div class="mb-3">
        <label for="inputUserName" class="form-label">User Name</label>
        <input
          type="text"
          class="form-control"
          id="inputUserName"
          v-model="userLogin.userName"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="userLogin.password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userLogin: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    getLoginStatus() {
      const responseBody = {
        userName: this.userLogin.userName,
        password: this.userLogin.password,
      };
      console.log(responseBody);
      axios
        .post("/api/kafkaUser/getLoginStatus", responseBody)
        .then((response) => {
          console.log(response);
          if (response.data.isvalid == true) {
            localStorage.setItem("loginStatus", response.data.isvalid);
            localStorage.setItem("userId", response.data.userId);
            alert("Login Success!!");
            this.$router.push("/viewProfile");
          } else {
            alert("Incorrect Credentials");
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
  },
};
</script>
