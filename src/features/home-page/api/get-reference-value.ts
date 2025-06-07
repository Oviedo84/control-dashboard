import axiosInstance from "../../../config/axios";
import { useQuery } from "@tanstack/vue-query";

import type { ReferenceValue } from "../types/reference-value.types";

const getReferenceValue = async () => {
  const response = await axiosInstance.get<ReferenceValue>("reference-value/");

  return response.data;
};

export const useReferenceValue = () =>
  useQuery({
    queryKey: ["reference-value"],
    queryFn: () => getReferenceValue(),
    staleTime: 0,
  });
