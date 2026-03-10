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
    }
  }


},





});
