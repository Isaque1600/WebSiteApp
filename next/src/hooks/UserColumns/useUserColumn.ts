import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchUserColumns(id: string) {
  try {
    const response = await api.get(`/userColumns/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user columns:", error);
    throw error;
  }
}

async function updateUserColumns(id: string, columns: string[]) {
  try {
    const columnsString = columns.join(";");
    const response = await api.put(`/userColumns/${id}`, {
      columns: columnsString,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const USER_COLUMNS_QUERY_KEY = ["user-columns"];

export const useUserColumns = () => {
  const queryClient = useQueryClient();

  const getById = ({
    id,
    options,
  }: {
    id: string;
    options?: { enabled?: boolean };
  }) =>
    useQuery({
      queryKey: [...USER_COLUMNS_QUERY_KEY, id],
      queryFn: () => fetchUserColumns(id),
      enabled: options?.enabled ?? true,
    });

  const update = useMutation({
    mutationFn: ({ id, columns }: { id: string; columns: string[] }) =>
      updateUserColumns(id, columns),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: [...USER_COLUMNS_QUERY_KEY, id],
      });
    },
  });

  return { getById, update };
};
