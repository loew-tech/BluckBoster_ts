import { KevinBaconResponse, Member, Movie } from "../types/types";
import { getUserFromCookie } from "./cookieUtils";

const graphqlPath = "http://127.0.0.1:8080/graphql/v1";

export const login = async (username: string): Promise<Member | null> => {
  const query = {
    query: `
      query GetMember($username: ID!) {
        GetMember(username: $username) {
          username
          first_name
          last_name
          cart
          checked_out
        }
      }
    `,
    variables: {
      username,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  if (response.ok) {
    const user = (await response.json()) as Member;
    return user;
  }
  return null;
};

export const fetchMovie = async (movieID: string): Promise<Movie | null> => {
  const query = {
    query: `
      query GetMovie($movieID: ID!) {
        GetMovie(movieID: $movieID) {
          id
          title
          review
          synopsis
          trivia
        }
      }
    `,
    variables: {
      movieID,
    },
  };
  console.log("query", query);
  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  if (!response.ok) {
    console.warn("Failure to fetch movie");
    return null;
  }
  const data = await response.json();
  return data.data.GetMovie ?? [];
};

export const fetchMovies = async (page: string): Promise<Movie[]> => {
  const query = {
    query: `
      query GetMovies($page: String!) {
        GetMovies(page: $page) {
          id
          title
          rating
          year
          director
          cast
          rented
          inventory
        }
      }
    `,
    variables: {
      page,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  if (!response.ok) {
    return [];
  }
  const data = await response.json();
  return data.data.GetMovies ?? [];
};

export const fetchCart = async (username: string): Promise<Movie[]> => {
  const query = {
    query: `
      query GetCart($username: ID!) {
        GetCart(username: $username) {
          id
          title
          inventory
        }
      }
    `,
    variables: {
      username: username,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  if (!response.ok) {
    return [];
  }
  const data = await response.json();
  return data.data.GetCart ?? [];
};

export const fetchCheckedoutMovies = async (
  username: string
): Promise<Movie[]> => {
  const query = {
    query: `
      query GetCheckedout($username: ID!) {
        GetCheckedout(username: $username) {
          id
          title
        }
      }
    `,
    variables: {
      username,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  if (!response.ok) {
    return [];
  }
  const data = await response.json();
  return data.data.GetCheckedout ?? [];
};

export const returnRentals = async (
  username: string,
  movieIDs: string[]
): Promise<boolean> => {
  const mutation = {
    query: `
    mutation ReturnRentals($username: ID!, $movieIDs: [ID]!) {
      ReturnRentals(username: $username, movieIDs: $movieIDs)
    }
  `,
    variables: {
      username,
      movieIDs,
    },
  };
  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(mutation),
  });
  return response.ok;
};

export const updateCart = (
  username: string,
  movieID: string,
  cart: string[],
  removeFromCart: boolean
): string[] => {
  let newCart = [...cart];
  if (removeFromCart) {
    newCart = newCart.filter((id) => id !== movieID);
  } else {
    newCart.push(movieID);
  }
  const mutation = {
    query: `
    mutation UpdateCart($username: ID!, $movieID: ID!, $removeFromCart: Boolean!) {
      UpdateCart(username: $username, movieID: $movieID, removeFromCart: $removeFromCart)
    }
  `,
    variables: {
      username,
      movieID,
      removeFromCart,
    },
  };
  fetch(graphqlPath, {
    method: "post",
    body: JSON.stringify(mutation),
  });
  return newCart;
};

export const getUser = async (): Promise<Member | null> => {
  const user = getUserFromCookie();
  if (!user) {
    console.warn("Failed to retrieve user from cookie. Functionality affected");
    return null;
  }
  const query = {
    query: `
      query GetMember($username: ID!) {
        GetMember(username: $username) {
          username
          first_name
          last_name
          cart
          checked_out
        }
      }
    `,
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
  movieIDs: string[]
): Promise<boolean> => {
  console.log("checking out");
  const mutation = {
    query: `
    mutation Checkout($username: ID!, $movieIDs: [ID]!) {
      Checkout(username: $username, movieIDs: $movieIDs)
    }
  `,
    variables: {
      username,
      movieIDs,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(mutation),
  });
  return response.ok;
};

export const starredWith = async (star: string): Promise<string[]> => {
  const query = {
    query: `
      query StarredWith($star: String!) {
        StarredWith(star: $star) 
      }
    `,
    variables: {
      star,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  const data = await response.json();
  console.log(data);
  return data.data.StarredWith ?? null;
};

export const starredIn = async (star: string): Promise<Movie[]> => {
  const query = {
    query: `
      query StarredIn($star: String!) {
        StarredIn(star: $star) {
          id
          title
        }
      }
    `,
    variables: {
      star,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  const data = await response.json();
  console.log(data);
  return data.data.StarredIn ?? null;
};

export const directedActors = async (director: string): Promise<string[]> => {
  const query = {
    query: `
      query DirectedPerformers($director: String!) {
        DirectedPerformers(director: $director) 
      }
    `,
    variables: {
      director,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  const data = await response.json();
  console.log(data);
  return data.data.DirectedPerformers ?? null;
};

export const directedMovies = async (director: string): Promise<Movie[]> => {
  const query = {
    query: `
      query DirectedMovies($director: String!) {
        DirectedMovies(director: $director) {
          id
          title
        }
      }
    `,
    variables: {
      director,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  const data = await response.json();
  console.log(data);
  return data.data.DirectedMovies ?? null;
};

export const kevinBacon = async (
  star?: string,
  title?: string,
  director?: string,
  depth?: number
): Promise<KevinBaconResponse | null> => {
  if (!star && !title && !director) {
    console.warn(
      "the KevinBacon search requires at least one star, movie, or director"
    );
    return null;
  }
  const query = {
    query: `
      query KevinBacon($star: String, $title: String, $director: String, $depth: Int) {
        KevinBacon(star: $star, title: $title, director: $director, depth: $depth) {
          star
          stars
          total_stars
          movies {
            id
            title
          }
          total_movies
          directors
          total_directors
        }
      }
    `,
    variables: {
      star,
      title,
      director,
      depth,
    },
  };

  const response = await fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(query),
  });
  const data = await response.json();
  console.log(data);
  return data.data.KevinBacon ?? null;
};

export const setAPIChoice = (api: "REST" | "GraphQL"): Promise<boolean> => {
  const user = getUserFromCookie();
  if (!user) {
    console.warn("No user found in cookie. Cannot set API choice.");
    return Promise.resolve(false);
  }

  const mutation = {
    query: `
      mutation SetAPIChoice($username: ID!, $api_choice: String) {
        SetAPIChoice(username: $username, api_choice: $api_choice)
      }
    `,
    variables: {
      username: user.username,
      apiChoice: api,
    },
  };

  return fetch(graphqlPath, {
    method: "POST",
    body: JSON.stringify(mutation),
  }).then((response) => response.ok);
};
