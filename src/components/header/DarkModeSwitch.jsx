import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function DarkModeSwitch() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newValue = theme === "dark" ? "light" : "dark";
    setTheme(newValue);

    if (newValue === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
