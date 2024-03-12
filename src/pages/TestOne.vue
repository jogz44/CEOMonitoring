<template>
  <div id="q-app">
    <q-layout view="lHh Lpr fff">
      <q-page-container>
        <q-page
          class="window-height window-width row justify-center items-center"
        >
          <div class="column q-pa-lg">
            <div class="row">
              <q-card
                square
                class="shadow-24"
                style="width: 400px; height: auto"
              >
                <q-card-section>
                  <div class="column items-center">
                    <img
                      src="../assets/imgs/logo.png"
                      alt="Tagum City"
                      style="height: 50%; width: 50%"
                    />
                  </div>

                  <div style="font-size: small" class="q-my-md text-center">
                    {{ title }}
                  </div>
                  <div
                    style="
                      font-size: x-large;
                      font-family: Arial, Helvetica, sans-serif;
                      font-weight: 600;
                    "
                    class="q-my-md text-center"
                  >
                    MONITORING SYSTEM
                  </div>
                </q-card-section>
                <q-card-section>
                  <q-form class="q-px-md">
                    <q-input
                      ref="username"
                      filled
                      dense
                      clearable
                      v-model="userlogin.Username"
                      lazy-rules
                      :rules="[this.required]"
                      type="username"
                      label="Username"
                      @keydown.enter.prevent="next()"
                    >
                      <template v-slot:prepend>
                        <q-icon name="person" />
                      </template>
                    </q-input>
                    <q-input
                      class="q-mt-sm"
                      ref="password"
                      filled
                      dense
                      clearable
                      v-model="userlogin.Password"
                      :type="passwordFieldType"
                      lazy-rules
                      :rules="[this.required]"
                      label="Password"
                      @keydown.enter.prevent="submit()"
                    >
                      <template v-slot:prepend>
                        <q-icon name="lock" />
                      </template>
                      <template v-slot:append>
                        <q-icon
                          :name="visibilityIcon"
                          @click="switchVisibility()"
                          class="cursor-pointer"
                        />
                      </template>
                    </q-input>
                  </q-form>
                </q-card-section>

                <q-card-actions class="q-px-lg">
                  <q-btn
                    unelevated
                    size="md"
                    color="green-10"
                    @click="submit()"
                    class="full-width text-white q-pa-"
                    :label="btnLabel"
                  />
                </q-card-actions>
                <q-card-section class="text-center q-pa-sm"> </q-card-section>
              </q-card>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { useLoginStore } from "../stores/LoginStore";
import { defineComponent } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  data() {
    return {
      title: "City Engineering Office",
      passwordFieldType: "password",
      btnLabel: "LOGIN",
      visibility: false,
      visibilityIcon: "visibility",
      userlogin: {
        Username: "",
        Password: "",
      },
      UserCredentials: [{}],
    };
  },
  setup() {
    const $q = useQuasar();
    //
    return {
      // showNotif() {
      //   $q.notify({
      //     icon: "error",
      //     color: "negative",
      //     message: "Login Failed",
      //     position: "center",
      //     timeout: "1000",
      //   });
      // },
      // showLoading() {
      //   $q.loading.show({
      //     message: "Please Wait",
      //   });
      // },
      // hideLoading() {
      //   $q.loading.hide();
      // },
    };
  },
  methods: {
    // switchVisibility() {
    //   this.visibility = !this.visibility;
    //   this.passwordFieldType = this.visibility ? "text" : "password";
    //   this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    // },
    next() {
      this.$refs["password"].focus();
    },
    short(val) {
      return (val && val.length > 5) || "UserId must be 6 digits ex:`011790`";
    },
    required(val) {
      return (val && val.length > 0) || "Field must be filled in";
    },
    // login() {
    //   // You can add your login logic here
    //   console.log("Logged in with:", this.username, this.password);
    //   // if (this.username === "yourUsername" && this.password === "yourPassword") {
    //   //   this.$router.push("/dashboard");
    //   // }
    //   this.$router.push("/main");
    // },
    submit() {
      this.$refs.username.validate();
      this.$refs.password.validate();
      if (!this.$refs.username.hasError && !this.$refs.password.hasError) {
        // this.showLoading();
        const store = useLoginStore();
        // const data = new FormData();
        // data.append("username", this.username);
        // data.append("password", this.password);

        store.userlogin(this.userlogin).then((res) => {
          if (res.status === 200) {
            this.UserCredentials = res.data.Credentials;
            // console.log("Credentials =>", this.UserCredentials)
            this.$router.push("/main");
          }
          // this.hideLoading();

          //   $q.notify({
          //   icon: 'done',
          //   color: 'positive',
          //   message: 'Авторизация'
          // })
          // this.showNotif();

          // console.log("Success!")
        });
      }
    },
  },
});
</script>

