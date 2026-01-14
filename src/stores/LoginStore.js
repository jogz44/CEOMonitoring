import { defineStore } from "pinia";
import axios from "axios";
import { api } from "src/boot/axios";

export const useLoginStore = defineStore("LoginStore", {
  state: () => ({
    user: [],
    // isAuthenticated: false,
  }),
  actions: {
    async userlogin(payload) {
       console.log("Payload =", payload);
      try {
        let res = await api.post("/api/auth/login", payload);
        this.user = res.data;
        console.log("data=", this.user);

        return res;
      } catch (error) {
          console.error("Error:", error);
        return 0;

        // Handle the error as needed
      }
    },
  },
  persist: true,
});
