import { defineStore } from "pinia";
import axios from "axios";

export const useStorePersonnelInfo = defineStore("personnelinfo", {
  state: () => ({
    personnels: [],
  }),

  actions: {
    async fetchPersonnel() {
      try {
        const response = await axios.get(
          "http://10.0.1.23:5000/api/Personnels/"
        );

        this.personnels = response.data;
        console.log("res=", this.personnels);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    async AddPersonnel(payload) {
      try {
        const response = await axios.post(
          "http://10.0.1.23:5000/api/Personnels/",
          payload
        );
        this.personnels.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    async GetPersonnel(id) {
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Personnels/${id}`,
          payload
        );
        this.personnels = response.data;
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    async DeletePersonnel(id) {
      try {
        await axios.delete(
          `http://10.0.1.23:5000/api/Personnels/${id}`,
          payload
        );
        this.personnels = this.personnels.filter((e) => e.id !== id);
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    async UpdatePersonnel(payload) {
      try {
        const response = await this.$axios.put(
          `http://10.0.1.23:5000/api/Personnels/${payload._id}`,
          payload
        );
        const index = this.personnels.findIndex((e) => e._id === payload._id);
        if (index !== -1) {
          this.personnels[index] = response.data;
        }
      } catch (error) {
        console.log(`Cannot Update ${error}`);
      }
    },
  },
});
