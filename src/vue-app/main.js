"use strict";

import Vue from "vue";
import VueKonva from 'vue-konva'
import App from "@/App.vue";
import store from "./store";
import "prismjs";
import "prismjs/themes/prism.css";
import "./scss/global.scss";
 

Vue.use(VueKonva)

Vue.config.productionTip = false;

new Vue({
    template: "<app/>",
    components: { App },
    store
}).$mount("#app");
