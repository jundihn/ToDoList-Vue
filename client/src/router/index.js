import { createWebHistory, createRouter } from "vue-router";

import Dashboard from "../pages/master/DashboardUI.vue";
import ToDo from "../pages/TodoPage.vue";
import ProjectDone from "../pages/ProjectDone.vue";

const routes = [
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard,
    children: [
      {
        name: "ToDo",
        path: "/todo",
        component: ToDo,
      },
      {
        name: "ProjectDone",
        path: "/done",
        component: ProjectDone,
      },
    ],
  },
];

const router = Router();
export default router;
function Router() {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  return router;
}
