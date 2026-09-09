import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About.jsx";
import Contact from "./features/contact/components/Contact.jsx";
import Login, { loginAction } from "./components/Login.jsx";
import Cart from "./features/cart/components/Cart.jsx";
import Home from "./features/home/components/Home.jsx";
import { productsLoader } from "./features/home/utils/utils.js";
import ErrorPage from "./components/ErrorPage.jsx";
import { contactAction } from "./features/contact/utils/utils.js";
import ProductDetail from "./features/home/components/product/ProductDetail.jsx";
import { CartProvider } from "./store/cart-context";
import { AuthProvider } from "./store/auth-context.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./components/Profile.jsx";
import Orders from "./components/Orders.jsx";
import AdminOrders from "./components/admin/AdminOrders.jsx";
import Messages from "./components/admin/Messages.jsx";

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
            path: "profile",
            Component: Profile,
          },
          {
            path: "orders",
            Component: Orders,
          },
          {
            path: "admin/orders",
            Component: AdminOrders,
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
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
