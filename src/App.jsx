import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import { useNavigation } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { isDarkThemeVisible } from "./utils/utils";
import { CartContext } from "./store/cart-context";

function App() {
  const navigation = useNavigation();
  const isDarkTheme = isDarkThemeVisible();
  const initialCartContext = {
    cart: [],
    setCart: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    totalQuantity: 0,
  };

  return (
    <div className="bg-normalbg dark:bg-darkbg min-h-screen flex flex-col">
      <CartContext value={initialCartContext}>
        <Header />
        {navigation.state === "loading" ? (
          <div className="flex grow items-center justify-center">
            <span className="text-2xl font-semibold text-primary dark:text-light">
              Loading...
            </span>
          </div>
        ) : (
          <Outlet />
        )}
        <Footer />
      </CartContext>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={true}
        theme={isDarkTheme ? "dark" : "light"}
        transition={Bounce}
      />
    </div>
  );
}

export default App;
