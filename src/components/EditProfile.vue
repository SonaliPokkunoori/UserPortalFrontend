<template>
  <div>
    <h3>EDIT</h3>
    <form @submit.prevent="editProfile">
      <div class="mb-3">
        <label for="inputUserName" class="form-label">User Name </label>
        <input
          type="text"
          class="form-control"
          id="inputUserName"
          v-model="userProfile.userName"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <div class="input-group">
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            v-model="userProfile.email"
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
      <div class="form-group">
        <label for="inputPhoneNumber" class="form-label">Phone Number</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="inputPhoneNumber"
            v-model="userProfile.phno"
            required
          />
        </div>
      </div>
      <div class="mb-3">
        <label for="inputMaritalStatus" class="form-label"
          >Marital Status</label
        >
        <br />
        <input
          type="radio"
          name="maritalStatus"
          value="single"
          v-model="userProfile.maritalStatus"
        />Single
        <input
          type="radio"
          value="married"
          name="maritalStatus"
          v-model="userProfile.maritalStatus"
        />Married
      </div>
      <div class="mb-3">
        <label for="inputDateOfBirth" class="form-label">Date Of Birth</label>
        <input
          type="date"
          class="form-control"
          id="inputDateOfBirth"
          v-model="userProfile.dob"
        />
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      password: "",
      showPassword: "",
      userProfile: {
        userId: "",
        userName: "",
        password: "",
        email: "",
        dob: "",
        phno: "",
        maritalStatus: "",
        isvalid: true,
      },
    };
  },
  computed: {
    ...mapGetters(["getUserDetails"]),
  },
  created() {
    this.userProfile.userId = sessionStorage.getItem("userId");
    console.log(this.userProfile.userId);
    this.$store.dispatch("getUserDetailsApi", {
      userId: this.userProfile.userId,
      success: (res) => {
        console.log("Fetched user details from store", res);
        this.userProfile.userName = res.userName;
        this.userProfile.email = res.email;
        this.userProfile.dob = res.dob;
        this.userProfile.phno = res.phno;
        this.userProfile.maritalStatus = res.maritalStatus;
        this.userProfile.password = res.password;
      },
    });
    console.log(this.userProfile);
  },
  methods: {
    editProfile() {
      const requestBody = {
        userId: this.userProfile.userId,
        userName: this.userProfile.userName,
        password: this.userProfile.password,
        email: this.userProfile.email,
        dob: this.userProfile.dob,
        maritalStatus: this.userProfile.maritalStatus,
        phno: this.userProfile.phno,
        isvalid: true,
      };
      axios
        .post("/api/kafkaUser/editProfile", requestBody)
        .then((response) => {
          console.log(response);
          this.$toasted.show("Saved your changes!", {
            duration: 2000,
            position: "bottom-center",
          });
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push("/viewProfile");
    },
  },
};
</script>
