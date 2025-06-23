import { store } from "../store/store";
import { KevinBaconResponse, Movie } from "../types/types";
import * as rest from "./rest_utils";
import * as graphql from "./graphql_utils";

export const login = async (username: string): Promise<boolean> => {
  const api = store.getState().api.api;
  console.log("API in login:", api);
  switch (api) {
    case "REST":
      return await rest.login(username);
    case "GraphQL":
      return await graphql.login(username);
  }
  return false;
};

export const fetchMovie = async (movieID: string): Promise<Movie | null> => {
  const api = store.getState().api.api;
  console.log("API in fetchMovie:", api);
  switch (api) {
    case "REST":
      return rest.fetchMovie(movieID);
    case "GraphQL":
      return graphql.fetchMovie(movieID);
  }
  return null;
};

export const fetchMovies = async (page: string): Promise<Movie[] | null> => {
  const api = store.getState().api.api;
  console.log("API in fetchMovies:", api);
  switch (api) {
    case "REST":
      return rest.fetchMovies(page);
    case "GraphQL":
      return graphql.fetchMovies(page);
  }
  return null;
};

export const fetchCart = async (username: string): Promise<Movie[]> => {
  const api = store.getState().api.api;
  console.log("API in fetchCart:", api);
  switch (api) {
    case "REST":
      return rest.fetchCart(username);
    case "GraphQL":
      return graphql.fetchCart(username);
  }
  return [];
};

export const fetchCheckedoutMovies = async (
  username: string
): Promise<Movie[]> => {
  const api = store.getState().api.api;
  console.log("API in fetchCheckedoutMovies:", api);
  switch (api) {
    case "REST":
      return rest.fetchCheckedoutMovies(username);
    case "GraphQL":
      return graphql.fetchCheckedoutMovies(username);
  }
  return [];
};

export const returnRentals = async (
  username: string,
  movieIDs: string[]
): Promise<boolean> => {
  const api = store.getState().api.api;
  console.log("API in returnRentals:", api);
  switch (api) {
    case "REST":
      return rest.returnRentals(username, movieIDs);
    case "GraphQL":
      return graphql.returnRentals(username, movieIDs);
  }
  return false;
};

// @TODO: should user cart be set here?
export const updateCart = (
  username: string,
  movie_id: string,
  cart: string[],
  removeFromCart: boolean
): string[] => {
  const api = store.getState().api.api;
  console.log("API in updateCart:", api);
  switch (api) {
    case "REST":
      return rest.updateCart(username, movie_id, cart, removeFromCart);
    case "GraphQL":
      return graphql.updateCart(username, movie_id, cart, removeFromCart);
  }
  return [];
};

export const getUser = async () => {
  const api = store.getState().api.api;
  console.log("API in getUser:", api);
  switch (api) {
    case "REST":
      return rest.getUser();
    case "GraphQL":
      return graphql.getUser();
  }
  return null;
};

export const checkout = async (
  username: string,
  movieIDs: string[]
): Promise<boolean> => {
  const api = store.getState().api.api;
  console.log("API in checkout:", api);
  switch (api) {
    case "REST":
      return rest.checkout(username, movieIDs);
    case "GraphQL":
      return graphql.checkout(username, movieIDs);
  }
  return false;
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
  movie?: string,
  director?: string,
  depth?: number
): Promise<KevinBaconResponse | null> => {
  return graphql.kevinBacon(star, movie, director, depth);
};
