<template>
  <div>
    <h2>WELCOME {{ userName }}</h2>
    <!-- <button class="btn btn-primary" @click.prevent="getDetails()">
      View Profile
    </button> -->
    <br />
    <label for="userName" class="form-label">User Name: {{ userName }}</label>
    <br />
    <label for="email" class="form-label">Email : {{ email }}</label> <br />
    <label for="phoneNumber" class="form-label">Phone Number: {{ phno }}</label>
    <br />
    <label for="maritalStatus" class="form-label"
      >Marital Status: {{ maritalStatus }}</label
    >
    <br />
    <label for="dateOfBirth" class="form-label">Date Of Birth: {{ dob }}</label
    ><br />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userName: "",
      userId: "",
      email: "",
      phno: "",
      maritalStatus: "",
      dob: "",
    };
  },
  created() {
    // this.userName = localStorage.getItem("userName");
    this.userId = sessionStorage.getItem("userId");
    console.log(this.userId);
    axios
      .get(`/api/kafkaUser/getUserDetails/${this.userId}`)
      .then((response) => {
        console.log(response);
        this.userName = response.data.userName;
        this.email = response.data.email;
        this.dob = response.data.dob;
        this.phno = response.data.phno;
        this.maritalStatus = response.data.maritalStatus;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style></style>
