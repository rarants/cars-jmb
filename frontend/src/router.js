import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login.vue";
import Layout from "./layout/Layout.vue";

import Dashboard from "./views/User/Dashboard.vue";
import Cars from "./views/User/Cars.vue";
import History from "./views/User/History.vue";
import Brands from "./views/User/Brands.vue";

Vue.use(Router);
const router = new Router ({
    linkExactActiveClass: "active",
    mode: "history",
    routes: [
        { 
            path: "/",
            redirect: "login", 
            component: Login
        },
        { 
            path: "/login",
            component: Login
        },
        { 
            path: "/user",
            name: "usuário",
            component: Layout,
            children: [
                {
                    path: "dashboard",
                    name: "Dashboard",
                    component: Dashboard
                },
                {
                    path: "carros",
                    name: "Carros",
                    component: Cars
                },
                {
                    path: "historico",
                    name: "Histórico",
                    component: History
                },
                {
                    path: "marcas",
                    name: "Marcas de carros",
                    component: Brands
                }
            ]
        },
        {
            path: "*",
            redirect: "login", 
            component: Login
        }

    ]
})
export default router;


