import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Member } from "../types/types";
import {
  getUserFromCookie,
  setCookie,
  deleteCookie,
} from "../utils/cookieUtils";
import { CART, COOKIE_EXPIRY_DAYS, USER } from "../constants/constants";

type UserContextType = {
  user: Member | null;
  setUser: (user: Member | null) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Member | null>(() => getUserFromCookie());

  useEffect(() => {
    if (user) {
      setCookie(USER, JSON.stringify(user), COOKIE_EXPIRY_DAYS);
    } else {
      deleteCookie(USER);
    }
  }, [user]);

  const logout = () => {
    deleteCookie(USER);
    deleteCookie(CART);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user: user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
