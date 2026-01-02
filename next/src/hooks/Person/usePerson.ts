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
    const params = new URLSearchParams({
      page,
      per_page,
      search,
      filter: search_by,
      status,
    });

    const response = await api.get(`/person/${type}?${params.toString()}`);

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
    const response = await api.post(`/person/${data.tipo}`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating person:", error);
    throw error;
  }
}

async function updatePerson(id: string, data: PersonFormData) {
  try {
    const response = await api.put(`/person/${id}`, data);
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

  const get = (filters: PersonFilter) =>
    useQuery({
      queryKey: [...PERSON_QUERY_KEY, filters],
      queryFn: () => fetchUsers(filters),
      staleTime: 10 * 60 * 1000, // 10 minutes
      placeholderData: keepPreviousData,
    });

  const prefetchNextPage = ({ page, ...filters }: PersonFilter) =>
    usePrefetchQuery({
      queryKey: [...PERSON_QUERY_KEY, { page: page + 1, ...filters }],
      queryFn: () => fetchUsers({ page: page + 1, ...filters }),
    });

  const getById = (id: string) =>
    useQuery({
      queryKey: [...PERSON_QUERY_KEY, id],
      queryFn: () => fetchUserById(id),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });

  const create = (data: PersonFormData) =>
    useMutation({
      mutationFn: () => createPerson(data),
      onMutate: async (_, variables) => {
        await queryClient.cancelQueries({ queryKey: PERSON_QUERY_KEY });

        queryClient.setQueryData(PERSON_QUERY_KEY, (oldData: Person[]) => {
          return [...oldData, variables];
        });
        toast.success("Pessoa criada com sucesso!");

        return {
          previousData: queryClient.getQueryData<Person[]>(PERSON_QUERY_KEY),
        };
      },
      onError: (_, __, result) => {
        toast.error("Erro ao criar pessoa.");
        queryClient.setQueryData(PERSON_QUERY_KEY, result?.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: PERSON_QUERY_KEY });
      },
    });

  const update = (id: string, data: PersonFormData) =>
    useMutation({
      mutationFn: () => updatePerson(id, data),
      onMutate: async (_, variables) => {
        await queryClient.cancelQueries({ queryKey: PERSON_QUERY_KEY });

        const previousData =
          queryClient.getQueryData<Person[]>(PERSON_QUERY_KEY);

        queryClient.setQueryData(PERSON_QUERY_KEY, (oldData: Person[]) => {
          return oldData.map((person) =>
            person.cod_pes === id ? { ...person, ...variables } : person,
          );
        });
        toast.success("Pessoa atualizada com sucesso!");

        return { previousData };
      },
      onError: (_, __, contenxt) => {
        toast.error("Erro ao atualizar pessoa.");
        queryClient.setQueryData(PERSON_QUERY_KEY, contenxt?.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: PERSON_QUERY_KEY });
      },
    });

  const remove = (id: string) =>
    useMutation({
      mutationFn: () => deletePerson(id),
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: PERSON_QUERY_KEY });

        const previousData =
          queryClient.getQueryData<Person[]>(PERSON_QUERY_KEY);

        queryClient.setQueryData(PERSON_QUERY_KEY, (oldData: Person[]) => {
          return oldData.filter((person) => person.cod_pes !== id);
        });
        toast.success("Pessoa deletada com sucesso!");

        return { previousData };
      },
      onError: (_, __, context) => {
        toast.error("Erro ao deletar pessoa.");
        queryClient.setQueryData(PERSON_QUERY_KEY, context?.previousData);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: PERSON_QUERY_KEY });
      },
    });

  return { get, prefetchNextPage, getById, create, update, remove };
};
