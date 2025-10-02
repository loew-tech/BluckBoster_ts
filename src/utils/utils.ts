import {
  KevinBaconResponse,
  Member,
  Movie,
  VotingResult,
} from "../types/types";
import * as rest from "./rest_utils";
import * as graphql from "./graphql_utils";
import {
  getAPIChoiceFromCookie,
  getUserFromCookie,
  setCookie,
} from "./cookieUtils";
import { GRAPHQL_API, REST_API } from "../constants/constants";

export const login = async (username: string): Promise<Member | null> => {
  const api = getAPIChoiceFromCookie();
  console.log("API in login:", api);
  switch (api) {
    case REST_API:
      return await rest.login(username);
    case GRAPHQL_API:
      return await graphql.login(username);
  }
};

export const fetchMovie = async (movieID: string): Promise<Movie | null> => {
  const api = getAPIChoiceFromCookie();
  console.log("API in fetchMovie:", api);
  switch (api) {
    case "REST":
      return rest.fetchMovie(movieID);
    case "GraphQL":
      return graphql.fetchMovie(movieID);
  }
};

export const fetchMovies = async (page: string): Promise<Movie[]> => {
  const api = getAPIChoiceFromCookie();
  console.log("API in fetchMovies:", api);
  switch (api) {
    case "REST":
      return rest.fetchMovies(page);
    case "GraphQL":
      return graphql.fetchMovies(page);
  }
};

export const fetchCart = async (username: string): Promise<Movie[]> => {
  const api = getAPIChoiceFromCookie();
  console.log("API in fetchCart:", api);
  switch (api) {
    case "REST":
      return rest.fetchCart(username);
    case "GraphQL":
      return graphql.fetchCart(username);
  }
};

export const fetchCheckedoutMovies = async (
  username: string
): Promise<Movie[]> => {
  const api = getAPIChoiceFromCookie();
  console.log("API in fetchCheckedoutMovies:", api);
  switch (api) {
    case "REST":
      return rest.fetchCheckedoutMovies(username);
    case "GraphQL":
      return graphql.fetchCheckedoutMovies(username);
  }
};

export const returnRentals = async (
  username: string,
  movieIDs: string[]
): Promise<boolean> => {
  const api = getAPIChoiceFromCookie();
  console.log("API in returnRentals:", api);
  switch (api) {
    case "REST":
      return rest.returnRentals(username, movieIDs);
    case "GraphQL":
      return graphql.returnRentals(username, movieIDs);
  }
};

export const updateCart = (
  username: string,
  movie_id: string,
  cart: string[],
  removeFromCart: boolean
): string[] => {
  const api = getAPIChoiceFromCookie();
  console.log("API in updateCart:", api);
  switch (api) {
    case "REST":
      return rest.updateCart(username, movie_id, cart, removeFromCart);
    case "GraphQL":
      return graphql.updateCart(username, movie_id, cart, removeFromCart);
  }
};

export const getUser = async (): Promise<Member | null> => {
  const api = getAPIChoiceFromCookie();
  console.log("API in getUser:", api);
  switch (api) {
    case "REST":
      return rest.getUser();
    case "GraphQL":
      return graphql.getUser();
  }
};

export const checkout = async (
  username: string,
  movieIDs: string[]
): Promise<boolean> => {
  const api = getAPIChoiceFromCookie();
  console.log("API in checkout:", api);
  switch (api) {
    case REST_API:
      return rest.checkout(username, movieIDs);
    case GRAPHQL_API:
      return graphql.checkout(username, movieIDs);
  }
};

export const setAPIChoice = async (
  api: "REST" | "GraphQL"
): Promise<boolean> => {
  const user = getUserFromCookie();
  if (!user) {
    console.error("No user found in cookie, cannot set API choice.");
    return Promise.resolve(false);
  }
  let ret = false;
  switch (user.api_choice ?? REST_API) {
    case REST_API:
      ret = await rest.setAPIChoice(api);
      break;
    case GRAPHQL_API:
      ret = await graphql.setAPIChoice(api);
      break;
  }
  user.api_choice = api;
  setCookie("user", JSON.stringify(user));
  return Promise.resolve(ret);
};

export const starredWith = async (star: string): Promise<string[]> => {
  return graphql.starredWith(star);
};

export const starredIn = async (star: string): Promise<Movie[]> => {
  return graphql.starredIn(star);
};

export const directedActors = async (director: string): Promise<string[]> => {
  return graphql.directedActors(director);
};

export const directedMovies = async (director: string): Promise<Movie[]> => {
  return graphql.directedMovies(director);
};

export const kevinBacon = async (
  star?: string,
  title?: string,
  director?: string,
  depth?: number
): Promise<KevinBaconResponse | null> => {
  return graphql.kevinBacon(star, title, director, depth);
};

export const getVotingInitialSlate = async (): Promise<VotingResult | null> => {
  return rest.getVotingInitialSlate();
};
