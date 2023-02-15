<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">Welcome</a>
        <div
          v-if="getAuthenticationStatus"
          class="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-item nav-link" @click="viewProfile">View Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-item nav-link" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
        <div class="navbar-nav" v-else>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-item nav-link active" @click="signUp"> Sign Up </a>
            </li>
            <li class="nav-item">
              <a class="nav-item nav-link" @click="login">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getAuthenticationStatus"]),
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
