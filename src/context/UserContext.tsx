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
import {
  ADD_TO_CART,
  CART,
  COOKIE_EXPIRY_DAYS,
  REMOVE_FROM_CART,
  USER,
} from "../constants/constants";
import { updateCart } from "../utils/utils";

type UserContextType = {
  user: Member | null;
  setUser: (user: Member | null) => void;
  getCart: () => string[];
  setCart: (cart: string[]) => void;
  addToCart: (movieID: string) => void;
  removeFromCart: (movieID: string) => void;
  isInCart: (movieID: string) => boolean;
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

  const getCart = (): string[] => {
    return user?.cart || [];
  };

  const setCart = (cart: string[]) => {
    if (user) {
      const updatedUser = { ...user, cart };
      setUser(updatedUser);
    }
  };

  const addToCart = (movieID: string) => {
    if (!user) return;
    setCart(updateCart(user.username, movieID, getCart(), ADD_TO_CART));
  };

  const removeFromCart = (movieID: string) => {
    if (!user) return;
    setCart(updateCart(user.username, movieID, getCart(), REMOVE_FROM_CART));
  };

  const isInCart = (movieID: string) => {
    return getCart().includes(movieID);
  };

  const logout = () => {
    deleteCookie(USER);
    deleteCookie(CART);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser,
        getCart,
        setCart,
        addToCart,
        removeFromCart,
        isInCart,
        logout,
      }}
    >
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
