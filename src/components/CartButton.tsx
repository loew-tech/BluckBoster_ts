import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { checkoutPath } from "../constants/constants";
import { useCart } from "../context/CartContext";

export const CartButton = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

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
