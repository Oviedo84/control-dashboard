<template>
  <DefaultLayout>
    <WaterTankTable v-if="homeState.option == 1" />
    <WaterTankChart v-else />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { homeState } from "../../composables/home";
import DefaultLayout from "../../layouts/DefaultLayout.vue";
import WaterTankTable from "./components/WaterTankTable.vue";
import WaterTankChart from "./components/WaterTankChart.vue";
</script>
