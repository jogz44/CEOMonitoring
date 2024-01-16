<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title
          v-if="$q.screen.gt.xs"
          shrink
          class="row items-center no-wrap"
        >
          <img
            src="https://img.icons8.com/?size=50&id=fX3mLjrxmRp3&format=png"
          />
          <span class="q-ml-xs" style="font-size: 15px">ENGINEERING</span>
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">

          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item
            clickable
            v-ripple
            @click="handleItemClick"
            :class="{ 'active-item': selectedSection === 'dashboard' }"
          >
            <q-item-section avatar>
              <q-avatar
                rounded
                :style="{
                  'background-color':
                    selectedSection === 'dashboard' ? '#057407' : '#5f6368',
                }"
                text-color="white"
                icon="dashboard"
              >
              </q-avatar>
            </q-item-section>

            <q-item-section class="responsive-text">
              <q-item-label> <b>Home</b> </q-item-label>
            </q-item-section>
          </q-item>

          <q-expansion-item group="somegroup" v-model="management">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar
                  rounded
                  text-color="white"
                  icon="list"
                  size="40px"
                  :style="{
                    'background-color':
                      management === true ? '#057407' : '#5f6368',
                  }"
                ></q-avatar>
              </q-item-section>
              <q-item-section class="responsive-text">
                <q-item-label> <b>Management</b> </q-item-label>
              </q-item-section>
            </template>

            <q-item
              clickable
              v-ripple
              @click="toggleSection('employee')"
              :class="{ 'active-item': selectedSection === 'employee' }"
            >
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon
                    :style="{
                      color:
                        selectedSection === 'employee' ? '#006400' : 'inherit',
                    }"
                    name="groups"
                    class="q-ml-md q-mr-md"
                  />
                  Employee</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="toggleSection('machine')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon
                    :style="{
                      color:
                        selectedSection === 'machine' ? '#006400' : 'inherit',
                    }"
                    name="precision_manufacturing"
                    class="q-ml-md q-mr-md"
                  />Machine Equipment</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="toggleSection('it')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon
                    :style="{
                      color: selectedSection === 'it' ? '#006400' : 'inherit',
                    }"
                    name="devices_other"
                    class="q-ml-md q-mr-md"
                  />IT Equipment</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="toggleSection('project')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon
                    :style="{
                      color:
                        selectedSection === 'project' ? '#006400' : 'inherit',
                    }"
                    name="engineering"
                    class="q-ml-md q-mr-md"
                  />
                  Project</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item group="somegroup" v-model="settings">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar
                  rounded
                  :style="{
                    'background-color':
                      settings === true ? '#057407' : '#5f6368',
                  }"
                  text-color="white"
                  icon="settings"
                  size="40px"
                ></q-avatar>
              </q-item-section>
              <q-item-section class="responsive-text">
                <q-item-label> <b>Settings</b> </q-item-label>
              </q-item-section>
            </template>
            <q-item
              clickable
              v-ripple
              @click="toggleSection('user')"
              :class="{ 'active-item': selectedSection === 'user' }"
            >
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon
                    :style="{
                      color: selectedSection === 'user' ? '#006400' : 'inherit',
                    }"
                    name="people"
                    class="q-ml-md q-mr-md"
                  />
                  User</q-item-label
                >
              </q-item-section>

            </q-item>
            <q-item
              clickable
              v-ripple
              @click="toggleSection('view')"
              :class="{ 'active-item': selectedSection === 'view' }"
            >
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon
                    :style="{
                      color: selectedSection === 'view' ? '#006400' : 'inherit',
                    }"
                    name="people"
                    class="q-ml-md q-mr-md"
                  />
                  User View</q-item-label
                >
              </q-item-section>
            </q-item>


            <q-item
              clickable
              v-ripple
              @click="$router.push('/')"
            >
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon

                    name="logout"
                    class="q-ml-md q-mr-md"
                  />
                  Logout</q-item-label
                >
              </q-item-section>

            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!-- <q-page-container>
      <router-view />
    </q-page-container> -->
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
    <q-page-container v-if="showView">
      <UserView />
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
import UserView from "components/UserView.vue";
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
    UserView,
    ItTable,
    DashboardView,
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
      selectedSection: "dashboard",
      submenuOpen: false,
      showEmployee: false,
      showMachine: false,
      showProject: false,
      showUser: false,
      showIt: false,
      showView: false,
      DashboardView: true,
      management: false,
      settings: false,
    };
  },
  methods: {
    handleItemClick() {
      // Call both functions here
      this.toggleSection("dashboard");
    },
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
      this.showView = section === "view";
      this.DashboardView = section === "dashboard";
      if (section === "dashboard") {
        this.management = false; // Close management expansion item
        this.settings = false; // Close settings expansion item
      } else {
      }
      if (this.selectedSection === section) {
        // If the clicked section is already open, close it
        this.selectedSection = null;
      } else {
        this.selectedSection = null;
        this.selectedSection = section;
      }
    },
  },
});
</script>
<style scoped>
.GNL__toolbar {
  height: 64px;
}

.GNL__toolbar-input {
  width: 55%;
}

.GNL__drawer-item {
  line-height: 24px;
  border-radius: 0 24px 24px 0;
  margin-right: 12px;
}

.GNL__drawer-item .q-item__section--avatar .q-icon {
  color: #5f6368;
}

.GNL__drawer-item .q-item__label {
  color: #3c4043;
  letter-spacing: 0.01785714em;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.GNL__drawer-footer-link {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.75rem;
}

.GNL__drawer-footer-link:hover {
  color: #000;
}
</style>
