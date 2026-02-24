import React from 'react';
import Sidebar from './Sidebar';
import { useConfig } from '../ConfigContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSidebarOpen } = useConfig();

  return (
    <div className="min-h-screen bg-sikap-bg dark:bg-sikap-darkBg transition-colors duration-300">
      <Sidebar />
      <main 
        className={`
          transition-all duration-300 ease-in-out p-8 min-h-screen
          ${isSidebarOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        <div className="max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Layout;
