import { defineStore } from "pinia";
import axios from "axios";

export const useStoreUserInfo = defineStore("userinfo", {
  state: () => ({
    users: [],
    user: [],
    usersCount: 0,
  }),

  actions: {
    async fetchUser() {
      try {
        const response = await axios.get("http://10.0.1.23:5000/api/Users/");

        this.users = response.data;
        this.usersCount = response.data.length;
        console.log("res=", this.users);
        console.log("count =>", this.usersCount);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async AddUser(payload) {
      try {
        const response = await axios.post(
          "http://10.0.1.23:5000/api/Users/",
          payload
        );

        this.users.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    async DeleteUser(id) {
      try {
        await axios.delete(`http://10.0.1.23:5000/api/Users/` + id);
        this.users = this.users.filter((e) => e.id !== id);
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    async UpdateUser(id, payload) {
      try {
        const response = await axios.put(
          `http://10.0.1.23:5000/api/Users/` + id,
          payload
        );
        const index = this.user.findIndex((e) => e._id === payload._id);
        if (index !== -1) {
          this.user[index] = response.data;
        }
      } catch (error) {
        console.log(`Cannot Update ${error}`);
      }
    },

    async GetUser(id) {
      console.log("getuser=", id);
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Users/` + id
        );
        this.user = response.data;
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },
  },
});
