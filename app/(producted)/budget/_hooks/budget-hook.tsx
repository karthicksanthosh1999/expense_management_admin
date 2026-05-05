import {
  IBudgetFilteredResponse,
  IBudgetFilterType,
} from "@/constants/budgetTypes";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

// FILTER BUDGET HOOK
export const useFilterGoals = (filterData: IBudgetFilterType) => {
  return useQuery({
    queryKey: ["goals", filterData],
    queryFn: () => filterGoalsApi(filterData),
    enabled: !!filterData,
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
