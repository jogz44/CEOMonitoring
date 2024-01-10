import { defineStore } from "pinia";
import axios from "axios";

export const useStoreUserInfo = defineStore("userinfo", {
  state: () => ({
    users: [],
    user: [],
    usersCount: 0,
    creds: [],
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

    // FOR CREDENTAILS
    async AddCred(id, payload) {
      try {
        const response = await axios.post(
          "http://10.0.1.23:5000/api/Users/usr/" + id + "/creds", payload
        );
         this.creds.push(response.data);
      } catch (error ){
        console.log(`Error fetching creds: ${error}`);
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

    async GetUserCredentials(id) {
      console.log("getuser=", id);
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Users/` + id + `/creds`
        );
        this.user = response.data;
        // console.log("store=",this.user)
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },

    async GetUser(id) {
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Users/` + id
        );
        this.user = response.data;
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },

    // Specific User Credential
    async GetUserCredentialsSpec(id, cid) {
      console.log("getuser=", id);
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Users/` + id + `/creds/` + cid
        );
        this.creds = response.data;
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },

    async UpdateCredentialsSpec(id, cid, payload) {
      console.log("getuser4UPDT=", id);
      try {
        const response = await axios.put(
          `http://10.0.1.23:5000/api/Users/` + id + `/creds/` + cid,payload
        );
        this.creds = response.data;
        console.log("Updated successfully:", this.creds);
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },

    async DeleteCredentialsSpec(id, cid) {
      console.log("getuser4UPDT=", id);
      try {
        const response = await axios.delete(
          `http://10.0.1.23:5000/api/Users/` + id + `/creds/` + cid
        );
       this.creds = response.data;
        console.log("Credential Deleted successfully:", this.creds);
        // alert(`Credential Deleted successfully`)
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },


  },
});
