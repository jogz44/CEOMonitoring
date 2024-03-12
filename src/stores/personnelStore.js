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
    EmpContractDtls: [],
    filteredStatus: [],
    regularCount: 0,
    casualCount: 0,
    programCount: 0,
    projectCount: 0,
  }),
  persist: true,
  getters: {
    //Count Active Employees
    ActiveCount() {
      return this.personnels.reduce((p, c) => {
        if (
          c.employmentDtl[c.employmentDtl.length - 1] &&
          c.employmentDtl[c.employmentDtl.length - 1].DteEnded
        ) {
          return new Date(
            c.employmentDtl[c.employmentDtl.length - 1].DteEnded
          ) >= new Date()
            ? p + 1
            : p;
        } else {
          return p;
        }
      }, 0);
    },
    //Display All Active Employees
    ActiveEmployees() {
      const activeEmployees = this.personnels.filter((employee) => {
        if (
          employee.employmentDtl[employee.employmentDtl.length - 1] &&
          employee.employmentDtl[employee.employmentDtl.length - 1].DteEnded
        ) {
          return (
            new Date(
              employee.employmentDtl[employee.employmentDtl.length - 1].DteEnded
            ) >= new Date()
          );
        } else {
          return false; // If employment details are not available, consider the employee as active
        }
      });

      console.log("Active Employees:", activeEmployees);

      return activeEmployees;
    },

    //Display All Active Employees without Received Date
    ActiveReceivedEmployees() {
      const activeRecEmployees = this.personnels.filter((employee) => {
        if (
          employee.employmentDtl[employee.employmentDtl.length - 1] &&
          employee.employmentDtl[employee.employmentDtl.length - 1].DteEnded &&
          (employee.employmentDtl[employee.employmentDtl.length - 1]
            .DteReceived === null ||
            employee.employmentDtl[employee.employmentDtl.length - 1]
              .DteReceived === undefined)
        ) {
          return (
            new Date(
              employee.employmentDtl[employee.employmentDtl.length - 1].DteEnded
            ) >= new Date()
          );
        } else {
          return false;
        }
      });
      return activeRecEmployees;
    },
  },

  actions: {
    //Fetch All Personnel with Details
    async fetchPersonnel() {
      try {
        const response = await axios.get(
          "http://10.0.1.23:5000/api/Personnels/"
        );

        this.personnels = response.data;
        this.personnelsCount = response.data.length;

        console.log("res=", this.personnels);
        // console.log("count =>", this.personnelsCount);

        // this.filteredStatus = response.data.filter((personnel) => {
        //   if (
        //     personnel.employmentDtl.length !== 0 &&
        //     personnel.employmentDtl[0].EmpStatus
        //   ) {
        //     const empStatus =
        //       personnel.employmentDtl[0].EmpStatus.toLowerCase();
        //     return (
        //       empStatus === "regular" ||
        //       empStatus === "casual" ||
        //       empStatus === "job order (program-based)" ||
        //       empStatus === "job order (project-based)"
        //     );
        //   }
        //   return false;
        // });

        this.filteredStatus = response.data.filter(
          (personnel) =>
            personnel.employmentDtl.length !== 0 &&
            new Date(
              personnel.employmentDtl[
                personnel.employmentDtl.length - 1
              ].DteEnded
            ) >= new Date()
        );
        this.regularCount = this.filteredStatus.filter(
          (personnel) =>
            personnel.employmentDtl[
              personnel.employmentDtl.length - 1
            ].EmpStatus.toLowerCase() == "regular"
        ).length;

        this.casualCount = this.filteredStatus.filter(
          (personnel) =>
            personnel.employmentDtl[
              personnel.employmentDtl.length - 1
            ].EmpStatus.toLowerCase() == "casual"
        ).length;

        this.programCount = this.filteredStatus.filter(
          (personnel) =>
            personnel.employmentDtl[
              personnel.employmentDtl.length - 1
            ].EmpStatus.toLowerCase() == "job order (program-based)"
        ).length;
        console.log("program=", this.filteredStatus);
        this.projectCount = this.filteredStatus.filter(
          (personnel) =>
            personnel.employmentDtl[
              personnel.employmentDtl.length - 1
            ].EmpStatus.toLowerCase() == "job order (project-based)"
        ).length;
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    //Add Employee
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

    // Delete Personnel
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

    // Update Personnel
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

    async GetEmployment(id, contractid) {
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Personnels/` +
            id +
            `/contract/` +
            contractid
        );
        this.EmpContractDtls = response.data;
        console.log("This is the Appointment =>", this.EmpContractDtls);
      } catch (error) {
        console.log(`Error fetching Employment: ${error}`);
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

    async UpdateEmployment(id, contractid, payload) {
      try {
        const response = await axios.put(
          `http://10.0.1.23:5000/api/Personnels/` +
            id +
            `/contract/` +
            contractid,
          payload
        );
      } catch (error) {
        console.log(`Cannot Update ${error}`);
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
        // console.log("Empppp", this.EmpDesignation);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    //Employee Receive
    async AddReceive(id, contractid, payload) {
      try {
        // let i = this.ActiveCount;
        //   this.secondTable.forEach(selectedEmployees => {
        //     this.secondTable.employmentDtl.forEach((selectedEmployeesContract)=>{

        //     })
        //  });
        //     console.log("address=",`http://10.0.1.23:5000/api/Personnels/` +
        //     id +
        //     `/update/` +
        //     contractid,
        //   payload
        // )
        const response = await axios.put(
          `http://10.0.1.23:5000/api/Personnels/` +
            id +
            `/update/` +
            contractid,
          payload
        );
        // const index = this.personnel.findIndex((e) => e._id === payload._id);
        // if (index !== -1) {
        //   this.personnel[index] = response.data;
        // }
      } catch (error) {
        console.log(`Cannot Update ${error}`);
      }
    },
  },
});
