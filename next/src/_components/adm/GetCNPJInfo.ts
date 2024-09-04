import Axios from "axios";

export async function GetCNPJInfo(cnpj: string) {
  let apiEndPoint = "http://localhost:8000/api/cnpjInfo/{cnpj}";

  apiEndPoint = apiEndPoint.replace("{cnpj}", cnpj);

  const cnpjInfo = await Axios.get(apiEndPoint);
  console.log(cnpjInfo);

  return cnpjInfo;
}
