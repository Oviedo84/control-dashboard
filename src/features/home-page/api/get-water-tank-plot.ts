import axiosInstance from "../../../config/axios";
import { useQuery } from "@tanstack/vue-query";

import type { WaterTank } from "../types/water-tank.types";

import type { PaginatedResponse } from "../../../types/common.types";

const getWaterTankPlot = async () => {
  const response = await axiosInstance.get<PaginatedResponse<WaterTank>>(
    "water-tank/",
    {
      params: { pageSize: 60 },
    },
  );

  return response.data.items;
};

export const useWaterTankPlot = () =>
  useQuery({
    queryKey: ["water-tank-plot"],
    queryFn: () => getWaterTankPlot(),
    refetchInterval: 30 * 1000,
  });
