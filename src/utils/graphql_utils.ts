import { Member, Movie } from "../types/types";

export const login = async (username: string): Promise<boolean> => {
  // stub
  return false;
};

export const fetchMovie = async (movieID: string): Promise<Movie | null> => {
  // stub
  return null;
};

export const fetchMovies = async (page: string): Promise<Movie[] | null> => {
  // stub
  return null;
};

export const fetchCart = async (username: string): Promise<Movie[]> => {
  // stub
  return Promise.resolve([]);
};

export const fetchCheckedoutMovies = async (username: string) => {
  // stub
  return [];
};

export const returnRentals = async (
  username: string,
  movie_ids: string[]
): Promise<boolean> => {
  // stub
  return false;
};

export const updateCart = (
  username: string,
  movie_id: string,
  cart: string[],
  removeFromCart: boolean
): string[] => {
  // stub
  return [];
};

export const getUser = async (): Promise<Member | null> => {
  // stub
  return null;
};

export const checkout = async (
  username: string,
  movie_ids: string[]
): Promise<boolean> => {
  // stub
  return false;
};
