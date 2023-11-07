import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/form";
import { validateToken } from "../utils/token";

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

  useEffect(() => {
    // Comprobar si el token es válido y no ha caducado
    const isValidToken = validateToken(token); // Implementa la función validateToken
    if (!isValidToken) {
      // Si el token no es válido, elimínalo y establece el usuario en undefined
      setToken(undefined);
      setUser(undefined);
    }
  }, [token]);

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
