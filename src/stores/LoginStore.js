import { defineStore } from "pinia";
import axios from "axios";

export const useLoginStore = defineStore("LoginStore", {
  state: () => ({}),
  actions: {
    async userlogin (payload) {
      console.log("Payload =", payload)
      try {
        let res = await axios.post(`http://10.0.1.23:94/api/auth/login`, payload);
        console.log("data=", res.data);
      } catch (error) {
        console.error("Error:", error);
        // Handle the error as needed
      }
    }
  },
});
