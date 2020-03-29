"use strict";

import Vue from "vue";
import App from "@/App.vue";

import store from "./store";

Vue.config.productionTip = false;

new Vue({
    template: "<app/>",
    components: { App },
    store
}).$mount("#app");
