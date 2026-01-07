export type Filter = {
  page: string;
  per_page: string;
  search: string;
  search_by: string;
};

export type PersonFilter = {
  type: "contador" | "cliente";
  status: "ativo" | "inativo";
} & Filter;

export type UserFilter = { type: "contador" | "admin" } & Filter;
