import { defineStore } from "pinia";
import axios from "axios";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useDesignationStore = defineStore("designationStore", {
  state: () => ({
    designationDescription: "",
    designationList: [],
  }),

  actions: {
    async fetchDesignation() {
      try {
        const response = await api.get("/api/library/designation");
        this.designationList = response.data;
        console.log("Designation List=", this.designationList);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to add designation!",
        });
      }
    },

    async NewDesignation(payload) {
      console.log("Payload for new designation:", payload);
      try {
        const response = await api.post(
          "/api/library/designation/new",
          payload,
        );
        if (response.status == 201) {
          this.fetchDesignation();
          Notify.create({
            type: "positive",
            message: "Designation added successfully!",
          });
        }
      } catch (error) {
        console.log(`Error inserting new Designation: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to add designation!",
        });
      }
    },

    async RemoveDesignation(payload) {
      console.log("Payload for removing designation:", payload);
      try {
        const response = await api.delete(
          "/api/library/designation/" + payload,
        );
        if (response.status == 200) {
          this.fetchDesignation();
          Notify.create({
            type: "positive",
            message: "Designation removed successfully!",
            position: "center",
          });
        }
      } catch (error) {
        console.log(`Error Deleting new Designation: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to add designation!",
          position: "center",
        });
      }
    },
  },
});
