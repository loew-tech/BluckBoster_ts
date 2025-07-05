import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

import { Movie } from "../types/types";
import { checkout, fetchCart, updateCart } from "../utils/utils";
import { HeaderBanner } from "../components/headerBanner";
import {
  loginPath,
  moviesPath,
  REMOVE_FROM_CART,
} from "../constants/constants";
import { ErrorMessage } from "../components/errorMessage";
import { CheckoutTable } from "../components/checkoutComponents/CheckoutTable";
import { Spinner } from "../components/Spinner";
import { useUser } from "../context/UserContext";

import "./checkout.css";

export const CheckoutPage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [cart, setCart] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [failedCheckout, setFailedCheckout] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!user) {
    console.warn("User is not defined in CheckoutPage; redirecting to login.");
    navigate(loginPath);
  }

  const userCheckout = async () => {
    if (!user) {
      setFailedCheckout(true);
      return;
    }
    const success = await checkout(user.username, cart);
    if (success) {
      const updatedUser = {
        ...user,
        checked_out: [...(user.checked_out ?? []), ...cart],
        cart: [],
      };
      setUser(updatedUser);
      navigate(moviesPath);
    } else {
      setFailedCheckout(true);
    }
  };

  const cartRemove = (movieID: string) => {
    if (!user) return;

    const newCart = updateCart(user.username, movieID, cart, REMOVE_FROM_CART);
    const updatedUser = { ...user, cart: newCart };

    setCart(newCart);
    setMovies(movies.filter((m) => m.id !== movieID));
    setUser(updatedUser);
  };

  useEffect(
    () => {
      const loadCart = async () => {
        setIsLoading(true);

        if (user) {
          const movies = await fetchCart(user.username);
          const cartIds = movies.map((movie) => movie.id);

          setMovies(movies);
          setCart(cartIds);

          const updatedUser = { ...user, cart: cartIds };
          setUser(updatedUser);
        } else {
          setMovies([]);
          setCart([]);
        }
        setIsLoading(false);
      };
      loadCart();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <HeaderBanner />
      {isLoading && <Spinner message="🔄 Loading your cart..." />}
      <CheckoutTable movies={movies} cartRemove={cartRemove} />
      <div className="checkout-container">
        <div className="center">
          <Button onClick={userCheckout}>Checkout</Button>
        </div>
      </div>
      {failedCheckout && <ErrorMessage msg="Failed to checkout" />}
    </div>
  );
};
