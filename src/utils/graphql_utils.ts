import { Member, Movie } from "../types/types";

const graphqlPath = "http://127.0.0.1:8080/graphql/v1";

export const login = async (username: string): Promise<boolean> => {
  const query = {
    query:
      "query GetMember($username: ID!) { GetMember(username: $username) { username first_name last_name cart checked_out } }",
    variables: {
      username,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data.data.GetMember));
  }
  return response.ok;
};

export const fetchMovie = async (movieID: string): Promise<Movie | null> => {
  const query = {
    query:
      "query GetMovie($movieID: ID!) { GetMovie(movieID: $movieID) { id title review synopsis trivia} }",
    variables: {
      movieID,
    },
  };
  console.log("query", query);
  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  if (response.ok) {
    const data = await response.json();
    console.log("data", data);
    return data.data.GetMovie ?? null;
  }
  return null;
};

export const fetchMovies = async (page: string): Promise<Movie[] | null> => {
  const query = {
    query:
      "query GetMovies($page: String!) { GetMovies(page: $page) { id title rating year director cast rented inventory } }",
    variables: {
      page,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  if (response.ok) {
    const data = await response.json();
    return data.data.GetMovies ?? null;
  }
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
  const localData = localStorage.getItem("user");
  if (!localData) {
    return null;
  }
  const user = JSON.parse(localData);
  const query = {
    query:
      "query GetMember($username: ID!) { GetMember(username: $username) { username first_name last_name cart checked_out } }",
    variables: {
      username: user.username,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  console.log("in getMember", response.ok);
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.data.GetMember ?? null;
};

export const checkout = async (
  username: string,
  movie_ids: string[]
): Promise<boolean> => {
  // stub
  return false;
};
