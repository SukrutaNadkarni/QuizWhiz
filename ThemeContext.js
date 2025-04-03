import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
  const storedTheme = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(storedTheme);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Fix: Only Export `ThemeContext` Once
export const useThemeContext = () => useContext(ThemeContext);
export default ThemeContext;
