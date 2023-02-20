<template>
  <div>
    <h2>WELCOME {{ userProfile.userName }}</h2>
    <!-- <button class="btn btn-primary" @click.prevent="getDetails()">
      View Profile
    </button> -->
    <br />
    <label for="userName" class="form-label"
      >User Name: {{ userProfile.userName }}</label
    >
    <br />
    <label for="email" class="form-label"
      >Email : {{ userProfile.email }}</label
    >
    <br />
    <label for="phoneNumber" class="form-label"
      >Phone Number: {{ userProfile.phno }}</label
    >
    <br />
    <label for="maritalStatus" class="form-label"
      >Marital Status: {{ userProfile.maritalStatus }}</label
    >
    <br />
    <label for="dateOfBirth" class="form-label"
      >Date Of Birth: {{ userProfile.dob }}</label
    ><br /><br />
    <div class="divButtons">
      <button class="btn btn-secondary" @click="newPassword">
        Forgot Password!?
      </button>
      <button class="btn btn-primary" @click="editProfile">
        Edit your Profile
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      userProfile: {
        userName: "",
        userId: "",
        email: "",
        phno: "",
        maritalStatus: "",
        dob: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUserDetails"]),
  },
  created() {
    // this.userName = localStorage.getItem("userName");
    this.userProfile.userId = sessionStorage.getItem("userId");
    // console.log(this.userId);
    // axios
    //   .get(`/api/kafkaUser/getUserDetails/${this.userId}`)
    //   .then((response) => {
    //     console.log(response);
    //     this.userName = response.data.userName;
    //     this.email = response.data.email;
    //     this.dob = response.data.dob;
    //     this.phno = response.data.phno;
    //     this.maritalStatus = response.data.maritalStatus;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    this.$store.dispatch("getUserDetailsApi", {
      userId: this.userProfile.userId,
      success: (res) => {
        console.log("Fetched user details from store", res);
        this.userProfile.userName = res.userName;
        this.userProfile.email = res.email;
        this.userProfile.dob = res.dob;
        this.userProfile.phno = res.phno;
        this.userProfile.maritalStatus = res.maritalStatus;
      },
    });
  },
  methods: {
    editProfile() {
      this.$router.push("/editProfile");
    },
    newPassword() {
      this.$router.push("/forgotPassword");
    },
  },
};
</script>

<style></style>
