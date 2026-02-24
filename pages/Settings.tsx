import React from 'react';
import { Download, LogOut } from 'lucide-react';
import { useConfig } from '../ConfigContext';
import { exportToCSV } from '../utils/csvExport';
import { MOCK_PROJECTS, MOCK_EXPENSES } from '../constants';

const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode, language, setLanguage, userRole, setUserRole, t } = useConfig();

  const handleSwitchAccount = () => {
    setUserRole(userRole === 'admin' ? 'public' : 'admin');
  };

  const handleExportAll = () => {
    // Combine projects and expenses for demo export
    exportToCSV(MOCK_PROJECTS, 'sikap-all-projects');
    // In a real app, you'd likely export multiple files or a zip
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-sikap-teal">{t('settings')}</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your application preferences</p>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-sikap-darkCard rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-50 dark:border-gray-700">
          <h3 className="font-bold text-sikap-teal text-lg">{t('appearance')}</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
             <div>
               <h4 className="font-bold text-gray-800 dark:text-white text-sm">{t('darkMode')}</h4>
               <p className="text-xs text-gray-400 mt-1">Switch between light and dark themes</p>
             </div>
             <div 
              onClick={toggleDarkMode}
              className={`w-14 h-8 rounded-full relative cursor-pointer transition-colors duration-300 ${isDarkMode ? 'bg-sikap-teal' : 'bg-gray-200'}`}
             >
               <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
             </div>
          </div>
          <div className="flex justify-between items-center">
             <div>
               <h4 className="font-bold text-gray-800 dark:text-white text-sm">{t('language')}</h4>
               <p className="text-xs text-gray-400 mt-1">Select your preferred language</p>
             </div>
             <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
               <button 
                onClick={() => setLanguage('en')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'en' ? 'bg-white text-sikap-teal shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'}`}
               >
                 English
               </button>
               <button 
                onClick={() => setLanguage('fil')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'fil' ? 'bg-white text-sikap-teal shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'}`}
               >
                 Filipino
               </button>
             </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-sikap-darkCard rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-50 dark:border-gray-700">
          <h3 className="font-bold text-sikap-teal text-lg">{t('dataManagement')}</h3>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center">
             <div>
               <h4 className="font-bold text-gray-800 dark:text-white text-sm">{t('exportData')}</h4>
               <p className="text-xs text-gray-400 mt-1">Download all projects and expenses as CSV</p>
             </div>
             <button 
              onClick={handleExportAll}
              className="bg-sikap-teal hover:bg-sikap-teal-dark text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-sikap-teal/20"
             >
               <Download size={14} /> Download .csv
             </button>
          </div>
        </div>
      </div>

      {/* Account */}
      <div className="bg-white dark:bg-sikap-darkCard rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-gray-50 dark:border-gray-700">
          <h3 className="font-bold text-sikap-teal text-lg">{t('accountManagement')}</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <button className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
               <span className="font-bold text-sm text-gray-800 dark:text-gray-200">Change Password</span>
             </button>
             <button 
              onClick={handleSwitchAccount}
              className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
             >
               <span className="font-bold text-sm text-gray-800 dark:text-gray-200">Switch Account ({userRole === 'admin' ? 'Public' : 'Admin'})</span>
             </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <button className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
               <span className="font-bold text-sm text-gray-800 dark:text-gray-200">Reset Data</span>
             </button>
             <button className="bg-red-500 hover:bg-red-600 rounded-xl p-4 text-left text-white transition-colors flex items-center justify-between shadow-lg shadow-red-500/20">
               <span className="font-bold text-sm">{t('logOut')}</span>
               <LogOut size={16} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
