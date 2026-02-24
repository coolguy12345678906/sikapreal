
import React from 'react';
// Changed imports from 'react-router-dom' to 'react-router' to fix export errors in certain environments
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Expenses from './pages/Expenses';
import Calendar from './pages/Calendar';
import Reports from './pages/Reports';
import Courses from './pages/Courses';
import Community from './pages/Community';
import Settings from './pages/Settings';
import { ConfigProvider, useConfig } from './ConfigContext';

const AppRoutes: React.FC = () => {
  const { userRole } = useConfig();
  const isAdmin = userRole === 'admin';

  return (
    <Routes>
      <Route path="/" element={isAdmin ? <Dashboard /> : <Navigate to="/projects" replace />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/expenses" element={isAdmin ? <Expenses /> : <Navigate to="/projects" replace />} />
      <Route path="/calendar" element={isAdmin ? <Calendar /> : <Navigate to="/projects" replace />} />
      <Route path="/reports" element={isAdmin ? <Reports /> : <Navigate to="/projects" replace />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/community" element={<Community />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to={isAdmin ? "/" : "/projects"} replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <HashRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </HashRouter>
    </ConfigProvider>
  );
};

export default App;
