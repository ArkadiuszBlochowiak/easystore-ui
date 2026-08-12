import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import { useNavigation } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { isDarkThemeVisible } from "./utils/utils";
import { CartProvider } from "./store/cart-context";

function App() {
  const navigation = useNavigation();
  const isDarkTheme = isDarkThemeVisible();

  return (
    <div className="bg-normalbg dark:bg-darkbg min-h-screen flex flex-col">
      <CartProvider>
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
      </CartProvider>
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
