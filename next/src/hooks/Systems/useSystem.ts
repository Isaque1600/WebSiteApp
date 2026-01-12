import api from "@/lib/axios";
import { SystemFilter } from "@/types/Filter";
import { System, SystemFormData } from "@/types/System";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const SYSTEMS_QUERY_KEY = ["systems"];

async function fetchSystems({
  page,
  per_page,
  search,
  search_by,
}: SystemFilter) {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (per_page) params.append("per_page", per_page);
    if (search) params.append("search", search);
    if (search_by) params.append("filter", search_by);

    const response = await api.get(`/system?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching systems:", error);
    throw error;
  }
}

async function fetchSystemById(id: number) {
  try {
    const response = await api.get(`/system/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching system:", error);
    throw error;
  }
}

async function fetchUsersQuantityBySystemId(id: number) {
  try {
    const response = await api.get(`/system/${id}/users/count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users quantity for system:", error);
    throw error;
  }
}

async function createSystem(data: SystemFormData) {
  try {
    const response = await api.post(`/system`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating system:", error);
    throw error;
  }
}

async function updateSystem(id: number, data: SystemFormData) {
  try {
    const response = await api.put(`/system/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating system:", error);
    throw error;
  }
}

async function deleteSystem(id: number) {
  try {
    const response = await api.delete(`/system/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting system:", error);
    throw error;
  }
}

export const useSystem = () => {
  const queryClient = useQueryClient();

  const get = (filters: SystemFilter = {}) =>
    useQuery({
      queryKey: [...SYSTEMS_QUERY_KEY, filters],
      queryFn: () => fetchSystems(filters),
    });

  const getById = (id: number, options?: { enabled?: boolean }) =>
    useQuery({
      queryKey: [...SYSTEMS_QUERY_KEY, id],
      queryFn: () => fetchSystemById(id),
      enabled: !!id && (options?.enabled ?? true),
    });

  const getUsersQuantityBySystemId = (id: number) =>
    useQuery({
      queryKey: [...SYSTEMS_QUERY_KEY, id, "usersQuantity"],
      queryFn: () => fetchUsersQuantityBySystemId(id),
      enabled: !!id,
    });

  const create = () =>
    useMutation({
      mutationFn: (data: SystemFormData) => createSystem(data),
      onMutate: async (variables) => {
        queryClient.cancelQueries({ queryKey: SYSTEMS_QUERY_KEY });

        const previousData = queryClient.getQueriesData({
          queryKey: SYSTEMS_QUERY_KEY,
        });

        queryClient.setQueriesData(
          { queryKey: SYSTEMS_QUERY_KEY },
          (oldData: System[] | undefined) => {
            if (!oldData || !Array.isArray(oldData)) return oldData;

            return [...oldData, { ...variables }];
          },
        );
        return { previousData };
      },
      onError: (_err, _, context) => {
        toast.error("Erro ao criar sistema.", { id: "error" });
        if (context?.previousData) {
          queryClient.setQueriesData(
            { queryKey: SYSTEMS_QUERY_KEY },
            context.previousData,
          );
        }
      },
      onSettled: (_, error) => {
        if (!error) {
          toast.success("Sistema criado com sucesso!", { id: "created" });
        }
        queryClient.invalidateQueries({ queryKey: SYSTEMS_QUERY_KEY });
      },
    });

  const update = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: number; data: SystemFormData }) =>
        updateSystem(id, data),
      onMutate: async (_, __) => {
        queryClient.cancelQueries({ queryKey: SYSTEMS_QUERY_KEY });

        const previousData = queryClient.getQueriesData({
          queryKey: SYSTEMS_QUERY_KEY,
        });

        return { previousData };
      },
      onError: (_err, __, context) => {
        toast.error("Erro ao atualizar sistema.", { id: "error" });
        if (context?.previousData) {
          queryClient.setQueriesData(
            { queryKey: SYSTEMS_QUERY_KEY },
            context.previousData,
          );
        }
      },
      onSettled: (_, error) => {
        if (!error) {
          toast.success("Sistema atualizado com sucesso!", { id: "updated" });
        }
        queryClient.invalidateQueries({ queryKey: SYSTEMS_QUERY_KEY });
      },
    });

  const remove = () =>
    useMutation({
      mutationFn: (id: number) => deleteSystem(id),
      onMutate: async (id) => {
        queryClient.cancelQueries({ queryKey: SYSTEMS_QUERY_KEY });

        const previousData = queryClient.getQueriesData({
          queryKey: SYSTEMS_QUERY_KEY,
        });

        queryClient.setQueriesData(
          { queryKey: SYSTEMS_QUERY_KEY },
          (oldData: System[] | undefined) => {
            if (!oldData || !Array.isArray(oldData)) return oldData;

            return oldData.filter((system) => system.id !== id);
          },
        );

        return { previousData };
      },
      onError: (_err, __, context) => {
        toast.error("Erro ao deletar sistema.", { id: "error" });
        if (context?.previousData) {
          queryClient.setQueriesData(
            { queryKey: SYSTEMS_QUERY_KEY },
            context.previousData,
          );
        }
      },
      onSettled: (_, error) => {
        if (!error) {
          toast.success("Sistema deletado com sucesso!", { id: "deleted" });
        }
        queryClient.invalidateQueries({ queryKey: SYSTEMS_QUERY_KEY });
      },
    });

  return {
    get,
    getById,
    getUsersQuantityBySystemId,
    create,
    update,
    remove,
  };
};
