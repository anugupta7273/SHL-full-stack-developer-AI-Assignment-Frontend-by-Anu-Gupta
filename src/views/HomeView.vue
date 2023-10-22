<template>
  <div>
    <v-app-bar app color="secondary" dark>
      <div class="d-flex align-center">
      </div>

      <v-spacer></v-spacer>
      <!-- </v-card> -->
      <v-text-field
      solo
      label="Search here..."
      hide-details
      prepend-inner-icon="mdi-magnify"
      v-model="search"
      clearable
      class="search-bar border-button rounded-pill mx-3"
      dense
      
    ></v-text-field>
    <v-spacer></v-spacer>

    </v-app-bar>



    <v-row class="pa-4">
      <v-col v-for="(card, index)   in projetcs" :key="index" cols="12" sm="6" md="2" lg="2">
        <v-card @click="openDialog(card)" width="250px" height="390px" class="pa-4" outlined>
          <v-card-subtitle class="px-0 pt-0 pb-1 mt-0 my-0 py-0">Title</v-card-subtitle>
          <v-card-Title class="px-0 pt-0 pb-4 mt-0 my-0">{{ card.projectName }}</v-card-title>
          <v-card-subtitle class=" px-0 pt-0 mt-0 pb-1">Project Techonology</v-card-subtitle>
          <span>{{ card.projectTechnologies }}</span>
          <v-card-subtitle class=" px-0 pt-0 mt-0 pb-1">Techinical_skill_frontend</v-card-subtitle>
          <span>{{ card.technicalSkillsetFrontend }}</span>
          <v-card-subtitle class=" px-0 pt-0 mt-0 pb-1">Techinical_skill_Backend</v-card-subtitle>
          <span>{{ card.technicalSkillsetBackend }}</span>
          <v-card-subtitle class="px-0 pt-0 mt-0 pb-1">Techinical_skill _Databases</v-card-subtitle>
          <span>{{ card.technicalSkillsetDatabases }}</span>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog"  max-width="300" style="position: absolute; top: opx;"
      class="right-aligned-dialog">
      <v-card class=" pa-4">
        <v-card-subtitle class="px-0 pt-0 pb-1">Title</v-card-subtitle>
        <v-divider></v-divider>
        <v-card-Title class="px-0 pt-0 pb-1">{{selectedProject.projectName}}</v-card-title>
        <span>Project Technology</span>
        <v-card-subtitle class=" px-0 pt-0 pb-1">{{selectedProject.projectTechnologies}}</v-card-subtitle>
        <span>Technical Skill Set Front End</span>
        <v-card-subtitle class=" px-0 pt-0 pb-1">{{selectedProject.technicalSkillsetFrontend}}</v-card-subtitle>
        <span>Technical Skill Set Back End</span>
        <v-card-subtitle class="px-0 pt-0 pb-1">{{selectedProject.technicalSkillsetBackend}}</v-card-subtitle>
        <span>Technical Skill Set Databases</span>
        <v-card-subtitle class="px-0 pt-0 pb-1">{{selectedProject.technicalSkillsetDatabases}}</v-card-subtitle>

        <v-card-actions>
          <v-btn color="primary" @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import projectController from "@/controllers/apiClient";



export default {
  name: 'HomeView',
  data() {
    return {
      dialog: false,
      projetcs: [],
      storedProject : [],
      search:"",
      selectedProject :{}
    };
  },
  watch: {
    search(newValue) {
      console.log(newValue)
      if (newValue == "" || newValue == null) {
        this.projetcs = this.storedProject;
      } else {
        this.searchData(newValue);
      }
    },
  },
  methods: {
    openDialog(project) {
      console.log(project)
      this.selectedProject = project;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    async getProjects() {
      var response = await projectController.getProjectsList();
      if (response.data.flag == true) {

        const sortedListByProject = this.sortList(response.data.projects, 'projectName');
        console.log("data ", response.data.projects);
        this.projetcs = sortedListByProject;
        this.storedProject = sortedListByProject;
      }
    },
    sortAndSearch(list, key, searchTerm) {
      if (!Array.isArray(list) || list.length <= 1) {
        return list; // Return the original list if it's empty or has only one element.
      }

      if (list[0][key] === undefined) {
        return list; // Return the original list if the specified key doesn't exist in the objects.
      }

      const filteredList = list.filter((item) =>
        item[key].toLowerCase().includes(searchTerm.toLowerCase())
      );

      return filteredList.slice().sort((a, b) => {
        const valueA = a[key].toLowerCase();
        const valueB = b[key].toLowerCase();

        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      });
    },
    async searchData(searchTerm){
      var list = this.storedProject;
      const sortedAndSearchedList = await this.sortAndSearch(list, 'projectName', searchTerm);
      this.projetcs = sortedAndSearchedList;
      console.log(sortedAndSearchedList);

    },
    sortList(list, key) {
      if (!Array.isArray(list) || list.length <= 1) {
        return list; // Return the original list if it's empty or has only one element.
      }

      if (list[0][key] === undefined) {
        return list; // Return the original list if the specified key doesn't exist in the objects.
      }

      return list.slice().sort((a, b) => {
        const valueA = a[key].toLowerCase();
        const valueB = b[key].toLowerCase();

        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      });
    }
    // Example usage:






  },


  created() {
    this.getProjects();
  }

}
</script>
<style>
.search-bar {
  max-width: 300px;

}

.v-dialog {
  position: fixed !important;
  right: 300px;
  top: 0;
  transform: translateX(100%);
}
</style>
