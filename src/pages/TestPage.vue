<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" />
    <q-table :rows="tableData" :columns="columns" />
    <q-btn @click="saveToMongoDB" label="Save to MongoDB" />
  </div>
</template>

<script>
import { read, utils } from "xlsx";
import axios from "axios";
import { useStorePersonnelInfo } from "src/stores/personnelStore";
export default {
  data() {
    return {
      tableData: [], // Array to hold your table data
      columns: [], // Array to define table columns
    };
  },
  methods: {
    handleFileChange() {
      console.log("here");
      const file = this.$refs.fileInput.files[0];

      if (file) {
        // Handle the file and load data
        this.loadDataFromFile(file);
      }
    },
    loadDataFromFile(file) {
      // Implement logic to read Excel file and populate tableData and columns arrays
      // You can use libraries like XLSX.js or exceljs for Excel file parsing

      // Example: Read Excel file using XLSX.js
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: "array" });
        console.log("workbook", workbook);
        const sheetName = workbook.SheetNames[0];
        this.tableData = utils.sheet_to_json(workbook.Sheets[sheetName]);
        console.log("data", this.tableData);
        this.columns = Object.keys(this.tableData[0]).map((key) => ({
          name: key,
          label: key,
          field: key,
        }));
        console.log("col", this.columns);
      };

      reader.readAsArrayBuffer(file);
    },
    async saveToMongoDB() {
      console.log("data",Object.values(this.tableData))
      // Send the data to your backend server for saving to MongoDB
      // You would typically use an HTTP POST request to your backend API

      // Example using Axios
      const store=useStorePersonnelInfo()

      for(let i=0;i<this.tableData.length;i++){

        // let data=new FormData
        //   data.append('firstName',this.tableData[i].firstName)
        //   data.append('lastName',this.tableData[i].lastName)
        //   data.append('middleName',this.tableData[i].middleName)
        //   console.log("data",this.tableData[i].firstName)
        store.AddPersonnel(this.tableData[i])
        // await axios
        // .post("http://10.0.1.23:5000/api/Personnels/", {

        //   headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Content-Type": "application/json",
        //   },
        //   withCredentials: true,
        //   credentials: "same-origin",
        //   data:  data,
        // })
        // .then((response) => {
        //   console.log("Data saved to MongoDB successfully");
        // })
        // .catch((error) => {
        //   console.error("Error saving data to MongoDB:", error);
        // });
      }


      // Note: You need to implement the backend server to handle the MongoDB insertion
    },
  },
};
</script>
