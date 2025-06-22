import { Member, Movie } from "../types/types";

const graphqlPath = "http://127.0.0.1:8080/graphql/v1";

export const login = async (username: string): Promise<boolean> => {
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
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data.data.GetMember));
  }
  return response.ok;
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
    return null;
  }
  const data = await response.json();
  return data.data.GetMovie ?? null;
};

export const fetchMovies = async (page: string): Promise<Movie[] | null> => {
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
  return data.data.GetMovies ?? null;
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
    mutation ReturnRentals($username: ID!, $movieIDs: [String]!) {
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
    const index = newCart.indexOf(movieID);
    newCart.splice(index, 1);
  } else {
    newCart.push(movieID);
  }
  const mutation = {
    query: `
    mutation UpdateCart($username: ID!, $movieID: String!, $removeFromCart: Boolean!) {
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
  const localData = localStorage.getItem("user");
  if (!localData) {
    return null;
  }
  const user = JSON.parse(localData);
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
    mutation Checkout($username: ID!, $movieIDs: [String]!) {
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
