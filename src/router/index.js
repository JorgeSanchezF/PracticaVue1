// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Formulario from "../views/Formulario.vue";
import Menu from "../views/Menu.vue";

const routes = [
  { path: "/", component: Formulario },
  { path: "/menu", component: Menu },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
