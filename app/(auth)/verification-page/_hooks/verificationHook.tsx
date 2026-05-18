// UPDATE PASSWORD

import { IUser } from "@/constants/UserTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import { TUserValidationSchema } from "@/validation_schema/user-validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// UPDATE USER HOOK
export const useUpdateUserHook = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiResponse<IUser>, AxiosError, TUserValidationSchema>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User Created Successfully", {
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
  user: TUserValidationSchema,
): Promise<IApiResponse<IUser>> => {
  const { data } = await api.put(`/api/auth/register`, user);
  return data;
};
