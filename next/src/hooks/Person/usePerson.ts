import api from "@/lib/axios";
import { PersonFilter } from "@/types/Filter";
import { Person, PersonFormData } from "@/types/Person";
import {
  keepPreviousData,
  useMutation,
  usePrefetchQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const PERSON_QUERY_KEY = ["persons"];

async function fetchUsers({
  type,
  page,
  per_page,
  search,
  search_by,
  status,
}: PersonFilter) {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (per_page) params.append("per_page", per_page);
    if (search) params.append("search", search);
    if (search_by) params.append("filter", search_by);
    if (status) params.append("status", status);

    const response = await api.get(`/person/type/${type}?${params.toString()}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function fetchClients({
  userId,
  search,
  search_by,
}: {
  search?: string;
  search_by?: string;
  userId: string;
}) {
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (search_by) params.append("filter", search_by);

    const response = await api.get(`/client/${userId}?${params.toString()}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function fetchUserById(id: string) {
  try {
    const response = await api.get(`/person/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function createPerson(data: PersonFormData) {
  try {
    console.log(data);
    const response = await api.post(`/person/${data.tipo}`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating person:", error);
    throw error;
  }
}

async function updatePerson(
  id: string,
  currentType: string,
  data: Partial<PersonFormData>,
) {
  try {
    const response = await api.put(`/person/${currentType}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating person:", error);
    throw error;
  }
}

async function deletePerson(id: string) {
  try {
    const response = await api.delete(`/person/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting person:", error);
    throw error;
  }
}

export const usePerson = () => {
  const queryClient = useQueryClient();

  const get = (filters: PersonFilter = {}) =>
    useQuery({
      queryKey: [...PERSON_QUERY_KEY, filters],
      queryFn: () => fetchUsers(filters),
      placeholderData: keepPreviousData,
    });

  const getClients = (filters: {
    search?: string;
    search_by?: string;
    userId: string;
  }) =>
    useQuery({
      queryKey: [...PERSON_QUERY_KEY, "clients", filters],
      queryFn: () => fetchClients(filters),
      placeholderData: keepPreviousData,
    });

  const prefetchNextPage = ({ page, ...filters }: PersonFilter) =>
    usePrefetchQuery({
      queryKey: [...PERSON_QUERY_KEY, { page: page! + 1, ...filters }],
      queryFn: () => fetchUsers({ page: String(+page! + 1), ...filters }),
    });

  const getById = (id: string, option?: { enabled?: boolean }) =>
    useQuery({
      queryKey: [...PERSON_QUERY_KEY, id],
      queryFn: () => fetchUserById(id),
      enabled: !!id && (option?.enabled ?? true),
    });

  const create = useMutation({
    mutationFn: (data: PersonFormData) => createPerson(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: PERSON_QUERY_KEY });

      const previousData = queryClient.getQueriesData({
        queryKey: PERSON_QUERY_KEY,
      });

      queryClient.setQueriesData(
        { queryKey: PERSON_QUERY_KEY },
        (oldData: Person[] | undefined) => {
          if (!oldData || !Array.isArray(oldData)) return oldData;

          return [...oldData, { ...data }];
        },
      );

      return { previousData };
    },
    onError: (_, __, context) => {
      toast.error("Erro ao criar pessoa.", { id: "error" });

      // Restore all previous query data
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: (_, error) => {
      if (!error) {
        toast.success("Pessoa criada com sucesso!", { id: "created" });
      }
      queryClient.invalidateQueries({ queryKey: PERSON_QUERY_KEY });
    },
  });

  const update = useMutation({
    mutationFn: ({
      id,
      currentType,
      data,
    }: {
      id: string;
      currentType: string;
      data: Partial<PersonFormData>;
    }) => updatePerson(id, currentType, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: PERSON_QUERY_KEY });

      const previousData = queryClient.getQueriesData({
        queryKey: PERSON_QUERY_KEY,
      });

      queryClient.setQueriesData(
        { queryKey: PERSON_QUERY_KEY },
        (oldData: Person[] | undefined) => {
          if (!oldData || !Array.isArray(oldData)) return oldData;

          return oldData.map((person) =>
            person.cod_pes === id ? { ...person, ...data } : person,
          );
        },
      );

      return { previousData };
    },
    onError: (_, __, context) => {
      toast.error("Erro ao atualizar pessoa.", { id: "error" });

      // Restore all previous query data
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: (_, error) => {
      if (!error) {
        toast.success("Pessoa atualizada com sucesso!", { id: "updated" });
      }
      queryClient.invalidateQueries({ queryKey: PERSON_QUERY_KEY });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deletePerson(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: PERSON_QUERY_KEY });

      const previousData = queryClient.getQueriesData({
        queryKey: PERSON_QUERY_KEY,
      });

      queryClient.setQueriesData(
        { queryKey: PERSON_QUERY_KEY },
        (oldData: Person[] | undefined) => {
          if (!oldData || !Array.isArray(oldData)) return oldData;

          return oldData.filter((person) => person.cod_pes !== id);
        },
      );

      return { previousData };
    },
    onError: (_, __, context) => {
      toast.error("Erro ao deletar pessoa.", { id: "error" });

      // Restore all previous query data
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: (_, error) => {
      if (!error) {
        toast.success("Pessoa deletada com sucesso!", { id: "deleted" });
      }
      queryClient.invalidateQueries({ queryKey: PERSON_QUERY_KEY });
    },
  });

  return { get, getClients, prefetchNextPage, getById, create, update, remove };
};
