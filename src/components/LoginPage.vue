<template>
  <div>
    <form @submit.prevent="getLoginStatusUser">
      <div class="mb-3">
        <label for="inputUserName" class="form-label"
          >User Name <span style="color: crimson">*</span></label
        >
        <input
          type="text"
          class="form-control"
          id="inputUserName"
          v-model="userLogin.userName"
          required
        />
      </div>
      <div class="form-group">
        <label for="password"
          >Password <span style="color: crimson">*</span></label
        >
        <div class="input-group">
          <input
            class="form-control"
            id="password"
            v-model="userLogin.password"
            :type="showPassword ? 'text' : 'password'"
            required
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="showPassword = !showPassword"
            >
              <i
                class="fa"
                :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
              ></i>
            </button>
          </div>
        </div>
      </div>
      <br />
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      userLogin: {
        userName: "",
        password: "",
      },
      isvalid: false,
      errorName: false,
      errorPassword: false,
      password: "",
      showPassword: false,
    };
  },
  computed: {
    ...mapGetters(["getAuthenticationStatus"]),
  },
  methods: {
    ...mapActions(["getLoginStatusApi"]),
    // validateUserName() {
    //   if (this.userLogin.userName.length < 6) {
    //     this.errorName = true;
    //     this.$toasted.show("Username should be more than 6 characters", {
    //       duration: 2000,
    //       position: "bottom-center",
    //     });
    //   } else if (!this.userLogin.userName.match("^[a-zA-Z_][a-zA-Z0-9_]*$")) {
    //     this.errorName = true;
    //     this.$toasted.show("Username should not start with numbers", {
    //       duration: 2000,
    //       position: "bottom-center",
    //     });
    //   } else this.errorName = false;
    //   return this.errorName;
    // },
    getLoginStatusUser() {
      const responseBody = {
        userName: this.userLogin.userName,
        password: this.userLogin.password,
      };
      // this.errorName = this.validateUserName(this.userLogin.userName);
      console.log(responseBody);
      this.$store.dispatch("getLoginStatusApi", {
        userDetails: responseBody,
        success: (res) => {
          this.isvalid = res.data.isvalid;
          if (this.isvalid === true) {
            sessionStorage.setItem("loginStatus", res.data.isvalid);
            sessionStorage.setItem("userId", res.data.userId);
            this.$router.push("/viewProfile");
            this.$toasted.show("Login Successful!!", {
              duration: 2000,
              position: "bottom-center",
            });
          } else if (this.isvalid == false) {
            this.$toasted.show("Incorrect Credentials", {
              duration: 2000,
              position: "bottom-center",
            });
          } else if (this.isvalid == null) {
            this.$toasted.show("No User! Please Sign Up", {
              duration: 2000,
              position: "bottom-center",
            });
          }
          console.log("login Status", res);
        },
        // isvalid: this.isvalid,
      });
    },
  },
};
</script>
