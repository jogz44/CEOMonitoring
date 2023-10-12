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

        <q-input
          class="GNL__toolbar-input"
          outlined
          dense
          v-model="search"
          color="bg-grey-7 shadow-1"
          placeholder="Search for topics, locations & sources"
        >
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
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
          <q-item clickable v-ripple @click="toggleSection('dashboard')">
            <q-icon name="dashboard" size="24px" class="q-mr-md" /> HOME
          </q-item>
          <q-expansion-item label="MANAGEMENT" expand-separator icon="list">
            <q-item clickable v-ripple @click="toggleSection('employee')">
              <q-item-section class="q-ml-sm">
                <!-- Icon added here -->
                <q-item-label>
                  <q-icon name="groups" class="q-ml-md q-mr-md" />
                  Employee</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="toggleSection('machine')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon
                    name="precision_manufacturing"
                    class="q-ml-md q-mr-md"
                  />Machine Equipment</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="toggleSection('it')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon name="devices_other" class="q-ml-md q-mr-md" />IT
                  Equipment</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="toggleSection('project')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon name="engineering" class="q-ml-md q-mr-md" />
                  Project</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item label="SETTINGS" expand-separator icon="settings">
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
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

// import { fasEarthAmericas, fasFlask } from "@quasar/extras/fontawesome-v6";
import CenterTable from "components/CenterTable.vue";
import MachineTable from "components/MachineTable.vue";
import ItTable from "components/ItTable.vue";
import ProjectTable from "components/ProjectTable.vue";
import UserTable from "components/UserTable.vue";
import DashboardView from "src/components/DashboardView.vue";

export default {
  name: "NavBar",

  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
    };
  },

  data() {
    return {
      submenuOpen: false,
      showEmployee: false,
      showMachine: false,
      showProject: false,
      showUser: false,
      showIt: false,
      DashboardView: true,
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
};
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
