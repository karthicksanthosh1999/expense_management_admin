import { IWeeklyAIAnalysis } from "@/constants/aiTypes";
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


const weeklyAnalysis = async():Promise<IApiResponse<string>> => {
    const {data} = await api.get(`/api/ai/category`);
    return data
}