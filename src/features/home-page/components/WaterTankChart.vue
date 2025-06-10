<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import type { EChartsOption } from "echarts";
import VChart from "vue-echarts";
import { computed } from "vue";

import { useWaterTankPlot } from "../api/get-water-tank-plot";

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
]);

const { data } = useWaterTankPlot();

const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: "Nivel del Agua Respecto al Tiempo",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      type: "category",
      data:
        data?.value?.map((value) =>
          new Date(value.createdAt).toLocaleString(),
        ) || [],
      inverse: true,
      axisLabel: {
        rotate: 45,
        interval: 0,
        formatter: (value) => value.split(" ")[1],
      },
    },
    yAxis: { type: "value" },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["Nivel de Referencia", "Nivel del Agua"],
    },
    series: [
      {
        name: "Nivel de Referencia",
        type: "line",
        data: data?.value?.map((value) => value.referenceValue) || [],
      },
      {
        name: "Nivel del Agua",
        type: "bar",
        data: data?.value?.map((value) => value.waterLevel) || [],
      },
    ],
    color: ["#F4511E", "#3398DB"],
  };
});
</script>

<style scoped>
.chart {
  height: 100%;
}
</style>
