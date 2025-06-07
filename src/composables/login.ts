import { reactive } from "vue";
import axiosClient from "../config/axios";
import { useMutation } from "@tanstack/vue-query";

export const loginState = reactive({
  token: localStorage.getItem("token") || "",
});

const logout = async ({}) => {
  const response = await axiosClient.post(
    "users/logout/",
    {},
    { headers: { Authorization: `Bearer ${loginState.token}` } },
  );

  return response.data;
};

export const useLogout = () => useMutation({ mutationFn: logout });
