import axiosInstance from "../../../config/axios";
import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";

import type { WaterTank, TableOptions } from "../types/water-tank.types";

import type { PaginatedResponse } from "../../../types/common.types";

const getWaterTank = async (options: Ref<TableOptions>) => {
  const params = {
    page: options.value.page,
    pageSize: options.value.itemsPerPage,
  };
  const response = await axiosInstance.get<PaginatedResponse<WaterTank>>(
    "water-tank/",
    {
      params,
    },
  );

  return response.data;
};

export const useWaterTank = (options: Ref<TableOptions>) =>
  useQuery({
    queryKey: ["water-tank", { options }],
    queryFn: () => getWaterTank(options),
  });
