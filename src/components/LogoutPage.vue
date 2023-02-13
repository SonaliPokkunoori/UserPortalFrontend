<template>
  <div>
    <button type="button" class="btn btn-primary" @click="logout">
      Logout
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.removeItem("userId");
      localStorage.removeItem("loginStatus");
      alert("Logout Sucess!!");
      this.$router.push("/signUp");
    },
  },
};
</script>
