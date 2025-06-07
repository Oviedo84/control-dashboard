import axiosInstance from "../../../config/axios";
import { useMutation } from "@tanstack/vue-query";
import { loginState } from "../../../composables/login";

import type { ReferenceValue } from "../types/reference-value.types";

const updateReferenceValue = async (value: number) => {
  const response = await axiosInstance.post<ReferenceValue>(
    "reference-value/",
    { value },
    { headers: { Authorization: `Bearer ${loginState.token}` } },
  );

  return response.data;
};

export const useUpdateReferenceValue = () =>
  useMutation({
    mutationFn: updateReferenceValue,
  });
