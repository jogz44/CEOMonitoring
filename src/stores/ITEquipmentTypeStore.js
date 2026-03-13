import { defineStore } from "pinia";
import axios from "axios";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useITTypeStore = defineStore("ITTypeStore", {
  state: () => ({
    ITTypeDescription: "",
    ITTypeList: [],
  }),

  actions: {
    async fetchITTypeList() {
      try {
        const response = await api.get("/api/library/itequipment/type/list");
        if (response) {
          this.ITTypeList = response.data;
        }
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to add Machine Type!" + error.message.error,
        });
      }
    },

    async NewITType(payload) {
      try {
        const response = await api.post(
          "/api/library/itequipment/type/new",
          payload,
        );

        if (response) {
          this.fetchITTypeList();

          Notify.create({
            type: "positive",
            message: "Machine Type added successfully!",
            position: "center",
          });
        }
      } catch (error) {
        console.log(`Error inserting tasks: ${error} response code ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to add Machine Type!" + error,
          position: "center",
        });
      }
    },

    async DeleteITType(payload) {
      console.log("Payload for removing Machine Type:", payload);
      try {
        const response = await api.delete(
          "/api/library/itequipment/type/remove/" + payload,
        );
        if (response) {
          this.fetchITTypeList();
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
