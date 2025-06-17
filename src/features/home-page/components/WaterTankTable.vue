<template>
  <v-container fluid class="fill-height d-flex justify-center align-center">
    <v-card class="pa-4" style="width: 100vw; height: 90vh; overflow: auto">
      <v-data-table-server
        :headers="headers"
        :items="data?.items"
        :loading="isPending"
        :items-length="data?.totalItems || 0"
        :page="options.page"
        :items-per-page-options="[10, 25, 50, 100]"
        v-model:items-per-page="options.itemsPerPage"
        @update:options="updateOptions"
        class="h-100 w-100"
      >
        <template v-slot:item.createdAt="{ item }: { item: WaterTank }">
          {{ new Date(item.createdAt).toLocaleString() }}
        </template>
      </v-data-table-server>
      <v-btn
        v-if="loginState.token"
        color="blue-grey-darken-2"
        class="position-absolute"
        style="bottom: 1rem; left: 1rem"
        icon="mdi-pencil"
        @click="openDialog"
      >
      </v-btn>
    </v-card>
  </v-container>
  <UpdateReferenceValueDialog v-model="dialog" />
</template>

<script setup lang="ts">
import { ref } from "vue";

import UpdateReferenceValueDialog from "./UpdateReferenceValueDialog.vue";

import type { DataTableHeader } from "vuetify/lib/types.mjs";
import type { WaterTank, TableOptions } from "../types/water-tank.types";

import { loginState } from "../../../composables/login";

import { useWaterTank } from "../api/get-water-tank";

const headers = ref<DataTableHeader[]>([
  {
    title: "Nivel del Agua (cm)",
    align: "start",
    key: "waterLevel",
  },
  { title: "Nivel de Referencia (cm)", align: "end", key: "referenceValue" },
  {
    title: "Flujo de Entrada (mm^3/s)",
    align: "end",
    key: "inflow",
  },
  { title: "Flujo de Salida (mm^3/s)", align: "end", key: "outflow" },
  {
    title: "Fecha y Hora",
    align: "end",
    key: "createdAt",
  },
]);

const options = ref<TableOptions>({
  page: 1,
  itemsPerPage: 10,
});

const dialog = ref(false);

const { isPending, data } = useWaterTank(options);

function updateOptions(newOptions: TableOptions) {
  options.value = newOptions;
}

const openDialog = () => {
  dialog.value = true;
};
</script>
