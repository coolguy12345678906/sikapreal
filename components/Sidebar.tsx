
import React from 'react';
// Changed import from 'react-router-dom' to 'react-router' to fix export error in certain environments
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CreditCard, 
  CalendarDays, 
  PieChart, 
  BookOpen, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCircle
} from 'lucide-react';
import { useConfig } from '../ConfigContext';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'dashboard', path: '/' },
  { icon: FolderOpen, label: 'projects', path: '/projects' },
  { icon: CreditCard, label: 'expenses', path: '/expenses' },
  { icon: CalendarDays, label: 'calendar', path: '/calendar' },
  { icon: PieChart, label: 'reports', path: '/reports' },
  { icon: BookOpen, label: 'courses', path: '/courses' },
  { icon: Users, label: 'community', path: '/community' },
  { icon: Settings, label: 'settings', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar, t, userRole, setUserRole } = useConfig();

  const handleSwitchAccount = () => {
    setUserRole(userRole === 'admin' ? 'public' : 'admin');
  };

  const filteredNavItems = NAV_ITEMS.filter(item => {
    if (userRole === 'admin') return true;
    // Public role hides: dashboard, expenses, calendar, reports
    const hiddenForPublic = ['dashboard', 'expenses', 'calendar', 'reports'];
    return !hiddenForPublic.includes(item.label);
  });

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen bg-white dark:bg-sikap-darkCard border-r border-gray-100 dark:border-gray-700 
        flex flex-col z-20 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'w-64' : 'w-20'}
      `}
    >
      {/* Logo Area */}
      <div className={`p-6 flex items-center justify-center relative h-24 ${!isSidebarOpen && 'px-2'}`}>
        <div className={`flex flex-col items-center transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <div className="flex leading-none tracking-tight">
             <span className="text-5xl font-extrabold text-sikap-orange">si</span>
             <span className="text-5xl font-extrabold text-sikap-teal">kap</span>
          </div>
          <span className="text-lg font-bold text-sikap-teal tracking-[0.3em] mt-0 w-full text-center">fundhub</span>
          <div className="mt-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
            User: {userRole}
          </div>
        </div>
        
        {/* Minimized Logo */}
        {!isSidebarOpen && (
           <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
             <span className="text-3xl font-extrabold text-sikap-orange">s</span>
             <span className="text-3xl font-extrabold text-sikap-teal -mt-2">k</span>
           </div>
        )}

        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full p-1 text-gray-400 hover:text-sikap-teal transition-colors shadow-sm"
        >
          {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-sikap-teal/10 text-sikap-teal font-bold' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200'}
            `}
            title={!isSidebarOpen ? t(item.label) : ''}
          >
            {({ isActive }) => (
              <>
                <div className="min-w-[24px] flex justify-center">
                   <item.icon 
                      size={22} 
                      className={isActive ? 'text-sikap-teal fill-current/10' : 'text-current group-hover:text-sikap-teal transition-colors'} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                </div>
                <span className={`whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'}`}>
                  {t(item.label)}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Switch Account Button at Bottom */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={handleSwitchAccount}
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
            bg-gray-50 dark:bg-gray-800 hover:bg-sikap-teal/10 text-gray-500 dark:text-gray-400 hover:text-sikap-teal
          `}
          title={!isSidebarOpen ? `Switch to ${userRole === 'admin' ? 'Public' : 'Admin'}` : ''}
        >
          <div className="min-w-[24px] flex justify-center">
            <UserCircle size={22} className="group-hover:text-sikap-teal transition-colors" />
          </div>
          <span className={`whitespace-nowrap font-bold text-xs transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'}`}>
            Switch to {userRole === 'admin' ? 'Public' : 'Admin'}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
