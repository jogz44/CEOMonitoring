import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';
import routes from './routes';

function isAuthenticated() {
  // Replace this with your actual authentication logic,
  // such as checking for a token or user session
  return localStorage.getItem('token') !== null;
}

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER ? createMemoryHistory : createWebHistory;

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  router.beforeEach((to, from, next) => {
    const isAuthenticated = window.localStorage.getItem('LoginStore') !== null;

    // If the user is not authenticated and is trying to access a protected route, redirect to login
    if (!isAuthenticated && to.path !== '/' ) {
      next('/');
    } else {
      next();
    }
  });

  return router;
});
