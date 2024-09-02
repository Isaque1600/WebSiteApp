import Axios from "axios";

export async function GetCNPJInfo(cnpj: string) {
  const apiEndPoint = "https://receitaws.com.br/v1/cnpj/{cnpj}";

  return Axios.get(apiEndPoint.replace("{cnpj}", cnpj))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.data;
    });
}
