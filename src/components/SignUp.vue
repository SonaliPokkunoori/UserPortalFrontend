<template>
  <div>
    <form @submit.prevent="addDataToDB">
      <div class="mb-3">
        <label for="inputUserName" class="form-label">User Name</label>
        <input
          type="text"
          class="form-control"
          id="inputUserName"
          v-model="user.userName"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          v-model="user.email"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="user.password"
        />
      </div>
      <div class="mb-3">
        <label for="inputPhoneNumber" class="form-label">Phone Number</label>
        <input
          type="text"
          class="form-control"
          id="inputPhoneNumber"
          v-model="user.phno"
        />
      </div>
      <div class="mb-3">
        <label for="inputMaritalStatus" class="form-label"
          >Marital Status</label
        >
        <br />
        <input type="radio" value="single" v-model="user.maritalStatus" />Single
        <input
          type="radio"
          value="married"
          v-model="user.maritalStatus"
        />Married
      </div>
      <div class="mb-3">
        <label for="inputDateOfBirth" class="form-label">Date Of Birth</label>
        <input
          type="date"
          class="form-control"
          id="inputDateOfBirth"
          v-model="user.dob"
        />
      </div>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        userName: "",
        password: "",
        email: "",
        phno: "",
        maritalStatus: "",
        dob: "",
        userId: "",
      },
    };
  },
  methods: {
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
      //   const res = axios.post(
      //     "/http://localhost:8080/kafkaUser/addUserDetails",
      //     requestBody
      //   );
      //   console.log(res);
      axios
        .post("/api/kafkaUser/addUserDetails", requestBody)
        .then((response) => {
          console.log(response);
          //   localStorage.setItem("userName", response.data.userName);
          sessionStorage.setItem("userId", response.data.userId);
          //   console.log(this.userName);
          alert("Data Added!!");
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    },
  },
};
</script>

<style></style>
