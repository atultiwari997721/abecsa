import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Default to 'light' as per request (Blue and White theme)
  // Default to 'light' and use a new key to avoid stale 'dark' state from previous versions
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('abecsa-theme') || 'light';
  });
  
  const [is3DMode, setIs3DMode] = useState(true); 

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove both potential classes to be safe
    root.classList.remove('dark', 'light');
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light'); // Optional but helps with specificity
    }
    localStorage.setItem('abecsa-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, is3DMode, setIs3DMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
