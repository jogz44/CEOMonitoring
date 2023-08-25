<template>
  <q-layout>
    <q-header elevated class="bg-secondary text-white q-pa-lg"> ENGINEERING SYSTEM </q-header>
    <q-page-container>
      <q-page class="login-page q-pa-md">
        <q-card class="login-card">
          <q-card-section>
            <h2 class="text-h6 text-center">Login Page</h2>
          </q-card-section>
          <q-card-section class="q-pt-sm">
            <q-input
              filled
              v-model="username"
              label="Username"
              dense
              class="input-field"
            />
          </q-card-section>
          <q-card-section>
            <q-input
              filled
              v-model="password"
              label="Password"
              type="password"
              dense
              class="input-field"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              color="secondary"
              label="Login"
              @click="login"
              class="login-btn"
            />
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // You can add your login logic here
      console.log("Logged in with:", this.username, this.password);
      // if (this.username === "yourUsername" && this.password === "yourPassword") {
      //   this.$router.push("/dashboard");
      // }
      this.$router.push("/main");
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  max-width: 400px;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.text-center {
  text-align: center;
}

.input-field {
  width: 100%;
}

.login-btn {
  width: 100%;
}
</style>
