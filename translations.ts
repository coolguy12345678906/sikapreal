import { Language } from './types';

type Dictionary = Record<string, Record<Language, string>>;

export const translations: Dictionary = {
  dashboard: { en: 'Dashboard', fil: 'Dashboard' },
  projects: { en: 'Projects', fil: 'Mga Proyekto' },
  expenses: { en: 'Expenses', fil: 'Mga Gastusin' },
  calendar: { en: 'Calendar', fil: 'Kalendaryo' },
  reports: { en: 'Reports', fil: 'Ulat' },
  courses: { en: 'Courses', fil: 'Mga Kurso' },
  community: { en: 'Community', fil: 'Komunidad' },
  settings: { en: 'Settings', fil: 'Mga Setting' },
  
  // Dashboard
  budgetOverview: { en: 'Budget overview', fil: 'Pangkalahatang badyet' },
  totalExpenses: { en: 'Total Expenses', fil: 'Kabuuang Gastos' },
  remaining: { en: 'Remaining', fil: 'Natitira' },
  recentExpenses: { en: 'Recent Expenses', fil: 'Kamakailang Gastos' },
  activeProjects: { en: 'Active Projects', fil: 'Aktibong Proyekto' },
  used: { en: 'used', fil: 'nagamit' },
  
  // Projects
  manageProjects: { en: 'Manage barangay projects here!', fil: 'Pamahalaan ang mga proyekto ng barangay dito!' },
  newProject: { en: 'New Project', fil: 'Bagong Proyekto' },
  budgetUsed: { en: 'Budget used', fil: 'Nagamit na Badyet' },
  progress: { en: 'Progress', fil: 'Progreso' },
  viewDetails: { en: 'View Details', fil: 'Tingnan ang Detalye' },
  
  // Expenses
  addExpense: { en: 'Add Expense', fil: 'Magdagdag ng Gastos' },
  searchExpenses: { en: 'Search expenses...', fil: 'Maghanap ng gastos...' },
  expenseDetails: { en: 'Expense Details', fil: 'Detalye ng Gastos' },
  expenseInfo: { en: 'Expense Information', fil: 'Impormasyon ng Gastos' },
  receiptDocument: { en: 'Receipt / Document', fil: 'Resibo / Dokumento' },
  uploadReceipt: { en: 'Upload Receipt', fil: 'I-upload ang Resibo' },
  noReceipt: { en: 'No document attached', fil: 'Walang nakalakip na dokumento' },
  clickToView: { en: 'Click to view details', fil: 'I-click para sa detalye' },
  
  // Community
  sharedProjects: { en: 'Shared Projects', fil: 'Mga Ibinahaging Proyekto' },
  recentUpdates: { en: 'Recent Community Updates', fil: 'Kamakailang Update sa Komunidad' },
  totalShared: { en: 'Total Shared Projects', fil: 'Kabuuang Ibinahaging Proyekto' },
  activeContrib: { en: 'Active Contributors', fil: 'Aktibong Nag-aambag' },
  communityBudget: { en: 'Total Community Budget', fil: 'Kabuuang Badyet ng Komunidad' },

  // Settings
  appearance: { en: 'Appearance', fil: 'Hitsura' },
  darkMode: { en: 'Dark Mode', fil: 'Dark Mode' },
  language: { en: 'Language', fil: 'Wika' },
  dataManagement: { en: 'Data Management', fil: 'Pamamahala ng Datos' },
  exportData: { en: 'Export Data', fil: 'I-export ang Datos' },
  accountManagement: { en: 'Account Management', fil: 'Pamamahala ng Account' },
  logOut: { en: 'Log Out', fil: 'Mag-logout' },
  
  // Common
  cancel: { en: 'Cancel', fil: 'Kanselahin' },
  add: { en: 'Add', fil: 'Magdagdag' },
  completed: { en: 'Completed', fil: 'Tapos Na' },
  inProgress: { en: 'In Progress', fil: 'Isinasagawa' },
  planned: { en: 'Planned', fil: 'Nakaplano' },
  viewAll: { en: 'VIEW ALL ACTIVITY', fil: 'TINGNAN LAHAT NG AKTIBIDAD' }
};

export const getTranslation = (key: string, lang: Language): string => {
  if (translations[key]) {
    return translations[key][lang];
  }
  return key;
};