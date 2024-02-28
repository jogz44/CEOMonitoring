import { defineStore } from "pinia";
import axios from "axios";

export const useStoreProjectInfo = defineStore("projectinfo", {
  state: () => ({
    projecthistory: [],
    projects: [],
    project: [],
    projectsCount: 0,
    projectCost: 0,
  }),

  actions: {
    async fetchProject() {
      try {
        const response = await axios.get("http://10.0.1.23:5000/api/Projects/");

        this.projects = response.data;
        this.projectsCount = response.data.length;

        this.projectCost = response.data.reduce((totalCost, project) => {
          return totalCost + project.TotalProjectCost;
        }, 0);

        console.log("Total Project Cost", this.projectCost);
         console.log("res=", this.projects);
        // console.log("count =>", this.projectsCount);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async AddProject(payload) {
      try {
        const response = await axios.post(
          "http://10.0.1.23:5000/api/Projects/",
          payload
        );

        this.projects.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },

    async DeleteProject(id, payload) {
      try {
        await axios.put(`http://10.0.1.23:5000/api/Projects/` + id + `/remove`, payload);
        // this.projects = this.projects.filter((e) => e.id !== id);
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    async UpdateProject(id, payload) {
      try {
        const response = await axios.put(
          `http://10.0.1.23:5000/api/Projects/` + id + `/update`,
          payload
        );
        const index = this.project.findIndex((e) => e._id === payload._id);
        if (index !== -1) {
          this.project[index] = response.data;
        }
      } catch (error) {
        console.log(`Cannot Update ${error}`);
      }
    },

    // Update
    async GetProject(id) {
      console.log("getproject=", id);
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Projects/` + id
        );

        this.project = response.data;
        // this.projecthistory = Object.values(response.data.ProjectUpdates);
        // console.log("Projectsssse=", this.project);
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },

    async AddUpdate(id, payload) {
      try {
        const response = await axios.post(
          "http://10.0.1.23:5000/api/Projects/" + id + "/projectupdate",
          payload,
          console.log("mao ni=>", response)
        );
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async UploadImage(id, payload) {
      try {
        let response = await axios.post(
          "http://10.0.1.23:5000/api/Projects/" + id + "/projectupdate",
          payload
        );
        console.log("response=", response);
        // this.equipment.push(response.data);
      } catch (error) {
        console.log(`Error fetching tasks: ${error}`);
      }
    },
    async DeleteUpdate(id, updateid) {
      try {
        await axios.put(
          `http://10.0.1.23:5000/api/Projects/` +
            id +
            `/updates/remove/` +
            updateid
        );
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    async GetProjectUpdateDetails(id) {
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Projects/` + id + `/updates`
        );
        this.projecthistory = response.data;
        console.log("history=>", this.projecthistory)
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },
  },
});
