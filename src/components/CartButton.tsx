import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { checkoutPath } from "../constants/constants";
import { useUser } from "../context/UserContext";

export const CartButton = () => {
  const navigate = useNavigate();
  const { getCart } = useUser();
  const cart = getCart();

  return (
    <Button
      color="yellow"
      onClick={() => navigate(checkoutPath)}
      icon
      labelPosition="left"
    >
      <Icon name="shopping cart" />({cart.length})
    </Button>
  );
};
