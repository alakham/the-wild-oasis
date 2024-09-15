import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const darModeContext = createContext();

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "darkMode"
  );

  useEffect(
    function () {
      if (darkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [darkMode]
  );

  function handleDarkmode() {
    setDarkMode((dark) => !dark);
  }

  return (
    <darModeContext.Provider value={{ darkMode, handleDarkmode }}>
      {children}
    </darModeContext.Provider>
  );
}

function useDarkmode() {
  const context = useContext(darModeContext);

  if (context === "undefined")
    throw new Error("DarkModeContext was used out of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkmode };
