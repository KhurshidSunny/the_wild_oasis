/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";
// eslint-disable-next-line no-unused-vars
function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
