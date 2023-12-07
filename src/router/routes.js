
const routes = [
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  // {
  //   path: ''
  // },
  {
    path: '/login',
    component: () => import ('pages/LoginPage.vue'),
  },
  {
    path: '/navbar',
    component: () => import ('layouts/NavBar.vue'),
  },
  {
    path: '/test',
    component: () => import ('pages/TestOne.vue'),
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
