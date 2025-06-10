import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "semantic-ui-react";

import { Member, Movie } from "../types/types";
import { checkout, fetchCart, updateCart } from "../utils/utils";
import { HeaderBanner } from "../components/headerBanner";
import { moviesPath } from "../constants/constants";
import { ErrorMessage } from "../components/errorMessage";

import "./checkout.css";

export const CheckoutPage = () => {
  const member = localStorage.getItem("user");
  const user = member !== null ? (JSON.parse(member) as Member) : null;
  const [cart, setCart] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [failedCheckout, setFailedCheckout] = useState<boolean>(false);

  const navigate = useNavigate();
  const removeFromCart = true;

  // @TODO: handle checking out movie that's already in checkout
  const userCheckout = async () => {
    if (!user) {
      setFailedCheckout(true);
      return;
    }
    const success = await checkout(user.username, cart);
    if (success) {
      //   @TODO: is there better way to handle this
      if (!user?.checked_out) {
        user.checked_out = [];
      }
      cart.forEach((moive_id) => {
        if (user?.checked_out) {
          user.checked_out.push(moive_id);
        }
      });
      user.cart = [];
      localStorage.setItem("user", JSON.stringify(user));
      navigate(moviesPath);
    } else {
      setFailedCheckout(true);
    }
  };

  const cartRemove = (movie: Movie) => {
    if (!user) {
      return;
    }
    const newCart = updateCart(user.username, movie.id, cart, removeFromCart);
    setCart(newCart);
    user.cart = newCart;
    localStorage.setItem("user", JSON.stringify(user));
    setMovies(movies.filter((m) => m.id !== movie.id));
  };

  useEffect(() => {
    if (user) {
      fetchCart(user.username).then((movies: Movie[]) => {
        setMovies(movies);
        setCart(movies.map((movie) => movie.id));
        // @TODO: better way to handle cart syncing issue?
        user.cart = movies.map((movie) => movie.id);
        localStorage.setItem("user", JSON.stringify(user));
      });
    } else {
      setMovies([]);
      setCart([]);
    }
  }, []);

  return (
    <div>
      <HeaderBanner user={user} />
      <Table striped>
        <TableBody>
          {movies.map((movie) => {
            return (
              <TableRow key={movie.id}>
                <TableCell className="title-cell">{movie.title}</TableCell>
                <TableCell>
                  {movie.inventory ? (
                    <Button
                      onClick={() => {
                        cartRemove(movie);
                      }}
                    >
                      Remove From Cart
                    </Button>
                  ) : (
                    <Button disabled={true}>Out of Stock</Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="checkout-container">
        <div className="center">
          <Button onClick={userCheckout}>Checkout</Button>
        </div>
      </div>
      {failedCheckout ? <ErrorMessage msg="Failed to checkout" /> : null}
    </div>
  );
};
