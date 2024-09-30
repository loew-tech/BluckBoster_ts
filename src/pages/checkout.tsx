import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Member, Movie } from "../types/types";
import { fetchCart, updateCart } from "../utils/utils";
import { Button, Table } from "semantic-ui-react";

export const CheckoutPage = () => {
  const member = localStorage.getItem("user");
  const user = member !== null ? (JSON.parse(member) as Member) : null;
  const [cart, setCart] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [failedCheckout, setFailedCheckout] = useState<boolean>(false);

  const navigate = useNavigate();
  const removeFromCart = true;

  const checkout = async () => {
    if (!user) {
      setFailedCheckout(true);
      return;
    }
    const response = await fetch(
      "http://127.0.0.1:8080/api/v1/members/checkout",
      {
        method: "POST",
        body: JSON.stringify({ username: user.username, movie_ids: cart }),
      }
    );
    console.log(response);
    if (response.ok) {
      navigate("/movies/");
      //   @TODO: is there better way to handle this
      if (!user.checked_out) {
        user.checked_out = [];
      }
      cart.forEach((moive_id) => {
        if (user.checked_out) {
          user.checked_out.push(moive_id);
        }
      });
      user.cart = [];
      localStorage.setItem("user", JSON.stringify(user));
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
  }, [user]);

  return (
    <div style={{ backgroundColor: "darkblue" }}>
      <div style={{ backgroundColor: "gold", height: "150px" }}>
        <ul className="MemberBanner">
          <li style={{ fontWeight: 1000, fontSize: "large", padding: "15px" }}>
            <a href="/movies/">Back to Movies</a>
          </li>
          {user ? (
            <>
              <li
                style={{ fontWeight: 1000, fontSize: "large", padding: "15px" }}
              >
                <a href="/member/">
                  {user.first_name} {user.last_name}
                </a>
              </li>
              <li style={{ fontWeight: 1000, fontSize: "large" }}>
                {" "}
                Currently rented:{" "}
                {user.checked_out ? user.checked_out.length : 0}
              </li>
            </>
          ) : null}
        </ul>
      </div>
      <Table striped>
        <Table.Body>
          {movies.map((movie) => {
            return (
              <Table.Row key={movie.id}>
                <Table.Cell style={{ fontWeight: 1000, fontSize: "large" }}>
                  {movie.title}
                </Table.Cell>
                <Table.Cell>
                  {movie.inventory ? (
                    <Button
                      onClick={() => {
                        cartRemove(movie);
                      }}
                    >
                      RemoveFromCart
                    </Button>
                  ) : (
                    <Button disabled={true}>Out of Stock</Button>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <div className="container">
        <div className="center">
          <Button
            onClick={() => {
              checkout();
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
      {failedCheckout ? <p>Failed to checkout</p> : null}
    </div>
  );
};
