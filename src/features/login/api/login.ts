import { useMutation } from "@tanstack/vue-query";

import axiosClient from "../../../config/axios";

import type { Login, LogedIn } from "../types/login.types";

const login = async (data: Login) => {
  const response = await axiosClient.post<LogedIn>("users/login/", data);

  return response.data;
};

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });
