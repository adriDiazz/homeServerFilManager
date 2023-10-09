import { ReactNode, createContext, useContext, useState } from "react";
import { User } from "../types/form";

interface UserContextProviderProps {
  children: ReactNode;
}

type UserContextType = {
  token: string | undefined;
  user: User | undefined;
  setToken: (token: string | undefined) => void;
  setUser: (user: User | undefined) => void;
};

export const UserContext = createContext<UserContextType | undefined>({
  token: undefined,
  user: undefined,
  setUser: () => {},
  setToken: () => {},
});

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [token, setToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | undefined>();

  const provider: UserContextType = {
    token,
    user,
    setToken,
    setUser,
  };

  return (
    <UserContext.Provider value={provider}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUserContext debe usarse dentro de un UserContextProvider"
    );
  }
  return context;
};

export default UserContextProvider;
