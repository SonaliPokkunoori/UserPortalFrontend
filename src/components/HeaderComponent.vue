<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">Welcome</a>
        <div v-if="loginStatus">
          <a class="nav-item nav-link" @click="viewProfile">View Profile</a>
          <a class="nav-item nav-link" @click="logout">Logout</a>
        </div>
        <div class="navbar-nav" v-else>
          <a class="nav-item nav-link active" @click="signUp"> Sign Up </a>
          <a class="nav-item nav-link" @click="login">Login</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginStatus: localStorage.getItem("loginStatus"),
    };
  },
  methods: {
    signUp() {
      this.$router.push("/signUp");
    },
    login() {
      this.$router.push("/login");
    },
    viewProfile() {
      this.$router.push("/viewProfile");
    },
    logout() {
      this.$router.push("/logout");
    },
  },
};
</script>
