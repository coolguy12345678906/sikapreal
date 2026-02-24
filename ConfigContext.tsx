import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from './types';
import { translations } from './translations';

interface ConfigContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  userRole: 'admin' | 'public';
  setUserRole: (role: 'admin' | 'public') => void;
  t: (key: string) => string;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<'admin' | 'public'>('admin');

  // Apply dark mode to html tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <ConfigContext.Provider value={{ isDarkMode, toggleDarkMode, language, setLanguage, isSidebarOpen, toggleSidebar, userRole, setUserRole, t }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
