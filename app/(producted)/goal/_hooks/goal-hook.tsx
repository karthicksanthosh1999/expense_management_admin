import { IGoalType } from "@/constants/goalTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import { TGoalValidationSchema } from "@/validation_schema/goal-validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// FILTER TRANSACTION HOOK
// export const useFilterTransaction = (filterData: IGoalType) => {
//   return useQuery({
//     queryKey: ["goals", filterData],
//     queryFn: () => filterGoalApi(filterData),
//     enabled: !!filterData,
//   });
// };

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

// CREATE TRANSACTION API
const createGoalAPI = async (
  goalData: TGoalValidationSchema,
): Promise<IApiResponse<IGoalType>> => {
  const { data } = await api.post("/api/goal", goalData);
  return data;
};

// FILTER TRANSACTION API
// const filterGoalApi = async (
//   filterData: IGoalType,
// ): Promise<IGoalType[]> => {
//   const { data } = await api.post(
//     `/api/transaction/filters?type=${filterData?.type}&category=${filterData?.category}&page=${filterData?.page}&limit=${filterData?.limit}&startDate=${filterData?.startDate}&endDate=${filterData?.endDate}`,
//   );
//   return data?.data;
// };
