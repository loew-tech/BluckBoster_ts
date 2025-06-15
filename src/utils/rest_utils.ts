import {
  cartRemoveURI,
  cartURI,
  checkoutURI,
  memberLoginURI,
  moviesURI,
  returnURI,
} from "../constants/constants";
import { Movie } from "../types/types";

export const login = async (username: string): Promise<boolean> => {
  const response = await fetch(memberLoginURI, {
    method: "POST",
    body: JSON.stringify({
      username: username,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
  }
  return response.ok;
};

export const fetchMovie = async (movieID: string): Promise<Movie | null> => {
  const response = await fetch(`${moviesURI}/${movieID}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
};

export const fetchMovies = async (page: string): Promise<Movie[] | null> => {
  const response = await fetch(`${moviesURI}?page=${page}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
};

export const fetchCart = async (username: string): Promise<Movie[]> => {
  const response = await fetch(
    `http://127.0.0.1:8080/api/v1/members/${username}/cart`
  );
  if (response.ok) {
    const existingCart = await response.json();
    return existingCart;
  }
  return [];
};

export const fetchCheckedoutMovies = async (
  username: string
): Promise<Movie[]> => {
  const response = await fetch(
    `http://127.0.0.1:8080/api/v1/members/${username}/checkedout`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return [];
};

export const returnRentals = async (
  username: string,
  movieIDs: string[]
): Promise<boolean> => {
  const response = await fetch(returnURI, {
    method: "POST",
    body: JSON.stringify({
      username,
      movie_ids: movieIDs,
    }),
  });
  return response.ok;
};

// @TODO: should user cart be set here?
export const updateCart = (
  username: string,
  movieID: string,
  cart: string[],
  removeFromCart: boolean
): string[] => {
  let newCart = [...cart];
  if (!removeFromCart) {
    newCart.unshift(movieID);
    fetch(cartURI, {
      method: "put",
      body: JSON.stringify({ username, movie_id: movieID }),
    });
  } else {
    fetch(cartRemoveURI, {
      method: "put",
      body: JSON.stringify({ username, movie_id: movieID }),
    });
    const index = newCart.indexOf(movieID);
    newCart.splice(index, 1);
  }
  return newCart;
};

export const getUser = async () => {
  const data = localStorage.getItem("user");
  if (!data) {
    return;
  }
  const user = JSON.parse(data);
  const response = await fetch(
    `http://127.0.0.1:8080/api/v1/members/${user.username}`
  );
  if (response.ok) {
    const member = response.json();
    localStorage.setItem("user", JSON.stringify(member));
    return member;
  }
};

export const checkout = async (
  username: string,
  movieIDs: string[]
): Promise<boolean> => {
  const response = await fetch(checkoutURI, {
    method: "POST",
    body: JSON.stringify({ username, movie_ids: movieIDs }),
  });
  return response.ok;
};
