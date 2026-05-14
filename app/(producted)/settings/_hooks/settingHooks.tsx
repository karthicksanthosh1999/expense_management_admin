import { ISettings } from "@/constants/settingsTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import { TSettingValidationSchema } from "@/validation_schema/setting-validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// GET SETTING HOOK
export const useGetSettingsHooks = (id:string) => {
    return useQuery({
        queryKey: ['settings', id],
        queryFn: () => getSettingsApi(id),
    })
}
// UPDATE SETTING HOOK
export const useUpdateSettingHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<ISettings>,
    AxiosError,
    TSettingValidationSchema
  >({
    mutationFn: updateSettingApi,
    onMutate: () => {
      toast.loading("Setting Updating...", {
        id: "settings",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Setting Updated Successfully", {
        id: "settings",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "settings",
      });
    },
  });
};

// GET SETTINGS API
export const getSettingsApi = async(id:string):Promise<IApiResponse<ISettings>> => {
    const {data} = await api.get(`/api/settings?id=${id}`);
    return data;
}
// UPDATE SETTINGS API
export const updateSettingApi = async(settingData: TSettingValidationSchema):Promise<IApiResponse<ISettings>> => {
    const {data} = await api.put("/api/settings", settingData);
    return data;
}