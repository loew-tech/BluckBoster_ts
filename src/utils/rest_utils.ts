import {
  cartRemoveURI,
  cartURI,
  checkoutURI,
  memberLoginURI,
  memberURI,
  moviesURI,
  returnURI,
  votingInitialSlateURI,
} from "../constants/constants";
import { Member, Movie, VotingResult } from "../types/types";
import { getUserFromCookie, setCookie } from "./cookieUtils";

export const login = async (username: string): Promise<Member | null> => {
  const response = await fetch(memberLoginURI, {
    method: "POST",
    body: JSON.stringify({
      username: username,
    }),
  });
  if (response.ok) {
    const user = (await response.json()) as Member;
    return user;
  }
  return null;
};

export const fetchMovie = async (movieID: string): Promise<Movie | null> => {
  const response = await fetch(`${moviesURI}/${movieID}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
};

export const fetchMovies = async (page: string): Promise<Movie[]> => {
  const response = await fetch(`${moviesURI}?page=${page}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return [];
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

export const updateCart = (
  username: string,
  movie_id: string,
  cart: string[],
  removeFromCart: boolean
): string[] => {
  let newCart: string[];
  if (removeFromCart) {
    newCart = cart.filter((id) => id !== movie_id);
    fetch(cartRemoveURI, {
      method: "PUT",
      body: JSON.stringify({ username, movie_id }),
    });
  } else {
    newCart = cart.includes(movie_id) ? [...cart] : [movie_id, ...cart];
    fetch(cartURI, {
      method: "PUT",
      body: JSON.stringify({ username, movie_id }),
    });
  }
  return newCart;
};

export const getUser = async (): Promise<Member | null> => {
  const user = getUserFromCookie();
  if (!user) {
    console.warn("Failed to retrieve user from cookie. Functionality affected");
    return null;
  }
  const response = await fetch(
    `http://127.0.0.1:8080/api/v1/members/${user.username}`
  );
  if (response.ok) {
    const member = await response.json();
    setCookie("user", JSON.stringify(member));
    return member;
  }
  return null;
};

export const checkout = async (
  username: string,
  movieIDs: string[]
): Promise<boolean> => {
  console.log("movieIDs", movieIDs);
  const response = await fetch(checkoutURI, {
    method: "POST",
    body: JSON.stringify({ username, movie_ids: movieIDs }),
  });
  return response.ok;
};

export const setAPIChoice = async (
  api: "REST" | "GraphQL"
): Promise<boolean> => {
  const user = getUserFromCookie();
  if (!user) {
    console.warn("No user found to set API choice");
    return Promise.resolve(false);
  }
  user.api_choice = api;
  setCookie("user", JSON.stringify(user));
  const response = await fetch(
    `${memberURI}/${user.username}?api_choice=${api}`,
    {
      method: "PUT",
    }
  );
  return response.ok;
};

export const getVotingInitialSlate = async (): Promise<VotingResult | null> => {
  const response = await fetch(`${votingInitialSlateURI}`);
  if (response.ok) {
    const data = response.json();
    return data;
  }
  return null;
};
