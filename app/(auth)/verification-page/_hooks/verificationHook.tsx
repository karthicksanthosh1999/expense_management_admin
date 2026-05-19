// UPDATE PASSWORD

import { IOTPTypes, IUser } from "@/constants/UserTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// UPDATE USER HOOK
export const useUpdateUserHook = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiResponse<IUser>, AxiosError, IOTPTypes>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Password Updated Successfully", {
        id: "create-goals",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "create-goals",
      });
    },
  });
};

export const updateUser = async (
  otp: IOTPTypes,
): Promise<IApiResponse<IUser>> => {
  console.log(otp)
  const { data } = await api.post(`/api/auth/verify-otp`, otp);
  return data;
};
