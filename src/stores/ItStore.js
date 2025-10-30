import { defineStore } from "pinia";
import axios from "axios";
import { api } from "src/boot/axios";

export const useITEquipmentInfo = defineStore("itequipmentinfo", {
  state: () => ({
    itequipmenthistory: [],
    itequipments: [],
    itequipment: {},
    itequipmentsCount: 0,
    itequipmenttype: [],
  }),

  actions: {
    async fetchITEquipment() {
      try {
        const response = await api.get("/api/ITEquipments/");

        this.itequipments = response.data;
        this.itequipmentsCount = response.data.length;
        // console.log("resItEquipment=", this.itequipments);
        // console.log("resEquipment=", this.itequipmentsCount);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async AddITEquipment(payload) {
      try {
        console.log("payload => ", payload);
        const response = await api.post("/api/ITEquipments/", payload,
          { headers: {"Content-Type": "multipart/form-data"} }
        );

        this.itequipments.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async UpdateITEquipment(id, payload) {
      try {
        const response = await api.put(`/api/ITEquipments/` + id, payload,{
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("response=", response);
      } catch (error) {
        console.log(`Cannot Update ${error}`);
      }
    },
    async DeleteITEquipment(id, payload) {
      try {
        await api.put(`/api/ITEquipments/` + id + `/remove`, payload);
        this.itequipments = this.itequipments.filter((e) => e.id !== id);
        if (index !== -1) {
          this.itequipment[index] = response.data;
        }
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    // For the IT Maintenance History

    async GetITEquipment(id) {
      console.log("getitequipment=", id);
      try {
        const response = await api.get(`/api/ITEquipments/` + id);
        this.itequipment = response.data;
        // this.itequipmenthistory = Object.values(response.data.MaintenanceDtls);
        //  console.log("itequipment=",this.itequipmenthistory);
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },

    async GetITEquipmentmaintenanceDetails(id) {
      try {
        const response = await api.get(
          `/api/ITEquipments/` + id + `/maintenance`,
        );
        this.itequipmenthistory = response.data;
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },

    async AddITMaintenance(id, payload) {
      try {
        const response = await api.post(
          "/api/ITEquipments/" + id + "/maintenance",
          payload,
        );
        // this.equipment.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async DeleteITMaintenance(id, maintenanceid) {
      try {
        await api.put(
          `/api/ITEquipments/` + id + `/maintenance/remove/` + maintenanceid,
        );
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },
    async UploadImage(id, payload) {
      try {
        let response = await api.post(
          "/api/ITEquipments/" + id + "/maintenance",
          payload,
        );
        console.log("response=", response);
        // this.equipment.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async fetchDashboard() {
      try {
        const response = await api.get("/api/ITEquipments/dashboard");

        // this.itequipments = response.data;
        // this.itequipmentsCount = response.data.length;
        // console.log("resItEquipment=", this.itequipments);
        // console.log("resEquipment=", response.data);
        this.itequipmenttype = response.data;
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
  },
});
