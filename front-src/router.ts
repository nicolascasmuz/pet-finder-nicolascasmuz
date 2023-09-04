import { Router } from "@vaadin/router";

const root = document.querySelector(".root") as HTMLElement;

const router = new Router(root);
router.setRoutes([
  { path: "/", component: "main-page" },
  { path: "/main", component: "main-page" },
  { path: "/log-in", component: "log-in-page" },
  { path: "/sign-up", component: "sign-up-page" },
  { path: "/location", component: "location-page" },
  { path: "/home", component: "home-page" },
  { path: "/my-data", component: "my-data-page" },
  { path: "/edit-data", component: "edit-data-page" },
  { path: "/edit-pass", component: "edit-pass-page" },
  { path: "/reported-pets", component: "reported-pets-page" },
  { path: "/no-reported-pets", component: "no-reported-pets-page" },
  { path: "/new-report", component: "new-report-page" },
  { path: "/edit-report", component: "edit-report-page" },
  { path: "/new-reported-pet", component: "new-reported-pet-page" },
  { path: "/found-pet", component: "found-pet-page" },
  { path: "/deleted-pet", component: "deleted-pet-page" },
  { path: "/map", component: "map-page" },
  { path: "(.*)", redirect: "/main" },
]);
