import { defineStore } from "pinia";
import axios from "axios";
import { date } from "quasar";

export const useStorePersonnelInfo = defineStore("personnelinfo", {
  state: () => ({
    personnels: [],
    personnel: [],
    personnelsCount: 0,
    designationtype: [],
    EmpDesignation: [],
    EmpDtls: [],
  }),
  persist: true,
  getters: {
    ActiveCount() {
      return this.personnels.reduce((p, c) => {
        if (c.employmentDtl[0] && c.employmentDtl[0].DteEnded) {
          return new Date(c.employmentDtl[0].DteEnded) >= new Date()
            ? p + 1
            : p;
        } else {
          return p;
        }
      }, 0);
    },
    // EndCount(){
    //   return this.personnels.reduce((p,c)=>{
    //     return new Date(c.employmentDtl[0].DteEnded) <= new Date() ? p+1:p
    //   },0)
    // }
  },

  actions: {
    async fetchPersonnel() {
      try {
        const response = await axios.get(
          "http://10.0.1.23:5000/api/Personnels/"
        );

        this.personnels = response.data;
        this.personnelsCount = response.data.length;

        console.log("res=", this.personnels);
        // console.log("count =>", this.personnelsCount)
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    async AddPersonnel(payload) {
      try {
        const response = await axios.post(
          "http://10.0.1.23:5000/api/Personnels/",
          payload
        );
        this.personnels.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    async DeletePersonnel(id, payload) {
      try {
        await axios.put(
          `http://10.0.1.23:5000/api/Personnels/delete/` + id,
          payload
        );
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    async UpdatePersonnel(id, payload) {
      try {
        const response = await axios.put(
          `http://10.0.1.23:5000/api/Personnels/` + id,
          payload
        );
        const index = this.personnel.findIndex((e) => e._id === payload._id);
        if (index !== -1) {
          this.personnel[index] = response.data;
        }
      } catch (error) {
        console.log(`Cannot Update ${error}`);
      }
    },

    // For the Employment History
    async DeleteEmployment(id, contractid) {
      await console.log(
        "employee ID =>" + id + " and Contract ID=>" + contractid
      );
      try {
        let res = await axios.put(
          `http://10.0.1.23:5000/api/Personnels/` +
            id +
            `/contracts/remove/` +
            contractid
        );
        console.log("res =", res.data);
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    async GetPersonnel(id) {
      console.log("getpersonnel=", id);
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Personnels/` + id
        );
        this.personnel = response.data;
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },

    async GetPersonnelHistory(id) {
      console.log("getpersonnelhistory=", id);
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Personnels/contracts/` + id
        );
        this.EmpDtls = response.data;
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },

    async AddEmployment(id, payload) {
      try {
        const response = await axios.post(
          "http://10.0.1.23:5000/api/Personnels/" + id + "/contracts",
          payload
        );
        // this.equipment.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    async fetchDashboard() {
      try {
        const response = await axios.get(
          "http://10.0.1.23:5000/api/Personnels/dashboard"
        );

        // this.itequipments = response.data;
        // this.itequipmentsCount = response.data.length;
        // console.log("resItEquipment=", this.itequipments);
        // console.log("resDesignation=", response.data);
        this.designationtype = response.data;
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    // Employee Designation
    async fetchDesignation() {
      try {
        const response = await axios.get(
          "http://10.0.1.23:5000/api/library/designation"
        );
        this.EmpDesignation = response.data;
        console.log("Empppp", this.EmpDesignation);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
  },
});
