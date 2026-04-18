import {
  IGoalFilteredResponse,
  IGoalFilterType,
  IGoalType,
} from "@/constants/goalTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import { TGoalValidationSchema } from "@/validation_schema/goal-validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// FILTER TRANSACTION HOOK
export const useFilterGoals = (filterData: IGoalFilterType) => {
  return useQuery({
    queryKey: ["goals", filterData],
    queryFn: () => filterGoalsApi(filterData),
    enabled: !!filterData,
  });
};

// CREATE TRANSACTION HOOK
export const useCreateGoalHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<IGoalType>,
    AxiosError,
    TGoalValidationSchema
  >({
    mutationFn: createGoalAPI,
    onMutate: () => {
      toast.loading("Goal Creating...", {
        id: "create-goals",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal Created Successfully", {
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

// CREATE GOALS API
const createGoalAPI = async (
  goalData: TGoalValidationSchema,
): Promise<IApiResponse<IGoalType>> => {
  const { data } = await api.post("/api/goal", goalData);
  return data;
};

// FILTER GOALS API
const filterGoalsApi = async (
  filterData: IGoalFilterType,
): Promise<IGoalFilteredResponse> => {
  const { data } = await api.post(
    `/api/goal/filters?status=${filterData?.status}&page=${filterData?.page}&limit=${filterData?.limit}`,
  );
  return data?.data;
};
