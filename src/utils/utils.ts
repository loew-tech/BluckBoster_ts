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
  console.log(`$movie_id=${movie_id}`, `$removeFromCart=${removeFromCart}`);
  let newCart = [...cart];
  if (!removeFromCart) {
    newCart.unshift(movie_id);
    fetch("http://127.0.0.1:8080/api/v1/members/cart", {
      method: "put",
      body: JSON.stringify({ username, movie_id }),
    });
  } else {
    console.log("$$ IN else block");
    fetch("http://127.0.0.1:8080/api/v1/members/cart/remove", {
      method: "put",
      body: JSON.stringify({ username, movie_id }),
    });
    const index = newCart.indexOf(movie_id);
    newCart.splice(index, 1);
  }
  console.log("cart=", cart, "newCart=", newCart);
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
