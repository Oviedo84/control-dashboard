<template>
  <v-layout>
    <v-app-bar color="blue-grey-darken-1" density="compact">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>Tanque Control</v-app-bar-title>

      <template v-slot:append>
        <v-btn v-if="!loginState.token" @click="openDialog">login</v-btn>
        <v-btn v-else @click="logout">logout</v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
    >
      <v-list>
        <v-list-item
          link
          :active="homeState.option == 1"
          @click="handleTableButton"
          title="Tabla"
        ></v-list-item>
        <v-list-item
          link
          :active="homeState.option == 2"
          @click="handlePlotButton"
          title="Gráfica"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot></slot>
      <LoginDialog v-model="dialog" />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { loginState, useLogout } from "../composables/login";
import { homeState } from "../composables/home";
import LoginDialog from "../features/login";

const dialog = ref(false);

const drawer = ref(false);

const logoutMutation = useLogout();

const openDialog = () => (dialog.value = true);

const handleTableButton = () => {
  drawer.value = false;
  homeState.option = 1;
};

const handlePlotButton = () => {
  drawer.value = false;
  homeState.option = 2;
};

const logout = () => {
  logoutMutation.mutate(
    {},
    {
      onSuccess: () => {
        localStorage.removeItem("token");
        loginState.token = "";
      },
    },
  );
};
</script>
