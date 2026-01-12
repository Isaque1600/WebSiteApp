import api from "@/lib/axios";

export async function GetCNPJInfo(cnpj: string) {
  try {
    const response = await api.get(`/cnpjInfo/${cnpj}`);

    return response;
  } catch (error) {
    throw error;
  }
}
