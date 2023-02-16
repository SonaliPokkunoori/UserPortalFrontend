<template>
  <div>
    <form @submit.prevent="addDataToDB">
      <div class="mb-3">
        <label for="inputUserName" class="form-label"
          >User Name <span style="color: crimson"> * </span></label
        >
        <input
          type="text"
          class="form-control"
          id="inputUserName"
          v-model="user.userName"
          required
        />
        <!-- pattern="[a-zA-Z_][a-zA-Z0-9_].{4,}" -->
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1" class="form-label"
          >Email<span style="color: crimson"> * </span></label
        >
        <div class="input-group">
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            v-model="user.email"
            required
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              style="font-size: 15px"
            >
              <i class="material-icons" style="font-size: 18px">email</i>
            </button>
          </div>
        </div>
      </div>
      <!-- pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[!@#$%^&*+`~=?\|<>/]).{8,}" -->
      <!-- <div class="form-group">
        <label for="password"
          >Password<span style="color: crimson"> * </span></label
        >
        <div class="input-group">
          <input
            class="form-control"
            id="password"
            v-model="password"
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
      </div> -->
      <div class="mb-3">
        <label for="inputPassword" class="form-label"
          >Password <span style="color: crimson"> * </span></label
        >
        <input
          type="text"
          class="form-control"
          id="inputPassword"
          v-model="user.password"
          required
        />
      </div>
      <div class="form-group">
        <label for="inputPhoneNumber" class="form-label"
          >Phone Number<span style="color: crimson"> * </span></label
        >
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="inputPhoneNumber"
            v-model="user.phno"
            required
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="show = !show"
            >
              <i class="fa" :class="'fa fa-phone'"></i>
              <VueNumericKeypad
                :value.sync="value"
                :show.sync="show"
                :options="options"
              />
            </button>
          </div>
        </div>
        <!-- pattern="[6-9][0-9]{9}" -->
      </div>
      <div class="mb-3">
        <label for="inputMaritalStatus" class="form-label"
          >Marital Status<span style="color: crimson"> * </span></label
        >
        <br />
        <input
          type="radio"
          name="maritalStatus"
          value="single"
          v-model="user.maritalStatus"
          required
        />Single
        <input
          type="radio"
          value="married"
          name="maritalStatus"
          v-model="user.maritalStatus"
        />Married
      </div>
      <div class="mb-3">
        <label for="inputDateOfBirth" class="form-label"
          >Date Of Birth<span style="color: crimson"> * </span></label
        >
        <input
          type="date"
          class="form-control"
          id="inputDateOfBirth"
          v-model="user.dob"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import VueNumericKeypad from "vue-numeric-keypad";

export default {
  data() {
    return {
      value: "",
      show: 0,
      options: {
        keyRandomize: true,
        randomizeClick: true,
        fixDeleteKey: false,
      },
      user: {
        userName: "",
        password: "",
        email: "",
        phno: "",
        maritalStatus: "",
        dob: "",
        userId: "",
      },
      errorName: false,
      errorPhno: false,
      errorPassword: false,
      errorDob: false,
      password: "",
      showPassword: false,
    };
  },
  components: {
    VueNumericKeypad,
  },
  methods: {
    validateUserName() {
      if (this.user.userName.length < 6) {
        this.errorName = true;
        this.$toasted.show("Username should be more than 6 characters", {
          duration: 2000,
          position: "bottom-center",
        });
      } else if (!this.user.userName.match("^[a-zA-Z_][a-zA-Z0-9_]*$")) {
        this.errorName = true;
        this.$toasted.show("Username should not start with numbers", {
          duration: 2000,
          position: "bottom-center",
        });
      } else this.errorName = false;
      return this.errorName;
    },
    validatePhoneNumber() {
      if (this.user.phno.length != 10) {
        this.errorPhno = true;
        this.$toasted.show("Phone Number must contain 10 digits", {
          duration: 2000,
          position: "bottom-center",
        });
      } else if (!this.user.phno.match("^[6-9][0-9]*$")) {
        this.errorPhno = true;
        this.$toasted.show("Phone Number must start with 6/7/8/9", {
          duration: 2000,
          position: "bottom-center",
        });
      } else this.errorPhno = false;
      return this.errorPhno;
    },
    validatePassword() {
      if (this.user.password.length < 8) {
        this.errorPassword = true;
        this.$toasted.show("Password must contain more than 8 characters", {
          duration: 2000,
          position: "bottom-center",
        });
      } else if (
        !this.user.password.match(
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
    validateDOB() {
      const today = new Date();
      console.log(today);
      const dateOfBirth = new Date(this.user.dob);
      console.log(dateOfBirth);
      if (dateOfBirth >= today) this.errorDob = true;
      else this.errorDob = false;
      return this.errorDob;
    },
    addDataToDB() {
      const requestBody = {
        userName: this.user.userName,
        email: this.user.email,
        password: this.user.password,
        phno: this.user.phno,
        maritalStatus: this.user.maritalStatus,
        dob: this.user.dob,
      };
      console.log(requestBody);
      this.errorName = this.validateUserName(requestBody.userName);
      this.errorPhno = this.validatePhoneNumber(requestBody.phno);
      this.errorPassword = this.validatePassword(requestBody.password);
      this.errorDob = this.validateDOB(requestBody.dob);
      console.log("at dob" + this.error);
      if (this.errorDob) {
        this.$toasted.show("Please enter valid date of birth", {
          duration: 2000,
          position: "bottom-center",
        });
      }
      console.log(
        " Name " +
          this.errorName +
          " Phone Number " +
          this.errorPhno +
          " Password " +
          this.errorPassword +
          " DOB " +
          this.errorDob
      );
      if (
        !this.errorName &&
        !this.errorPhno &&
        !this.errorPassword &&
        !this.errorDob
      ) {
        axios
          .post("/api/kafkaUser/addUserDetails", requestBody)
          .then((response) => {
            console.log(response);
            if (response.data == "") {
              this.$toasted.show(
                "Username already exists! Please select a unique username",
                {
                  duration: 2000,
                  position: "bottom-center",
                }
              );
            } else {
              //   localStorage.setItem("userName", response.data.userName);
              sessionStorage.setItem("userId", response.data.userId);
              //   console.log(this.userName);
              this.$toasted.show("Data added", {
                duration: 2000,
                position: "bottom-center",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }
    },
  },
};
</script>

<style></style>
