import { defineStore } from "pinia";
import axios from "axios";
import { api } from "src/boot/axios";
import { Notify } from "quasar";

export const useMachineCategoryStore = defineStore("machineCategoryStore", {
  state: () => ({
    MachineCategoryDescription: "",
    MachineCategoryList: [],
  }),

  actions: {
    async fetchCategoryList() {
      try {
        const response = await api.get("/api/library/machine/category/list");
        if (response.status === 200) {
          this.MachineCategoryList = response.data;
          console.log("Category List = ", this.MachineCategoryList);
        }
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to add Category!" + error.message.error,
        });
      }
    },

    async NewCategory(payload) {
      try {
        const response = await api.post(
          "/api/library/machine/category/new",
          payload,
        );

        if (response.status === 201) {
          this.MachineCategoryList();
          Notify.create({
            type: "positive",
            message: "Category added successfully!",
            position: "center",
          });
        }
      } catch (error) {
        console.log(`Error inserting tasks: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to add Category!" + error.message.error,
          position: "center",
        });
      }
    },

    async DeleteCategory(payload) {
      console.log("Payload for removing Category:", payload);
      try {
        const response = await api.delete(
          "/api/library/machine/category/remove/" + payload,
        );
        if (response.status == 200) {
          this.MachineCategoryList();
          Notify.create({
            type: "positive",
            message: "Category removed successfully!",
            position: "center",
          });
        }
      } catch (error) {
        console.log(`Error Deleting Category: ${error}`);
        Notify.create({
          type: "negative",
          message: "Failed to remove Category!",
          position: "center",
        });
      }
    },
  },
});
