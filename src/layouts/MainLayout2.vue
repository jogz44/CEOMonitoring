<template>
  <div class="">
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-white text-grey-8">
        <q-toolbar class="GNL__toolbar">
          <q-btn @click="drawer = !drawer" round
            ><q-avatar size="30px">
              <img
                src="https://img.icons8.com/?size=50&id=fX3mLjrxmRp3&format=png"
              /> </q-avatar
          ></q-btn>
          <q-toolbar-title>ENGINEERING</q-toolbar-title>

          <q-space />

          <div class="q-gutter-sm row items-center no-wrap">
            <q-btn round flat>
              <q-avatar size="26px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item
                    clickable
                    v-ripple
                    @click="GoToUser()"

                  >
                    <q-item-section>
                      <q-item-label>
                        <q-icon

                          name="person"
                          class="q-mr-md"
                        />
                        My Profile</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-separator></q-separator>
                  <q-item clickable v-ripple @click="logout()">
                    <q-item-section
                      ><q-item-label>
                        <q-icon name="logout" class="q-mr-md" />
                        Logout</q-item-label
                      ></q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="280" :breakpoint="850">
        <q-scroll-area style="border-right: 1px solid #ddd" class="fit">
          <q-list padding class="menu-list">
            <!-- Dashboard -->
            <q-item
              clickable
              v-ripple
              @click="GotoDashboard()"

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
                <q-item-label> <b>Dashboard</b> </q-item-label>
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
                v-if="view('Employee')"
                clickable
                v-ripple
                @click="GoToEmployee()"
                :class="{ 'active-item': selectedSection === 'employee' }"
              >
                <q-item-section class="q-ml-sm">
                  <q-item-label>
                    <q-icon
                      :style="{
                        color:
                          selectedSection === 'employee'
                            ? '#006400'
                            : 'inherit',
                      }"
                      name="groups"
                      class="q-ml-md q-mr-md"
                    />
                    Employee</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item
                v-if="view('Machine Equipment')"
                clickable
                v-ripple
                @click="GoToMachines()"
              >
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
              <q-item
                v-if="view('IT Equipment')"
                clickable
                v-ripple
                @click="GoToIT()"
              >
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
                v-if="store.user.isAdmin == true"
                clickable
                v-ripple
                @click="GoToUsers()"
                :class="{ 'active-item': selectedSection === 'user' }"
              >
                <q-item-section class="q-ml-sm">
                  <q-item-label>
                    <q-icon
                      :style="{
                        color:
                          selectedSection === 'user' ? '#006400' : 'inherit',
                      }"
                      name="people"
                      class="q-ml-md q-mr-md"
                    />
                    User List</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <!-- <q-page-container v-if="DashboardView">
        <DashboardView />
      </q-page-container>
      <q-page-container v-if="showEmployee">
        <CenterTable />
      </q-page-container>
      <q-page-container v-if="showIt">
        <ItTable />
      </q-page-container>
      <q-page-container v-if="showMachine">
        <MachineTable />
      </q-page-container>
      <q-page-container v-if="showUser">
        <UserTable />
      </q-page-container>
      <q-page-container v-if="showView">
        <UserView />
      </q-page-container> -->
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useLoginStore } from "../stores/LoginStore";
// import EssentialLink from "components/EssentialLink.vue";
// import CenterTable from "components/CenterTable.vue";
// import MachineTable from "components/MachineTable.vue";
// import ItTable from "components/ItTable.vue";
// import ProjectTable from "components/ProjectTable.vue";
// import UserTable from "components/UserTable.vue";
// import UserView from "components/UserView.vue";
// import DashboardView from "src/components/DashboardView.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    // EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useLoginStore();

    function view(module) {
      const userCredentials = store.user.Credentials;
      const moduleCredentials = userCredentials.find(
        (cred) => cred.Module === module,
      );
      // console.log("credentials=", moduleCredentials);
      if (moduleCredentials) {
        if (moduleCredentials.Display) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    return {
      view,
      store,

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      management: false,
      selectedSection: "",
      settings: false,
      drawer: "",
    };
  },

  methods: {
    logout() {
      window.localStorage.clear();
      window.localStorage.removeItem("authToken");
      window.history.replaceState({}, document.title, "/login");
      window.history.go(-(window.history.length - 0));
      this.$router.replace("/");
    },

    handleItemClick() {
      this.$router.push({ name: "mainLayout" });
    },
    GotoDashboard() {
      this.selectedSection="dashboard"
      this.$router.push({ name: "dashboard" });
    },
    toggleSubMenu() {
      this.submenuOpen = !this.submenuOpen;
    },

    closeSubMenu() {
      this.submenuOpen = false;
    },

    GoToEmployee() {

      this.selectedSection="employee"
      this.$router.push({ name: "employees" });
    },
    GoToMachines() {
       this.selectedSection="machine"
      this.$router.push({ name: "machines" });
    },
    GoToIT() {
       this.selectedSection="it"
      this.$router.push({ name: "it" });
    },
    GoToUsers() {
      this.selectedSection="user"
      this.$router.push({ name: "users" });
    },
    GoToUser() {
       this.selectedSection="user"
      const loginStore = JSON.parse(localStorage.getItem("LoginStore"));

      if (loginStore && loginStore.user && loginStore.user._id) {
        this.$router.push({
          name: "profile",
          params: { id: loginStore.user._id },
        });
      } else {
        console.error("Invalid LoginStore data");
      }
    },
  },
});
</script>
<style scoped>
.GNL__toolbar {
  height: 64px;
}
</style>
