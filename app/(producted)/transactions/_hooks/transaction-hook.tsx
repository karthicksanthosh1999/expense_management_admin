import {
  IOverallAmountType,
  IOverallAmountInputType,
  ITopTransactionType,
  ITransaction,
  ITransactionFilteredResponse,
  ITransactionFilterType,
  ITransactionPieChartType,
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

export const useSpendingPieChartHook = () => {
  return useQuery({
    queryKey: ["pi-chart","transactions"],
    queryFn: spendingPieChartApi,
  });
};

// TOP TRANSACTION HOOK
export const useTopTransactionHook = () => {
  return useQuery({
    queryKey: ["top-transaction","transactions"],
    queryFn: topTransactionApi,
  });
};

// OVERALL TRANSACTION DETAILS
export const useOverAllTransactionDetailsHook = (
  dates: IOverallAmountInputType,
) => {
  return useQuery({
    queryKey: ["transactions-amount", dates],
    queryFn: () => overallAmountDetails(dates),
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

// DELETE TRANSACTION HOOK
export const useDeleteTransactionHook = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiResponse<ITransaction>, AxiosError, string>({
    mutationFn: deleteTransactionAPI,
    onMutate: () => {
      toast.loading("Transaction Deleting...", {
        id: "delete-transaction",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction Delete Successfully", {
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

// DELETE TRANSACTION API
const deleteTransactionAPI = async (
  id: string,
): Promise<IApiResponse<ITransaction>> => {
  const { data } = await api.delete("/api/transaction", { data: { id } });
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

// TOP-TRANSACTION API
const topTransactionApi = async (): Promise<
  IApiResponse<ITopTransactionType[]>
> => {
  const { data } = await api.get("/api/transaction/top-transaction");
  return data;
};

// OVERALL AMOUNT DETAILS
const overallAmountDetails = async (
  dates: IOverallAmountInputType,
): Promise<IApiResponse<IOverallAmountType>> => {
  const { data } = await api.post("/api/transaction/top-transaction", dates);
  return data;
};

// SPENDING PIE-CHART TRANSACTIONS API
const spendingPieChartApi = async (): Promise<
  IApiResponse<ITransactionPieChartType[]>
> => {
  const { data } = await api.get(`/api/transaction/charts/spending-pie-chart`);
  return data;
};
