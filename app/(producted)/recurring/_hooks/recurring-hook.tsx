import { IGetRecurringTransactionDTO } from "@/constants/recurringTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import { TRecurringTransactionValidationSchemaType } from "@/validation_schema/transaction-validatino";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// FILTER RECURRING TRANSACTION HOOK
export const useFilterRecurringTransaction = () => {
  return useQuery({
    queryKey: ["recurring" ],
    queryFn: () => filterRecurringTransactionApi(),
  });
};


// CREATE RECURRING TRANSACTION HOOK
export const useCreateRecurringTransactionHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<IGetRecurringTransactionDTO>,
    AxiosError,
    TRecurringTransactionValidationSchemaType
  >({
    mutationFn: createRecurringTransactionAPI,
    onMutate: () => {
      toast.loading("Recurring Transaction Creating...", {
        id: "create-recurring-transaction",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
      toast.success("Recurring Transaction Created Successfully", {
        id: "create-recurring-transaction",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "create-recurring-transaction",
      });
    },
  });
};

// DELETE RECURRING TRANSACTION HOOK
export const useDeleteRecurringTransactionHook = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiResponse<IGetRecurringTransactionDTO>, AxiosError, string>({
    mutationFn: deleteRecurringTransactionAPI,
    onMutate: () => {
      toast.loading("Recurring Transaction Deleting...", {
        id: "delete-recurring-transaction",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
      toast.success("Recurring Transaction Delete Successfully", {
        id: "delete-recurring-transaction",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "delete-recurring-transaction",
      });
    },
  });
};

// UPDATE RECURRING TRANSACTION HOOK
export const useUpdateRecurringTransactionHook = () => {
  const queryClient = useQueryClient();    
  return useMutation<
    IApiResponse<IGetRecurringTransactionDTO>,
    AxiosError,
    TRecurringTransactionValidationSchemaType
  >({
    mutationFn: updateRecurringTransactionAPI,
    onMutate: () => {
      toast.loading("Transaction Updating...", {
        id: "create-transaction",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
      
      toast.success("Recurring Transaction Update Successfully", {
        id: "update-recurring-transaction",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "update-recurring-transaction",
      });
    },
  });
};


// FILTER RECURRING TRANSACTION API
const filterRecurringTransactionApi = async (): Promise<IApiResponse<IGetRecurringTransactionDTO[]>> => {
  const { data } = await api.get(`/api/transaction/recurrition`);
  return data;
};


// CREATE RECURRING TRANSACTION API
const createRecurringTransactionAPI = async (
  transactionData: TRecurringTransactionValidationSchemaType,
): Promise<IApiResponse<IGetRecurringTransactionDTO>> => {
  const { data } = await api.post("/api/transaction/recurrition", transactionData);
  return data;
};

// DELETE RECURRING TRANSACTION API
const deleteRecurringTransactionAPI = async (
  id: string,
): Promise<IApiResponse<IGetRecurringTransactionDTO>> => {
  const { data } = await api.delete(`/api/transaction/recurrition/${id}`);
  return data;
};


// UPDATE RECURRING TRANSACTION API
const updateRecurringTransactionAPI = async (
  transactionData: TRecurringTransactionValidationSchemaType,
): Promise<IApiResponse<IGetRecurringTransactionDTO>> => {
  const { data } = await api.put("/api/transaction/recurrition", transactionData);
  return data;
};