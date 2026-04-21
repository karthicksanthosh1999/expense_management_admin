import {
  IGoalAmountType,
  IGoalFilteredResponse,
  IGoalFilterType,
  IGoalType,
} from "@/constants/goalTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import {
  TGoalAmountValidationSchema,
  TGoalValidationSchema,
} from "@/validation_schema/goal-validation";
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

// CREATE GOAL AMOUNT HOOK
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
      queryClient.invalidateQueries({ queryKey: ["goals_amount"] });
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

// UPDATE GOAL AMOUNT HOOK
export const useUpdateGoalAmountHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<IGoalAmountType>,
    AxiosError,
    TGoalAmountValidationSchema
  >({
    mutationFn: updateGoalAmountApi,
    onMutate: () => {
      toast.loading("Goal Creating...", {
        id: "create-goals",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals_amount"] });
      toast.success("Goal Amount Update Successfully", {
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

// GET SINGLE GOAL AMOUNT HOOK
export const useGetSingleGoalAmountHook = (goalId: string) => {
  return useQuery({
    queryKey: ["goals_amount", goalId],
    queryFn: () => getSingleGoalAmountApi(goalId),
    enabled: !!goalId,
  });
};

// DELETE GOAL AMOUNT HOOK
export const useDeleteGoalAmountHook = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiResponse<IGoalAmountType>, AxiosError, { id: string }>(
    {
      mutationFn: deleteGoalHistoryApi,
      onMutate: () => {
        toast.loading("Goal History Deleting...", {
          id: "delete-goals",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["goals_amount"] });
        toast.success("Goal History Deleted Successfully", {
          id: "delete-goals",
        });
      },
      onError: () => {
        toast.error("Something Went Wrong", {
          id: "delete-goals",
        });
      },
    },
  );
};

// CREATE GOAL HOOK
export const useCreateGoalAmountHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<IGoalAmountType>,
    AxiosError,
    TGoalAmountValidationSchema
  >({
    mutationFn: createGoalAmountApi,
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

// UPDATE GOAL HOOK
export const useUpdateGoalHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<IGoalType>,
    AxiosError,
    TGoalValidationSchema
  >({
    mutationFn: updateGoalApi,
    onMutate: () => {
      toast.loading("Goal Updating...", {
        id: "goals",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Amount Updated Successfully", {
        id: "goals",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "goals",
      });
    },
  });
};

// DELETE GOAL HOOK
export const useDeleteGoalHook = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiResponse<IGoalType>, AxiosError, { id: string }>({
    mutationFn: deleteGoalAPI,
    onMutate: () => {
      toast.loading("Goal Creating...", {
        id: "delete-goals",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal Deleted Successfully", {
        id: "delete-goals",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "delete-goals",
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

// CREATE GOALS API
const updateGoalApi = async (
  goalData: TGoalValidationSchema,
): Promise<IApiResponse<IGoalType>> => {
  const { data } = await api.put("/api/goal", goalData);
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

// DELETE GOALS API
const deleteGoalAPI = async (id: {
  id: string;
}): Promise<IApiResponse<IGoalType>> => {
  const { data } = await api.delete("/api/goal", { data: id });
  return data;
};

// CREATE GOAL AMOUNT API
const createGoalAmountApi = async (
  goalData: TGoalAmountValidationSchema,
): Promise<IApiResponse<IGoalAmountType>> => {
  const { data } = await api.post("/api/goal/amount", goalData);
  return data;
};

// UPDATE GOAL AMOUNT API
const updateGoalAmountApi = async (
  goalData: TGoalAmountValidationSchema,
): Promise<IApiResponse<IGoalAmountType>> => {
  const { data } = await api.put("/api/goal/amount", goalData);
  return data;
};

// GET SINGLE GOAL AMOUNT DETAILS
const getSingleGoalAmountApi = async (
  goalId: string,
): Promise<IApiResponse<IGoalAmountType[]>> => {
  const { data } = await api.get(`/api/goal/amount?goalId=${goalId}`);
  return data;
};

// DELETE GOALS HISTORY API
const deleteGoalHistoryApi = async (id: {
  id: string;
}): Promise<IApiResponse<IGoalAmountType>> => {
  const { data } = await api.delete(`/api/goal/amount?goalId=${id}`, {
    data: id,
  });
  return data;
};
