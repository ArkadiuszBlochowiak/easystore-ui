import Footer from "./components/Footer";
import Header from "./components/header/Header";
import Home from "./components/Home";

function App() {
  return (
    <div className="bg-normalbg dark:bg-darkbg min-h-screen">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
