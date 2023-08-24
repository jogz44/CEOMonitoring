<template>
  <div
    class="q-pa-md"
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    "
  >
    <q-card style="min-width: 500px">
      <q-card-section>
        <h2 class="text-h6">Login</h2>
      </q-card-section>
      <q-card-section>
        <q-input dense outlined v-model="username" label="Username"></q-input>
      </q-card-section>
      <q-card-section>
        <q-input
          outlined
          v-model="password"
          label="Password"
          type="password"
          dense
        ></q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="Login" @click="login"></q-btn>
      </q-card-actions>
    </q-card>
  </div>
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
    },
  },
};
</script>
