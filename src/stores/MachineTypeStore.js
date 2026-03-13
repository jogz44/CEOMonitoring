import { defineStore } from "pinia";
import axios from "axios";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useMachineTypeStore = defineStore("machineTypeStore", {
  state: () => ({
    MachineTypeDescription: "",
    MachineTypeList: [],
  }),

  actions: {
    async fetchTypeList() {
      try {
        const response = await api.get("/api/library/machine/type/list");
        if (response) {
          this.MachineTypeList = response.data;
        }
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to add Machine Type!" + error.message.error,
        });
      }
    },

    async NewType(payload) {
      try {
        const response = await api.post(
          "/api/library/machine/type/new",
          payload,
        );

        if (response) {
          this.fetchTypeList();
          Notify.create({
            type: "positive",
            message: "Machine Type added successfully!",
            position: "center",
          });
        }
      } catch (error) {
        console.log(
          `Error inserting tasks: ${error.message.error} response code ${error.message.status}`,
        );
        Notify.create({
          type: "negative",
          message: "Failed to add Machine Type!" + error.message.error,
          position: "center",
        });
      }
    },

    async DeleteType(payload) {
      console.log("Payload for removing Machine Type:", payload);
      try {
        const response = await api.delete(
          "/api/library/machine/type/remove/" + payload,
        );
        if (response.status == 200) {
          this.fetchTypeList();
          Notify.create({
            type: "positive",
            message: "Machine Type removed successfully!",
            position: "center",
          });
        }
      } catch (error) {
        console.log(`Error Deleting Machine Type: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to remove Machine Type! " + error.message,
          position: "center",
        });
      }
    },
  },
});
