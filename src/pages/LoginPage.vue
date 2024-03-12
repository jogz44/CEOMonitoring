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
  data: function () {
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
    return {
      showNotif() {
        $q.notify({
          icon: "error",
          color: "negative",
          message: "Login Failed",
          position: "center",
          timeout: "1000",
        });
      },
      showLoading() {
        $q.loading.show({
          message: "Please Wait",
        });
      },
      hideLoading() {
        $q.loading.hide();
      },
    };
  },

  methods: {
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },
    next() {
      this.$refs["password"].focus();
    },
    short(val) {
      return (val && val.length > 5) || "UserId must be 6 digits ex:`011790`";
    },
    required(val) {
      return (val && val.length > 0) || "Field must be filled in";
    },
    submit() {
      this.$refs.username.validate();
      this.$refs.password.validate();
      if (!this.$refs.username.hasError && !this.$refs.password.hasError) {
        // this.showLoading();
        const store = useLoginStore();
        const data = new FormData();
        data.append("username", this.username);
        data.append("password", this.Password);

        store.userlogin(this.userlogin).then((res) => {
          if (res.status === 200) {
            this.UserCredentials = res.data.Credentials;
            // console.log("Credentials =>", this.UserCredentials)
            this.$router.push("/main");
          } else {
            console.log("failed!");
            this.showNotif();
          }
        });
      }
    },
  },
});
</script>
