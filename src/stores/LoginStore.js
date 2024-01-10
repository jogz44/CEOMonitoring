import { defineStore } from 'pinia';
import axios from 'axios';

export const useLoginStore = defineStore("LoginStore", {
  state: () => ({

  }),
  actions: {
    async userlogin (payload) {
      let res = await axios.post (
        `http://10.0.1.23`
      )
    }
  }
})
