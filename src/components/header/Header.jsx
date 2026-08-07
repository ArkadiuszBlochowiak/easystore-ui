import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";

  const activeLinkClass = ({ isActive }) =>
    isActive ? `underline ${navLinkClass}` : navLinkClass;

  return (
    <header className="border-b border-gray-300 dark:border-gray-600 sticky top-0 z-20 bg-normalbg dark:bg-darkbg">
      <div className="flex items-center justify-between mx-auto max-w-6xl px-6 py-4">
        <NavLink to="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Eazy Stickers</span>
        </NavLink>
        <nav className="flex items-center py-2 z-10">
          <DarkModeSwitch />
          <ul className="flex space-x-6">
            <li>
              <NavLink to="/" className={activeLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={activeLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLinkClass}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={activeLinkClass}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="text-primary py-2 dark:text-light">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function DarkModeSwitch() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex items-center py-2 z-10">
      <button
        className="flex items-center justify-center mx-3 w-8 h-8 rounded-full border border-primary dark:border-light transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        aria-label="Toggle theme"
        onClick={toggleTheme}
      >
        <FontAwesomeIcon
          icon={theme === "dark" ? faMoon : faSun}
          className="w-4 h-4 dark:text-light text-primary"
        />
      </button>
    </div>
  );
}
