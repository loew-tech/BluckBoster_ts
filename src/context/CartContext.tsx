import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
import { fetchCart, updateCart } from "../utils/utils";
import { getUserFromCookie } from "../utils/cookieUtils";

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
  const userRef = useRef(getUserFromCookie());
  const user = userRef.current;
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        const movies = await fetchCart(user.username);
        const cartIds = movies.map((movie) => movie.id);
        setCart(cartIds);
      }
    };
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
