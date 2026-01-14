const routes = [
  {
    path: "/main",
    name: "mainLayout",
    component: () => import("layouts/MainLayout2.vue"),

    children: [
       {
        path: "",
        name: "dashboard",
        component: () => import("components/DashboardView.vue")
      },

      {
        path: "employees",
        name: "employees",
        component: () => import("components/CenterTable.vue")
      },
      {
        path: "machines",
        name: "machines",
        component: () => import("components/MachineTable.vue")
      },
      {
        path: "it",
        name: "it",
        component: () => import("components/ItTable.vue")
      },
      {
        path: "users",
        name: "users",
        component: () => import("components/UserTable.vue")
      },
      {
        path: "profile/:id",
        name: "profile",
        component: () => import("components/UserView.vue")
      },
    ],
  },
  {
    path: "/",
    name: "login",
    component: () => import("pages/LoginPage.vue"),
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;


