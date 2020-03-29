"use strict";

import Vue from "vue";
import App from "@/App.vue";
import store from "./store";
import "./scss/global.scss";

Vue.config.productionTip = false;

new Vue({
    template: "<app/>",
    components: { App },
    store
}).$mount("#app");
