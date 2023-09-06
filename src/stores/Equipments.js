import { defineStore } from "pinia";
import axios from "axios";


export const useEquipmentInfo = defineStore("equipmentinfo", {
  state: () => ({
    equipments: [],
  }),

  actions: {
    async fetchEquipment() {
      try {
        const response = await axios.get(
          "http://10.0.1.23:5000/api/Equipments/"
        );

        this.equipments = response.data;
        console.log("res=", this.equipments);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    async AddEquipment(payload) {
      try {
        const response = await axios.post(
          "http://10.0.1.23:5000/api/Equipments/",
          payload
        );
        this.equipments.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    async GetEquipment(id) {
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Equipments/${id}`,
          payload
        );
        this.equipments = response.data;
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    async DeleteEquipment(id) {
      try {
        await axios.delete(
          `http://10.0.1.23:5000/api/Equipments/${id}`,
          payload
        );
        this.equipments = this.equipments.filter((e) => e.id !== id);
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    async UpdateEquipment(payload) {
      try {
        const response = await this.$axios.put(
          `http://10.0.1.23:5000/api/Equipments/${payload._id}`,
          payload
        );
        const index = this.equipments.findIndex((e) => e._id === payload._id);
        if (index !== -1) {
          this.equipments[index] = response.data;
        }
      } catch (error) {
        console.log(`Cannot Update ${error}`);
      }
    },
  },
});
