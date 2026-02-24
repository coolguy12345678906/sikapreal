import React, { useState } from 'react';
import { Plus, Download, ChevronRight, PieChart as PieIcon, Activity, Folder, AlignLeft, Calendar } from 'lucide-react';
import { MOCK_PROJECTS, MOCK_EXPENSES, formatCurrency } from '../constants';
import Modal from '../components/Modal';
import { useConfig } from '../ConfigContext';
import { Project } from '../types';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { exportToCSV } from '../utils/csvExport';

const Projects: React.FC = () => {
  const { t } = useConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  const handleExport = () => {
    exportToCSV(MOCK_PROJECTS, 'sikap-projects');
  };

  // Mock data for the detailed chart
  const detailedChartData = [
    { name: 'Planned', value: selectedProject ? selectedProject.totalBudget : 0 },
    { name: 'Actual', value: selectedProject ? selectedProject.budgetUsed : 0 },
  ];

  const projectExpenses = selectedProject 
    ? MOCK_EXPENSES.filter(e => e.projectId === selectedProject.id)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sikap-teal">{t('projects')}</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('manageProjects')}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download size={18} />
            CSV
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-sikap-teal text-white font-bold hover:bg-sikap-teal-dark transition-colors shadow-lg shadow-sikap-teal/30"
          >
            <Plus size={18} />
            {t('newProject')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Project List */}
        <div className="lg:col-span-3 space-y-4">
          {MOCK_PROJECTS.map((project) => {
             const progress = (project.budgetUsed / project.totalBudget) * 100;
             const isTeal = project.id === '1' || project.id === '3';
             const bgColor = isTeal ? 'bg-sikap-teal' : 'bg-sikap-orange';

             return (
               <div key={project.id} className={`${bgColor} text-white p-6 rounded-[2rem] shadow-lg transition-transform hover:-translate-y-1`}>
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-extrabold tracking-tight">{project.name}</h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                      {t(project.status === 'In Progress' ? 'inProgress' : project.status === 'Completed' ? 'completed' : 'planned')}
                    </span>
                 </div>
                 <p className="text-white/90 text-sm mb-6 max-w-xl leading-relaxed font-medium">
                   {project.description}
                 </p>

                 <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span>{t('budgetUsed')}</span>
                        <span>{formatCurrency(project.budgetUsed)} / {formatCurrency(project.totalBudget)}</span>
                      </div>
                      <div className="w-full bg-black/10 rounded-full h-3">
                        <div className="bg-white rounded-full h-3 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                      </div>
                      <p className="text-[10px] mt-1 font-bold text-white/80">{progress.toFixed(1)}% {t('used')}</p>
                    </div>
                 </div>

                 <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/20">
                   <div className="flex items-center gap-2 text-sm font-bold text-white/90">
                     <span>📅</span>
                     <span>{project.startDate}</span>
                   </div>
                   <button 
                    onClick={() => openProjectDetails(project)}
                    className="bg-white text-gray-800 px-5 py-2 rounded-full text-xs font-extrabold shadow-sm hover:bg-gray-100 hover:scale-105 transition-all flex items-center gap-1"
                   >
                     {t('viewDetails')} <ChevronRight size={14} />
                   </button>
                 </div>
               </div>
             );
          })}
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-4">
           <div className="bg-white dark:bg-sikap-darkCard p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
             <h4 className="text-sikap-teal font-bold text-sm mb-1 uppercase tracking-wider">Total Budget</h4>
             <p className="text-2xl font-extrabold text-sikap-orange">₱580,000</p>
           </div>
           <div className="bg-white dark:bg-sikap-darkCard p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
             <h4 className="text-sikap-teal font-bold text-sm mb-1 uppercase tracking-wider">Active Projects</h4>
             <p className="text-2xl font-extrabold text-sikap-orange">2</p>
           </div>
           <div className="bg-white dark:bg-sikap-darkCard p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
             <h4 className="text-sikap-teal font-bold text-sm mb-1 uppercase tracking-wider">Completed</h4>
             <p className="text-2xl font-extrabold text-sikap-orange">1</p>
           </div>
        </div>
      </div>

      {/* Add Project Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={t('newProject')}
        subtitle="Fill in the details below"
      >
        <form className="space-y-5">
          <div className="space-y-4">
            <div className="relative">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Project Name</label>
                <div className="relative">
                    <Folder className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input type="text" placeholder="Enter project name" className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-colors" />
                </div>
            </div>
            
            <div className="relative">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Description</label>
                <div className="relative">
                    <AlignLeft className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <textarea placeholder="Enter project description" rows={3} className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-colors"></textarea>
                </div>
            </div>

            <div className="relative">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Budget (₱)</label>
                <input type="number" placeholder="0.00" className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input type="date" className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl pl-10 pr-2 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input type="date" className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl pl-10 pr-2 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-colors" />
                  </div>
                </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">{t('cancel')}</button>
            <button type="submit" className="flex-1 bg-sikap-teal text-white font-bold py-3.5 rounded-xl hover:bg-sikap-teal-dark transition-colors shadow-lg shadow-sikap-teal/20">{t('add')}</button>
          </div>
        </form>
      </Modal>

      {/* Project Details Modal */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={closeProjectDetails}
        title={selectedProject?.name || ''}
        subtitle="Project Overview & Financials"
        maxWidth="max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Left: Chart & Stats */}
           <div className="space-y-6">
             <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <h4 className="flex items-center gap-2 font-bold text-gray-800 dark:text-white mb-4">
                  <PieIcon size={18} className="text-sikap-teal" />
                  Budget Analysis
                </h4>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={detailedChartData} layout="vertical" margin={{ left: 20 }}>
                      <XAxis type="number" hide />
                      <Tooltip 
                        cursor={{fill: 'transparent'}} 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                      />
                      <Bar dataKey="value" barSize={32} radius={[0, 4, 4, 0]}>
                         <Cell fill="#40C0C8" />
                         <Cell fill="#F5A050" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between text-sm px-2 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-sikap-teal"></div>
                    <span className="text-gray-500 dark:text-gray-400">Planned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-sikap-orange"></div>
                    <span className="text-gray-500 dark:text-gray-400">Actual</span>
                  </div>
                </div>
             </div>
             
             <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl">
               <h4 className="flex items-center gap-2 font-bold text-blue-800 dark:text-blue-300 mb-2">
                 <Activity size={18} />
                 Status Update
               </h4>
               <p className="text-sm text-blue-700 dark:text-blue-200 leading-relaxed">
                 This project is currently on track. The initial phase has been completed successfully. We are moving towards the procurement of remaining materials next week.
               </p>
             </div>
           </div>

           {/* Right: Expenses Table */}
           <div>
             <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-between">
               <span>Expense Breakdown</span>
               <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-500 dark:text-gray-300">{projectExpenses.length} Records</span>
             </h4>
             <div className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden max-h-[300px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold uppercase text-xs sticky top-0">
                    <tr>
                      <th className="px-4 py-3">Item</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {projectExpenses.length > 0 ? (
                      projectExpenses.map((exp) => (
                        <tr key={exp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-bold text-gray-800 dark:text-white">{exp.name}</div>
                            <div className="text-xs text-gray-400">{exp.date}</div>
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-sikap-orange">
                            {formatCurrency(exp.amount)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-4 py-8 text-center text-gray-400 italic">No expenses recorded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
             </div>
             <div className="mt-6 flex justify-end">
               <button onClick={closeProjectDetails} className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                 Close
               </button>
             </div>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default Projects;