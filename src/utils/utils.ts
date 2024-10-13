import { cartRemoveURI, cartURI } from "../constants/constants";

export const fetchCart = async (username: string) => {
  const response = await fetch(
    // @TODO: use /members/{username}/cart endpoint
    `http://127.0.0.1:8080/api/v1/members/cart/${username}`
  );
  if (response.ok) {
    const existingCart = await response.json();
    return existingCart;
  }
  return [];
};

// @TODO: should user cart be set here?
export const updateCart = (
  username: string,
  movie_id: string,
  cart: string[],
  removeFromCart: boolean
) => {
  let newCart = [...cart];
  if (!removeFromCart) {
    newCart.unshift(movie_id);
    fetch(cartURI, {
      method: "put",
      body: JSON.stringify({ username, movie_id }),
    });
  } else {
    fetch(cartRemoveURI, {
      method: "put",
      body: JSON.stringify({ username, movie_id }),
    });
    const index = newCart.indexOf(movie_id);
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
    return member;
  }
};
