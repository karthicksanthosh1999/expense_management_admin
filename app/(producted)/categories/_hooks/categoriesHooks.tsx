import { ICategoryTypes } from "@/constants/categoryTypes";
import api from "@/lib/api"
import { IApiResponse } from "@/lib/constants";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from "axios";
import toast from "react-hot-toast";



// UPDATE CATEGORY HOOK
export const useUpdateCategoryHook = () => {

    const queryClient = useQueryClient()

    return useMutation<
        IApiResponse<ICategoryTypes>,
        AxiosError,
        ICategoryTypes
    >(
        {
            mutationFn: updateCategoryApi,
            onMutate: () => {
                toast.loading("Updating Category...", {
                    id: "update-category"
                })
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["category"] });
                toast.success("Category Updated Successfully", {
                    id: "update-category"
                })
            },
            onError: () => {
                toast.error("Something Went Wrong", {
                    id: "update-category"
                })
            }
        }
    )
}

// DELETE CATEGORY HOOK
export const useDeleteCategoryHook = () => {
    const queryClient = useQueryClient()
    return useMutation<
        IApiResponse<ICategoryTypes>,
        AxiosError,
        string
    >(
        {
            mutationFn: deleteCategoryApi,
            onMutate: () => {
                toast.loading("Deleting Category...", {
                    id: "delete-category",
                });
            },
            onSuccess: () => {
                toast.success("Category Delete Successfully", {
                    id: "delete-category"
                })
                queryClient.invalidateQueries({ queryKey: ['category'] })
            },
            onError: () => {
                toast.error("Something Went Wrong", {
                    id: "delete-category"
                })
            },
        }
    )
}

// GET ALL CATEGORY HOOK
export const useGetAllCategoryHook = () => {
    return useQuery<
        IApiResponse<ICategoryTypes[]>,
        AxiosError
    >(
        {
            queryFn: getAllCategoriesApi,
            queryKey: ["category"]
        }
    )
}
// CREATE CATEGORY HOOK
export const createCategoryMutationHook = () => {
    const queryClient = useQueryClient()
    return useMutation<
        IApiResponse<ICategoryTypes>,
        AxiosError,
        ICategoryTypes
    >(
        {
            mutationFn: createCategory,
            onMutate: () => {
                toast.loading("Creating Category...", {
                    id: "create-category",
                });
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["category"] });
                toast.success("Category Created Successfully", {
                    id: "create-category"
                })
            },
            onError: () => {
                toast.error("Internal Server Error", {
                    id: "create-category"
                })
            }
        }
    )
}

// GET ALL CATEGORY API
const getAllCategoriesApi = async (): Promise<IApiResponse<ICategoryTypes[]>> => {
    const { data } = await api.get("/api/category/getAll")
    return data
}

// DELETE CATEGORY API
const deleteCategoryApi = async (id: string): Promise<IApiResponse<ICategoryTypes>> => {
    const { data } = await api.delete<IApiResponse<ICategoryTypes>>(`/api/category/delete/${id}`);
    return data
}

// UPDATE CATEGORY API
const updateCategoryApi = async (categoryData: ICategoryTypes): Promise<IApiResponse<ICategoryTypes>> => {
    const { data } = await api.put(`/api/category/update/${categoryData?.id}`, categoryData)
    return data
}

// CREATE CATEGORY API
const createCategory = async (categoryData: ICategoryTypes): Promise<IApiResponse<ICategoryTypes>> => {
    const { data } = await api.post<IApiResponse<ICategoryTypes>>("/api/category/create", categoryData);
    return data
}

