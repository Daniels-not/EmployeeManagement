import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (dashBoard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../components/dashBoard"),
  },
  {
    path: "/new",
    name: "newEmployee",
    // route level code-splitting
    // this generates a separate chunk (newEmployee.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "newEmployee" */ "../components/newEmployee"),
  },
  {
    path: "/edit/:employee_id",
    name: "editEmployee",
    // route level code-splitting
    // this generates a separate chunk (editEmployee.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "editEmployee" */ "../components/editEmployee"
      ),
  },
  {
    path: "/:employee_id",
    name: "viewEmployee",
    // route level code-splitting
    // this generates a separate chunk (viewEmployee.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "viewEmployee" */ "../components/viewEmployee"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
