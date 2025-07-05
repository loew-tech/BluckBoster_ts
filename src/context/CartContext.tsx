import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { fetchCart, updateCart } from "../utils/utils";
import { getCookie, setCookie, deleteCookie } from "../utils/cookieUtils";
import { CART, COOKIE_EXPIRY_DAYS } from "../constants/constants";
import { useUser } from "./UserContext";

type CartContextType = {
  cart: string[];
  addToCart: (movieID: string) => void;
  removeFromCart: (movieID: string) => void;
  isInCart: (movieID: string) => boolean;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = getCookie(CART);

      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) {
            setCart(parsed);
            return;
          }
        } catch (err) {
          console.warn("Failed to parse cart cookie", err);
        }
      }

      if (user) {
        const movies = await fetchCart(user.username);
        const cartIds = movies.map((movie) => movie.id);
        setCart(cartIds);
      }
    };

    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCookie(CART, JSON.stringify(cart), COOKIE_EXPIRY_DAYS);
  }, [cart]);

  const addToCart = (movieID: string) => {
    if (!user) return;
    setCart(updateCart(user.username, movieID, cart, false));
  };

  const removeFromCart = (movieID: string) => {
    if (!user) return;
    setCart(updateCart(user.username, movieID, cart, true));
  };

  const isInCart = (movieID: string) => cart.includes(movieID);

  const clearCart = () => {
    setCart([]);
    deleteCookie(CART);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isInCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
