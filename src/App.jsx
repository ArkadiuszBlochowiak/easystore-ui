import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import { useNavigation } from "react-router-dom";

function App() {
  const navigation = useNavigation();

  return (
    <div className="bg-normalbg dark:bg-darkbg min-h-screen flex flex-col">
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
    </div>
  );
}

export default App;