<!-- Old LoginPage

<template>
  <q-layout>
    <q-header elevated class="bg-secondary text-white q-pa-lg">
      ENGINEERING SYSTEM
    </q-header>
    <q-page-container>
      <q-page class="login-page q-pa-md">
        <q-card class="login-card">
          <q-card-section>
            <h2 class="text-h6 text-center">Login Page</h2>
          </q-card-section>
          <q-card-section class="q-pt-sm">
            <q-form class="q-px-sm">
              <q-input
                ref="username"
                filled
                v-model="userlogin.Username"
                label="Username"
                dense
                class="input-field"
                lazy-rules
                type="username"
                :rules="[this.required]"
                @keydown.enter.prevent="next()"
              />

              <q-input
                ref="password"
                filled
                v-model="userlogin.Password"
                label="Password"
                :type="passwordFieldType"
                lazy-rules
                :rules="[this.required]"
                dense
                class="input-field"
                @keydown.enter.prevent="submit()"
              />
            </q-form>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              color="secondary"
              label="Login"
              @click="submit()"
              class="login-btn"
            />
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useLoginStore } from "../stores/LoginStore";
import { defineComponent } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  data() {
    return {
      title: "City Engineering Office",
      passwordFieldType: "password",
      btnLabel: "LOGIN",
      visibility: false,
      visibilityIcon: "visibility",
      userlogin: {
        Username: "",
        Password: "",
      },
      UserCredentials:[{}]
    };
  },
  setup() {
    const $q = useQuasar();
//
    return {
      // showNotif() {
      //   $q.notify({
      //     icon: "error",
      //     color: "negative",
      //     message: "Login Failed",
      //     position: "center",
      //     timeout: "1000",
      //   });
      // },

      // showLoading() {
      //   $q.loading.show({
      //     message: "Please Wait",
      //   });
      // },
      // hideLoading() {
      //   $q.loading.hide();
      // },
    };
  },
  methods: {
    // switchVisibility() {
    //   this.visibility = !this.visibility;
    //   this.passwordFieldType = this.visibility ? "text" : "password";
    //   this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    // },
    next() {
      this.$refs["password"].focus();
    },
    short(val) {
      return (val && val.length > 5) || "UserId must be 6 digits ex:`011790`";
    },
    required(val) {
      return (val && val.length > 0) || "Field must be filled in";
    },
    // login() {
    //   // You can add your login logic here
    //   console.log("Logged in with:", this.username, this.password);
    //   // if (this.username === "yourUsername" && this.password === "yourPassword") {
    //   //   this.$router.push("/dashboard");
    //   // }
    //   this.$router.push("/main");
    // },
    submit() {
      this.$refs.username.validate();
      this.$refs.password.validate();
      if (!this.$refs.username.hasError && !this.$refs.password.hasError) {
        // this.showLoading();
        const store = useLoginStore();
        // const data = new FormData();
        // data.append("username", this.username);
        // data.append("password", this.password);


        store.userlogin(this.userlogin).then((res) => {

           if (res.status === 200 ){

            this.UserCredentials = res.data.Credentials
            // console.log("Credentials =>", this.UserCredentials)
            this.$router.push("/main");
           }
          // this.hideLoading();

            //   $q.notify({
            //   icon: 'done',
            //   color: 'positive',
            //   message: 'Авторизация'
            // })
            // this.showNotif();

            // console.log("Success!")


        });
      }
    },
  },
});
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
</style> -->
