<template>
  <div>
    <h3>Forgot Password!?? :(</h3>
    <form @submit.prevent="newPassword">
      <div class="form-group">
        <label for="password"
          >New Password <span style="color: crimson">*</span></label
        >
        <div class="input-group">
          <input
            class="form-control"
            id="password"
            v-model="forgotPassword.password"
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
      <div class="form-group">
        <label for="confirmPassword"
          >Confirm Password <span style="color: crimson">*</span></label
        >
        <div class="input-group">
          <input
            class="form-control"
            id="confirmPassword"
            v-model="forgotPassword.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            required
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <i
                class="fa"
                :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"
              ></i>
            </button>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Save Password</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      forgotPassword: {
        password: "",
        confirmPassword: "",
      },
      errorPassword: false,
      errorConfirmPassword: false,
      passowrd: "",
      showPassword: "",
      showConfirmPassword: "",
      userId: sessionStorage.getItem("userId"),
    };
  },
  computed: {
    ...mapGetters(["getNewPassword"]),
  },
  methods: {
    validatePassword() {
      if (this.forgotPassword.password.length < 8) {
        this.errorPassword = true;
        this.$toasted.show("Password must contain more than 8 characters", {
          duration: 2000,
          position: "bottom-center",
        });
      } else if (
        !this.forgotPassword.password.match(
          "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]*$"
        )
      ) {
        this.errorPassword = true;
        this.$toasted.show("Please enter a strong password", {
          duration: 2000,
          position: "bottom-center",
        });
      } else this.errorPassword = false;
      return this.errorPassword;
    },
    validateConfirmPassword() {
      if (
        this.forgotPassword.confirmPassword !== this.forgotPassword.password
      ) {
        this.errorConfirmPassword = true;
        this.$toasted.show("Confirm Password doesnot match new Password", {
          duration: 2000,
          position: "bottom-center",
        });
      } else this.errorConfirmPassword = false;
      return this.errorConfirmPassword;
    },
    newPassword() {
      console.log("userId at forgot password", this.userId);
      this.errorPassword = this.validatePassword(this.forgotPassword.password);
      this.errorConfirmPassword = this.validateConfirmPassword(
        this.forgotPassword.confirmPassword
      );
      if (!this.errorPassword && !this.errorConfirmPassword) {
        this.$store.dispatch("getNewPasswordApi", {
          userId: this.userId,
          password: this.forgotPassword.password,
          success: (res) => {
            console.log("Forgot password Api response: ", res);
            if (res.data.userId != null) {
              this.$toasted.show("Your password is Updated!!", {
                duration: 2000,
                position: "bottom-center",
              });
            }
          },
        });
        this.$router.push("/viewProfile");
      }
    },
  },
};
</script>
