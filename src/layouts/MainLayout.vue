<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-pa-md">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Engineering System </q-toolbar-title>

         <q-btn flat icon="logout" size="md" style="color: white;" label="Logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list>
          <q-item clickable v-ripple @click="toggleSection('dashboard')">
            <q-icon name="home" size="24px" class="q-mr-md" /> Home
          </q-item>
          <q-expansion-item label="Management" expand-separator icon="receipt">
            <q-item clickable v-ripple @click="toggleSection('employee')">
              <q-item-section class="q-ml-sm">
                <!-- Icon added here -->
                <q-item-label>
                  <q-icon name="people" class="q-ml-md q-mr-md" />
                  Employee</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="toggleSection('machine')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon
                    name="settings"
                    class="q-ml-md q-mr-md"
                  />Machine Equipment</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="toggleSection('it')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon
                    name="computer"
                    class="q-ml-md q-mr-md"
                  />IT Equipment</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="toggleSection('project')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon name="work" class="q-ml-md q-mr-md" />
                  Project</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item label="Settings" expand-separator icon="settings">
            <q-item clickable v-ripple @click="toggleSection('user')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon name="people" class="q-ml-md q-mr-md" />
                  User</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Engineering</div>
          <div>@citygovernmentoftagum</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container v-if="DashboardView">
      <DashboardView />
    </q-page-container>
    <q-page-container v-if="showEmployee">
      <!-- <router-view /> -->
      <CenterTable />
    </q-page-container>
    <q-page-container v-if="showIt">
      <ItTable />
    </q-page-container>
    <q-page-container v-if="showMachine">
      <MachineTable />
    </q-page-container>
    <q-page-container v-if="showProject">
      <ProjectTable />
    </q-page-container>
    <q-page-container v-if="showUser">
      <UserTable />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
// import EssentialLink from "components/EssentialLink.vue";
import CenterTable from "components/CenterTable.vue";
import MachineTable from "components/MachineTable.vue";
import ItTable from "components/ItTable.vue";
import ProjectTable from "components/ProjectTable.vue";
import UserTable from "components/UserTable.vue";
import DashboardView from "src/components/DashboardView.vue";

const linksList = [
  {
    title: "Admin",
    // caption: 'quasar.dev',
    caption: "",
    icon: "home",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    // EssentialLink,
    CenterTable,
    MachineTable,
    ProjectTable,
    UserTable,
    ItTable,
    DashboardView
},

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      submenuOpen: false,
      showEmployee: false,
      showMachine: false,
      showProject: true,
      showUser: false,
      showIt: false,
      DashboardView: false,
    };
  },
  methods: {
    toggleSubMenu() {
      this.submenuOpen = !this.submenuOpen;
    },

    closeSubMenu() {
      this.submenuOpen = false;
    },
    toggleSection(section) {
      this.showEmployee = section === "employee";
      this.showIt = section === "it";
      this.showMachine = section === "machine";
      this.showProject = section === "project";
      this.showUser = section === "user";
      this.DashboardView = section === "dashboard";
    },
  },
});
</script>
