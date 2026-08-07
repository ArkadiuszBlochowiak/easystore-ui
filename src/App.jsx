import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="bg-normalbg dark:bg-darkbg min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
