import { defineStore } from "pinia";
import axios from "axios";

export const useEquipmentInfo = defineStore("equipmentinfo", {
  state: () => ({
    equipments: [],
    equipment: [],
    equipmentsCount: 0,
  }),

  actions: {
    async fetchEquipment() {
      try {
        const response = await axios.get(
          "http://10.0.1.23:5000/api/Equipments/"
        );

        this.equipments = response.data;
        this.equipmentsCount = response.data.length;
        console.log("res=", this.equipments);
        console.log("res=", this.equipmentsCount);
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
    async UpdateEquipment(id, payload) {
      try {
        const response = await axios.put(
          `http://10.0.1.23:5000/api/Equipments/` + id,
          payload
        );

        const index = this.equipment.findIndex((e) => e._id === payload._id);
        if (index !== -1) {
          this.equipment[index] = response.data;
        }
      } catch (error) {
        console.log(`Cannot Update ${error}`);
      }
    },
    async DeleteEquipment(id) {
      try {
        await axios.delete(`http://10.0.1.23:5000/api/Equipments/` + id);
        this.equipments = this.equipments.filter((e) => e.id !== id);
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    // For the Machine Maintenance History

    async GetEquipment(id) {
      console.log("getequipment=", id);
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Equipments/` + id
        );
        this.equipment = response.data;
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },
    async AddMaintenance(id, payload) {
      try {
        const response = await axios.post(
          "http://10.0.1.23:5000/api/Equipments/" + id + "/maintenance",
          payload
        );
        // this.equipment.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async DeleteMaintenance(id, maintenanceid) {
      try {
        await axios.delete(
          `http://10.0.1.23:5000/api/Equipments/` +
            id +
            `/maintenance/` +
            maintenanceid
        );
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },
  },
});
