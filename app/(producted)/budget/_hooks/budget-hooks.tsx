import { IBudgetFilteredResponse, IBudgetFilterType, IBudgetType } from "@/constants/budgetTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// FILTER BUDGE HOOK
export const useFilterBudget = (filterData: IBudgetFilterType) => {
  return useQuery({
    queryKey: ["budgets", filterData],
    queryFn: () => filterBudgetApi(filterData),
    enabled: !!filterData,
  });
};

// CREATE BUDGET HOOK
export const useCreateBudgetHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<IBudgetType>,
    AxiosError,
    IBudgetType
  >({
    mutationFn: createBudgetApi,
    onMutate: () => {
      toast.loading("Budget Creating...", {
        id: "create-budget",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast.success("Budget Created Successfully", {
        id: "create-budget",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "create-budget",
      });
    },
  });
};

// DELETE BUDGET HOOK
export const useDeleteBudgetHook = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiResponse<IBudgetType>, AxiosError, string >({
    mutationFn: deleteBudgetApi,
    onMutate: () => {
      toast.loading("Budget Deleting...", {
        id: "delete-budget",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast.success("Budget Deleted Successfully", {
        id: "delete-budget",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "delete-budget",
      });
    },
  });
};

// UPDATE BUDGET HOOK
export const useUpdateBudgetHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<IBudgetType>,
    AxiosError,
    IBudgetType
  >({
    mutationFn: updateBudgetApi,
    onMutate: () => {
      toast.loading("Budget Updating...", {
        id: "update-budget",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast.success("Budget Updated Successfully", {
        id: "update-budget",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "update-budget",
      });
    },
  });
};


// CREATE BUDGET API
const createBudgetApi = async(budget: IBudgetType):Promise<IApiResponse<IBudgetType>> => {
    const { data } = await api.post(`/api/budget`, budget);
    return data
}

// UPDATE BUDGET API
const updateBudgetApi = async(budget: IBudgetType):Promise<IApiResponse<IBudgetType>> => {
    const { data } = await api.put(`/api/budget`, budget);
    return data
}

// DELETE BUDGET API
const deleteBudgetApi = async (id:string ): Promise<IApiResponse<IBudgetType>> => {
  const { data } = await api.delete("/api/budget", { data: { id } });
  return data;
};

// FILTER BUDGET API
const filterBudgetApi = async (filterData: IBudgetFilterType): Promise<IBudgetFilteredResponse> => {
  const { data } = await api.post(
    `/api/budget/filters?status=${filterData?.status}&period=${filterData?.period}&page=${filterData?.page}&limit=${filterData?.limit}`,
  );
  return data;
};