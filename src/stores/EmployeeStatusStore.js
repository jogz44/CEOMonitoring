import { defineStore } from "pinia";
import axios from "axios";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useEmployeeStatusStore = defineStore("employeeStatusStore", {
  state: () => ({
    statusDescription: "",
    statusList: [],
  }),

  actions: {
    async fetchStatusList() {
      try {
        const response = await api.get("/api/library/employee/status/list");
        if (response.status === 200) {
          this.statusList = response.data;
          console.log("status List = ", this.statusList);
        }
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to add status!" + error.message,
        });
      }
    },

    async NewStatus(payload) {
      try {
        const response = await api.post(
          "/api/library/employee/status/new",
          payload,
        );

        console.log("status List = ", this.statusList);
        if (response.status === 201) {
          this.fetchStatusList();
          Notify.create({
            type: "positive",
            message: "Status added successfully!",
            position: "center",
          });
        }
      } catch (error) {
        console.log(`Error inserting tasks: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to add status!" + error.message.error,
          position: "center",
        });
      }
    },

    async DeleteStatus(payload) {
      console.log("Payload for removing designation:", payload);
      try {
        const response = await api.delete(
          "/api/library/employee/status/remove/" + payload,
        );
        if (response.status == 200) {
          this.fetchStatusList();
          Notify.create({
            type: "positive",
            message: "Status removed successfully!",
            position: "center",
          });
        }
      } catch (error) {
        console.log(`Error Deleting new Status: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to remove Status!",
          position: "center",
        });
      }
    },
  },
});
