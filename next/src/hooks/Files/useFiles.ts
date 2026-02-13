import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { toast } from "sonner";

export const FILES_QUERY_KEY = ["files"];

async function fetchYears() {
  try {
    const response = await api.get("/file/available-years");
    return response.data;
  } catch (error) {
    console.error("Error fetching years:", error);
    return [];
  }
}

async function fetchCertificates(userId: number) {
  try {
    const response = await api.get(`/file/certificate/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw error;
  }
}

async function fetchArchives({
  year,
  month,
  client,
  userId,
}: {
  year: string;
  month: string;
  client: string;
  userId: number;
}) {
  try {
    const params = new URLSearchParams();
    if (client !== "null") params.append("client", client);

    const response = await api.get(
      `/file/archive/${userId}/${year}/${month}?${params.toString()}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching archives:", error);
    throw error;
  }
}

async function fetchSpeds({
  year,
  month,
  client,
  userId,
}: {
  year: string;
  month: string;
  client: string;
  userId: number;
}) {
  try {
    const params = new URLSearchParams();
    if (client !== "null") params.append("client", client);

    const response = await api.get(
      `/file/sped/${userId}/${year}/${month}?${params.toString()}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching speds:", error);
    throw error;
  }
}

function triggerDownload(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

function extractFilename(response: AxiosResponse, fallback: string): string {
  const contentDisposition = response.headers["content-disposition"] as
    | string
    | undefined;
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="?([^"]+)"?/);
    if (match) return match[1];
  }
  return fallback;
}

async function downloadPublic(path: string) {
  try {
    const response = await api.get(`file/download-public/${path}`, {
      responseType: "blob",
    });

    const filename = extractFilename(response, path.split("/").pop() || "file");
    triggerDownload(response.data, filename);

    return response.data;
  } catch (error) {
    console.error("Error downloading public file:", error);
    throw error;
  }
}

async function download(path: string) {
  try {
    const response = await api.get(`file/download/${path}`, {
      responseType: "blob",
    });

    const filename = extractFilename(response, path.split("/").pop() || "file");
    triggerDownload(response.data, filename);

    return response.data;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
}

async function downloadMultiple(paths: string[]) {
  try {
    const response = await api.post(
      `file/download-multiple`,
      { files: paths },
      {
        responseType: "blob",
      },
    );

    const filename = extractFilename(response, "files.zip");
    triggerDownload(response.data, filename);

    return response.data;
  } catch (error) {
    console.error("Error downloading multiple files:", error);
    throw error;
  }
}

export const useFile = () => {
  const getYears = () =>
    useQuery({
      queryKey: [...FILES_QUERY_KEY, "years"],
      queryFn: () => fetchYears(),
    });

  const getCertificates = (userId: number) =>
    useQuery({
      queryKey: [...FILES_QUERY_KEY, "certificates", userId],
      queryFn: () => fetchCertificates(userId),
    });

  const getArchives = (filters: {
    year: string;
    month: string;
    client: string;
    userId: number;
  }) =>
    useQuery({
      queryKey: [...FILES_QUERY_KEY, "archives", filters],
      queryFn: () => fetchArchives(filters),
      enabled: !!filters.year && !!filters.month,
    });

  const getSpeds = (filters: {
    year: string;
    month: string;
    client: string;
    userId: number;
  }) =>
    useQuery({
      queryKey: [...FILES_QUERY_KEY, "speds", filters],
      queryFn: () => fetchSpeds(filters),
      enabled: !!filters.year && !!filters.month,
    });

  const downloadPublicFile = useMutation({
    mutationFn: (path: string) => downloadPublic(path),
    onError: () => {
      toast.error("Erro ao baixar arquivo.", { id: "download-error" });
    },
    onSuccess: () => {
      toast.success("Download iniciado!", { id: "download-success" });
    },
  });

  const downloadFile = useMutation({
    mutationFn: (path: string) => download(path),
    onError: () => {
      toast.error("Erro ao baixar arquivo.", { id: "download-error" });
    },
    onSuccess: () => {
      toast.success("Download iniciado!", { id: "download-success" });
    },
  });

  const downloadMultipleFiles = useMutation({
    mutationFn: (paths: string[]) => downloadMultiple(paths),
    onError: () => {
      toast.error("Erro ao baixar arquivos.", { id: "download-error" });
    },
    onSuccess: () => {
      toast.success("Download iniciado!", { id: "download-success" });
    },
  });

  return {
    getYears,
    getCertificates,
    getArchives,
    getSpeds,
    downloadPublicFile,
    downloadFile,
    downloadMultipleFiles,
  };
};
