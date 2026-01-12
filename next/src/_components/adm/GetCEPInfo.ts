import api from "@/lib/axios";

export async function GetCEPInfo(cep: string) {
  const cepInfo = await api.get(`/cepInfo/${cep}`);

  return cepInfo;
}
