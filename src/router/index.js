import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "@/components/SignUp.vue";
import ViewProfile from "@/components/ViewProfile.vue";
import LoginPage from "@/components/LoginPage.vue";
import LogoutPage from "@/components/LogoutPage.vue";
import EditProfile from "@/components/EditProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/signUp",
    name: "signUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/viewProfile",
    name: "viewProfile",
    component: ViewProfile,
  },
  {
    path: "/editProfile",
    name: "editProfile",
    component: EditProfile,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
