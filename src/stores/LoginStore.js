import { defineStore } from "pinia";
import axios from "axios";

export const useLoginStore = defineStore("LoginStore", {
  state: () => ({
    user: [],
  }),
  actions: {
    async userlogin(payload) {
      // console.log("Payload =", payload);
      try {
        let res = await axios.post(
          "http://10.0.1.23:5000/api/auth/login",
          payload
        );
        this.user = res.data;
        console.log("data=", this.user);

        return res;
      } catch (error) {
        return 0;
        console.error("Error:", error);
        // Handle the error as needed
      }
    },
  },
});
