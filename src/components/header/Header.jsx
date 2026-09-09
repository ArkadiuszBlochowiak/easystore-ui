import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faMoon,
  faSun,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../store/cart-context";
import { useAuth } from "../../store/auth-context";

export default function Header() {
  const { totalQuantity } = useCart();

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
              <LoginMenu
                navLinkClass={navLinkClass}
                activeLinkClass={activeLinkClass}
              />
            </li>
            <li>
              <NavLink
                to="/cart"
                className="relative text-primary py-2 dark:text-light"
              >
                <FontAwesomeIcon icon={faShoppingBasket} />
                <div className="absolute -top-2 -right-6 text-xs bg-yellow-400 text-black font-semibold rounded-full px-2 py-1 leading-none">
                  {totalQuantity}
                </div>
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

function LoginMenu({ navLinkClass, activeLinkClass }) {
  const { isAuthenticated } = useAuth();

  const isAdmin = true;
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);

  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);
  const toggleAdminMenu = () => setAdminMenuOpen((prev) => !prev);

  const dropdownLinkClass =
    "block w-full text-left px-4 py-2 text-lg font-primary font-semibold text-primary dark:text-light hover:bg-gray-100 dark:hover:bg-gray-600";

  return (
    <>
      {isAuthenticated ? (
        <div className="relative">
          <button
            className="relative text-primary cursor-pointer"
            onClick={toggleUserMenu}
          >
            <span className={navLinkClass}>Hello John Doe</span>
            <FontAwesomeIcon
              icon={faAngleDown}
              className="text-primary dark:text-light w-6 h-6"
            />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 w-48 bg-normalbg dark:bg-darkbg border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20 transition ease-in-out duration-200">
              <ul className="py-2">
                <li>
                  <Link to="/profile" className={dropdownLinkClass}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className={dropdownLinkClass}>
                    Orders
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <button
                      className={`${dropdownLinkClass} flex items-center justify-between cursor-pointer`}
                      onClick={toggleAdminMenu}
                    >
                      Admin
                      <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                    {isAdminMenuOpen && (
                      <ul className="ml-4 space-y-2">
                        <li>
                          <Link
                            to="/admin/orders"
                            className={dropdownLinkClass}
                          >
                            Orders
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/messages"
                            className={dropdownLinkClass}
                          >
                            Messages
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                )}
                <li>
                  <Link to="/" className={dropdownLinkClass}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login" className={activeLinkClass}>
          Login
        </NavLink>
      )}
    </>
  );
}
