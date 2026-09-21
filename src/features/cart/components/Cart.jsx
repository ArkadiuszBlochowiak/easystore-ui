import PageTitle from "../../../components/heading/PageTitle";
import emptyCartImage from "../../../assets/util/emptyCart.png";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../../store/cart-context";
import { useMemo } from "react";
import CartTable from "./CartTable";
import { useAuth } from "../../../store/auth-context";

export default function Cart() {
  const { cart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const isAddressIncomplete = useMemo(() => {
    if (!isAuthenticated) return false;
    if (!user.address) return true;

    const { street, city, state, postalCode, country } = user.address;
    return !street || !city || !state || !postalCode || !country;
  }, [user, isAuthenticated]);

  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  return (
    <div className="grow min-h-213 py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        {!isCartEmpty ? (
          <>
            {isAddressIncomplete && (
              <p className="text-red-500 text-lg mt-2 text-center">
                Please update your address in your profile to proceed to
                checkout.
              </p>
            )}
            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
              {/* Back to Products Button */}
              <Link
                to="/"
                className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
              >
                Back to Products
              </Link>
              {/* Proceed to Checkout Button */}
              <Link
                to={isAddressIncomplete ? "#" : "/checkout"}
                className={`py-2 px-4 text-xl font-semibold rounded-sm flex justify-center items-center transition text-white dark:text-black ${isAddressIncomplete ? "bg-gray-400 cursor-not-allowed" : "bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"}`}
                onClick={(e) => {
                  if (isAddressIncomplete) {
                    e.preventDefault();
                  }
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
}

function EmptyCart() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="text-center text-gray-600 dark:text-lighter flex flex-col items-center">
      <p className="max-w-xl px-2 mx-auto text-base mb-4">
        Oops... Your cart is empty. Continue shopping
      </p>
      <img
        src={emptyCartImage}
        alt="Empty Cart"
        className="max-w-75 mx-auto mb-6 dark:bg-light dark:rounded-md"
      />
      <button
        onClick={handleClick}
        className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
      >
        Back to Products
      </button>
    </div>
  );
}
