import { createApp } from "vue";
import "./style.css";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles/main.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { VueQueryPlugin } from "@tanstack/vue-query";

import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(vuetify);
app.use(VueQueryPlugin);

app.mount("#app");
