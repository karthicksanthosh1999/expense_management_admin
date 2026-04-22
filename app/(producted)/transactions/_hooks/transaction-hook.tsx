import {
  ITransaction,
  ITransactionFilteredResponse,
  ITransactionFilterType,
  ITransactionsResponseType,
} from "@/constants/transactionsTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import { TTransactionValidationSchemaType } from "@/validation_schema/transaction-validatino";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// FILTER TRANSACTION HOOK

export const useFilterTransaction = (filterData: ITransactionFilterType) => {
  return useQuery({
    queryKey: ["transactions", filterData],
    queryFn: () => filterTransactionApi(filterData),
    enabled: !!filterData,
  });
};

// CREATE TRANSACTION HOOK
export const useCreateTransactionHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<ITransaction>,
    AxiosError,
    TTransactionValidationSchemaType
  >({
    mutationFn: createTransactionAPI,
    onMutate: () => {
      toast.loading("Transaction Creating...", {
        id: "create-transaction",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction Created Successfully", {
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
// UPDATE TRANSACTION HOOK
export const useUpdateTransactionHook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse<ITransaction>,
    AxiosError,
    TTransactionValidationSchemaType
  >({
    mutationFn: updateTransactionAPI,
    onMutate: () => {
      toast.loading("Transaction Updating...", {
        id: "create-transaction",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction Update Successfully", {
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

// CREATE TRANSACTION API
const createTransactionAPI = async (
  transactionData: TTransactionValidationSchemaType,
): Promise<IApiResponse<ITransaction>> => {
  const { data } = await api.post("/api/transaction", transactionData);
  return data;
};

// FILTER TRANSACTION API
const filterTransactionApi = async (
  filterData: ITransactionFilterType,
): Promise<ITransactionFilteredResponse> => {
  const { data } = await api.post(
    `/api/transaction/filters?type=${filterData?.type}&category=${filterData?.category}&page=${filterData?.page}&limit=${filterData?.limit}&startDate=${filterData?.startDate}&endDate=${filterData?.endDate}`,
  );
  return data?.data;
};

// UPDATE TRANSACTION API
const updateTransactionAPI = async (
  transactionData: TTransactionValidationSchemaType,
): Promise<IApiResponse<ITransaction>> => {
  const { data } = await api.put("/api/transaction", transactionData);
  return data;
};
