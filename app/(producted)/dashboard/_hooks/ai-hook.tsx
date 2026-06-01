import { IWeeklyBarChartType } from "@/constants/transactionsTypes";
import api from "@/lib/api";
import { IApiResponse } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export const useWeeklyAnalysisHook = () => {
    return useQuery({
        queryKey:['ai-weekly'],
        queryFn: weeklyAnalysis,
        staleTime: 1000 * 60 * 30,
        gcTime:1000 * 60 * 60,
    })
}

export const useWeeklyBarChartHook = () => {
    return useQuery({
        queryKey:['weekly-bar-chart'],
        queryFn: weeklyBarChart,
        staleTime: 1000 * 60 * 30,
        gcTime:1000 * 60 * 60,
    })
}


const weeklyAnalysis = async():Promise<IApiResponse<string>> => {
    const {data} = await api.get(`/api/ai/category`);
    return data
}


const weeklyBarChart = async():Promise<IApiResponse<IWeeklyBarChartType[]>> => {
    const {data} = await api.get(`api/transaction/charts/weekly-bar-chart`);
    return data
}