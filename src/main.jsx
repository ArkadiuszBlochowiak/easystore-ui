import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About.jsx";
import Contact from "./features/contact/components/Contact.jsx";
import Login from "./features/login/components/Login.jsx";
import Register from "./features/login/components/Register.jsx";
import { loginAction, registerAction } from "./features/login/utils/utils.js";
import Cart from "./features/cart/components/Cart.jsx";
import Home from "./features/home/components/Home.jsx";
import { productsLoader } from "./features/home/utils/utils.js";
import ErrorPage from "./components/ErrorPage.jsx";
import { contactAction } from "./features/contact/utils/utils.js";
import ProductDetail from "./features/home/components/product/ProductDetail.jsx";
import { CartProvider } from "./store/cart-context";
import { AuthProvider } from "./store/auth-context.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile, {
  profileAction,
  profileLoader,
} from "./components/Profile.jsx";
import Orders, { ordersLoader } from "./components/Orders.jsx";
import AdminOrders, {
  adminOrdersLoader,
} from "./components/admin/AdminOrders.jsx";
import Messages from "./components/admin/Messages.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./features/cart/components/OrderSuccess.jsx";
import CheckoutForm from "./features/cart/components/CheckoutForm.jsx";

const stripePromise = loadStripe(
  "pk_test_51UGF5tIoC4Y3ast2V086EXJfEGsu57gEFGDR8kTBhaigVZ1eFt9TURqeKfOIlGjBB76AEIWvfrtdOlQgHVXp4AjJ00f2u9ZxGK",
);

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
        loader: productsLoader,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
        action: contactAction,
      },
      {
        path: "login",
        Component: Login,
        action: loginAction,
      },
      {
        path: "register",
        Component: Register,
        action: registerAction,
      },
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "products/:productId",
        Component: ProductDetail,
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            path: "checkout",
            Component: CheckoutForm,
          },
          {
            path: "order-success",
            Component: OrderSuccess,
          },
          {
            path: "profile",
            Component: Profile,
            loader: profileLoader,
            action: profileAction,
            shouldRevalidate: ({ actionResult }) => {
              return !actionResult?.success;
            },
          },
          {
            path: "orders",
            Component: Orders,
            loader: ordersLoader,
          },
          {
            path: "admin/orders",
            Component: AdminOrders,
            loader: adminOrdersLoader,
          },
          {
            path: "admin/messages",
            Component: Messages,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </Elements>
  </StrictMode>,
);
