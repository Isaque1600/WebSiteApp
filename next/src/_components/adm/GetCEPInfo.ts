import Axios from "axios";

export async function GetCEPInfo(cep: string) {
  let apiEndPoint = "http://localhost:8000/api/cepInfo/{cep}";

  apiEndPoint = apiEndPoint.replace("{cep}", cep);

  const cepInfo = await Axios.get(apiEndPoint);
  console.log(cepInfo);

  return cepInfo;
}
