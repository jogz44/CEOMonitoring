const routes = [
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue")
      },
    ],
  },
  // {
  //   path: ''
  // },
  {
    path: "/",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/navbar",
    component: () => import("layouts/NavBar.vue"),
  },
  {
    path: "/test",
    component: () => import("pages/TestOne.vue"),
  },
  {
    path: "/testing",
    component: () => import("pages/TestPage.vue"),
  },
  {
    path: "/view",
    component: () => import("components/UserView.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;


