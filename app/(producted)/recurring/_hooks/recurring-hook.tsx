import { IGetRecurringTransactionDTO } from "@/constants/recurringTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import { TRecurringTransactionValidationSchemaType } from "@/validation_schema/transaction-validatino";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// FILTER TRANSACTION HOOK
export const useFilterRecurringTransaction = () => {
  return useQuery({
    queryKey: ["transactions" ],
    queryFn: () => filterRecurringTransactionApi(),
  });
};


// CREATE TRANSACTION HOOK
export const useCreateTransactionHook = () => {
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
        id: "create-transaction",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "create-transaction",
      });
    },
  });
};

// DELETE TRANSACTION HOOK
export const useDeleteTransactionHook = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiResponse<IGetRecurringTransactionDTO>, AxiosError, string>({
    mutationFn: deleteRecurringTransactionAPI,
    onMutate: () => {
      toast.loading("Recurring Transaction Deleting...", {
        id: "delete-transaction",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recurring"] });
      toast.success("Recurring Transaction Delete Successfully", {
        id: "delete-transaction",
      });
    },
    onError: () => {
      toast.error("Something Went Wrong", {
        id: "delete-transaction",
      });
    },
  });
};

// UPDATE TRANSACTION HOOK
export const useUpdateTransactionHook = () => {
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


// FILTER TRANSACTION API
const filterRecurringTransactionApi = async (): Promise<IApiResponse<IGetRecurringTransactionDTO[]>> => {
  const { data } = await api.get(`/api/transaction/recurrition`);
  return data;
};


// CREATE TRANSACTION API
const createRecurringTransactionAPI = async (
  transactionData: TRecurringTransactionValidationSchemaType,
): Promise<IApiResponse<IGetRecurringTransactionDTO>> => {
  const { data } = await api.post("/api/transaction/recurrition", transactionData);
  return data;
};

// DELETE TRANSACTION API
const deleteRecurringTransactionAPI = async (
  id: string,
): Promise<IApiResponse<IGetRecurringTransactionDTO>> => {
  const { data } = await api.delete("/api/transaction/recurrition", { data: { id } });
  return data;
};


// UPDATE TRANSACTION API
const updateRecurringTransactionAPI = async (
  transactionData: TRecurringTransactionValidationSchemaType,
): Promise<IApiResponse<IGetRecurringTransactionDTO>> => {
  const { data } = await api.put("/api/transaction", transactionData);
  return data;
};