import { defineStore } from "pinia";
import axios from "axios";

export const useStoreProjectInfo = defineStore("projectinfo", {
  state: () => ({
    projects: [],
    project: [],
    projectsCount: 0,
  }),

  actions: {
    async fetchProject() {
      try {
        const response = await axios.get("http://10.0.1.23:5000/api/Projects/");

        this.projects = response.data;
        this.projectsCount = response.data.length;
        console.log("res=", this.projects);
        console.log("count =>", this.projectsCount);
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

    async DeleteProject(id) {
      try {
        await axios.delete(`http://10.0.1.23:5000/api/Projects/` + id);
        this.projects = this.projects.filter((e) => e.id !== id);
      } catch (error) {
        console.log(`Unable to Delete ${error}`);
      }
    },

    async UpdateProject(id, payload) {
      try {
        const response = await axios.put(
          `http://10.0.1.23:5000/api/Projects/` + id,
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

    async GetProject(id) {
      console.log("getproject=", id);
      try {
        const response = await axios.get(
          `http://10.0.1.23:5000/api/Projects/` + id
        );
        this.project = response.data;
      } catch (error) {
        console.log("Unable to retrieve=", error);
      }
    },
  },
});
