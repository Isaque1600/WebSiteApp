import { createContext, useState } from "react";

type User = {
  id: number;
  login: string;
  type: "admin" | "accountant";
  state: "active" | "inactive";
  personId: number;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  user: User;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
};

export const Context = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState({} as User);
  const [token, _setToken] = useState<string | null>(
    window.sessionStorage.getItem("UserToken")
  );

  const setToken = (token: UserContextType["token"]) => {
    _setToken(token);
    if (!token) {
      window.sessionStorage.removeItem("UserToken");
    } else {
      window.sessionStorage.setItem("UserToken", token);
    }
  };

  return (
    <Context.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  );
};
