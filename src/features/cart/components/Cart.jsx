import PageTitle from "../../../components/heading/PageTitle";
import emptyCartImage from "../assets/util/emptycart.png";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../store/cart-context";
import { useMemo } from "react";
import CartTable from "./CartTable";

export default function Cart() {
  const { cart } = useCart();

  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  return (
    <div className="grow min-h-213 py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        {!isCartEmpty ? <CartTable /> : <EmptyCart />}
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
