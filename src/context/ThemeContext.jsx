import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [is3DMode, setIs3DMode] = useState(true);

  const toggleTheme = () => {
    setIs3DMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (is3DMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [is3DMode]);

  return (
    <ThemeContext.Provider value={{ is3DMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
