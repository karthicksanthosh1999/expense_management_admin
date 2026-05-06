import {
  IBudgetFilteredResponse,
  IBudgetFilterType,
} from "@/constants/budgetTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import { TBudgetValidationSchema } from "@/validation_schema/budget-validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// FILTER BUDGET HOOK
export const useFilterGoals = (filterData: IBudgetFilterType) => {
  return useQuery({
    queryKey: ["goals", filterData],
    queryFn: () => filterGoalsApi(filterData),
    enabled: !!filterData,
  });
};

// CREATE GOAL HOOK
export const useCreateBudgetHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<TBudgetValidationSchema>,
    AxiosError,
    TBudgetValidationSchema
  >({
    mutationFn: createBudgetApi,
    onMutate: () => {
      toast.loading("Goal Creating...", {
        id: "create-goals-amount",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Amount Added Successfully", {
        id: "create-goals-amount",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "create-goals-amount",
      });
    },
  });
};

// FILTER BUDGET API
const filterGoalsApi = async (
  filterData: IBudgetFilterType,
): Promise<IBudgetFilteredResponse> => {
  const { data } = await api.post(
    `/api/budget/filters?status=${filterData?.status}&page=${filterData?.page}&limit=${filterData?.limit}`,
  );
  return data?.data;
};

// CREATE BUDGET API
export const createBudgetApi = async (
  budgetData: TBudgetValidationSchema,
): Promise<TBudgetValidationSchema> => {
  const { data } = await api.post(`/api/budget`, budgetData);
  return data;
};
