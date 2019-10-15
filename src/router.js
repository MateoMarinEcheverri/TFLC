import Vue from "vue";
import Router from "vue-router";
import AuthGuard from './authguard'

const routerOptions = [
  { path: "/", component: "SignIn" },
  { path: "/signin", component: "SignIn" },
  { path: "/signup", component: "SignUp" },
  { path: "/users", component: "Users" , beforeEnter: AuthGuard},
  { path: "/dependencies", component: "Dependencies" , beforeEnter: AuthGuard},
  { path: "/TFLC", component: "SignIn" },
  { path: "*", component: "NotFound" }
];

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`./views/${route.component}.vue`)
  };
});

Vue.use(Router);

export default new Router({
  mode: "history",
  routes
});
