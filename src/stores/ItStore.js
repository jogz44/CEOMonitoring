import { defineStore } from "pinia";
import axios from "axios";

export const useITEquipmentInfo = defineStore("itequipmentinfo", {
  state: () => ({
    itequipments: [],
    itequipment: [],
    itequipmentsCount: 0,
    itequipmenttype:[]
  }),

  actions: {
    async fetchITEquipment() {
      try {
        const response = await axios.get(
          "http://10.0.1.23:5000/api/ITEquipments/"
        );

        this.itequipments = response.data;
        this.itequipmentsCount = response.data.length;
        console.log("resItEquipment=", this.itequipments);
        console.log("resEquipment=", this.itequipmentsCount);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async AddITEquipment(payload) {
      try {
        const response = await axios.post(
          "http://10.0.1.23:5000/api/ITEquipments/",
          payload
        );
        this.itequipments.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async UpdateITEquipment(id, payload) {
      try {
        const response = await axios.put(
          `http://10.0.1.23:5000/api/ITEquipments/` + id,
          payload
        );

        const index = this.itequipment.findIndex((e) => e._id === payload._id);
        if (index !== -1) {
          this.itequipment[index] = response.data;
        }
      } catch (error) {
        console.log(`Cannot Update ${error}`);
      }
    },
    async DeleteITEquipment(id) {
      try {
        await axios.delete(`http://10.0.1.23:5000/api/ITEquipments/` + id);
        this.itequipments = this.itequipments.filter((e) => e.id !== id);
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    // For the Machine Maintenance History

    async GetITEquipment(id) {
      console.log("getequipment=", id);
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/ITEquipments/` + id
        );
        this.itequipment = response.data;
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },
    async AddITMaintenance(id, payload) {
      try {
        const response = await axios.post(
          "http://10.0.1.23:5000/api/ITEquipments/" + id + "/maintenance",
          payload
        );
        // this.equipment.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async DeleteITMaintenance(id, maintenanceid) {
      try {
        await axios.delete(
          `http://10.0.1.23:5000/api/ITEquipments/` +
            id +
            `/maintenance/` +
            maintenanceid
        );
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },
    async fetchDashboard() {
      try {
        const response = await axios.get(
          "http://10.0.1.23:5000/api/ITEquipments/dashboard"
        );

        // this.itequipments = response.data;
        // this.itequipmentsCount = response.data.length;
        // console.log("resItEquipment=", this.itequipments);
        console.log("resEquipment=", response.data);
          this.itequipmenttype=response.data

      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
  },
});
