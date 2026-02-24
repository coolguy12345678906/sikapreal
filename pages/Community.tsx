import React, { useState } from 'react';
import { User, MessageSquare, Heart, Share2, Clock, MoreHorizontal, ArrowUpRight, History, SortAsc } from 'lucide-react';
import { MOCK_SHARED_PROJECTS, MOCK_UPDATES, formatCurrency } from '../constants';
import { useConfig } from '../ConfigContext';
import Modal from '../components/Modal';

const Community: React.FC = () => {
  const { t } = useConfig();
  const [likes, setLikes] = useState<Record<string, number>>({ 's1': 12, 's2': 5, 's3': 20 });
  const [comments, setComments] = useState<Record<string, number>>({ 's1': 4, 's2': 1, 's3': 8 });
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [sortOrder, setSortOrder] = useState<'Newest' | 'Oldest'>('Newest');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [showInviteToast, setShowInviteToast] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const toggleLike = (id: string) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
    setLikes(prev => ({
      ...prev,
      [id]: prev[id] + (likedPosts[id] ? -1 : 1)
    }));
  };

  const handleShare = (projectName: string) => {
    // Simulate share
    const text = `Check out this project: ${projectName}`;
    if (navigator.share) {
        navigator.share({ title: 'Sikap FundHub', text: text, url: window.location.href }).catch(console.error);
    } else {
        setShowInviteToast(true);
        setTimeout(() => setShowInviteToast(false), 3000);
    }
  };

  const sortedProjects = [...MOCK_SHARED_PROJECTS].sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return sortOrder === 'Newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      {showInviteToast && (
          <div className="fixed bottom-10 right-10 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce flex items-center gap-3">
              <span className="bg-green-500 rounded-full p-1"><ArrowUpRight size={12}/></span>
              Link copied to clipboard!
          </div>
      )}

      <div>
        <h1 className="text-4xl font-extrabold text-sikap-teal">{t('community')}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">{t('sharedProjects')} & Updates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed - Shared Projects (8 columns) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-2">
             <h3 className="font-bold text-gray-800 dark:text-white text-xl">{t('sharedProjects')} Feed</h3>
             <button 
                onClick={() => setSortOrder(prev => prev === 'Newest' ? 'Oldest' : 'Newest')}
                className="text-sikap-teal font-bold text-sm hover:underline flex items-center gap-1"
             >
                 <SortAsc size={16} />
                 Sort by: {sortOrder}
             </button>
          </div>

          {sortedProjects.map((project, idx) => {
            const statusColor = project.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 
                                project.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600';
            
            const iconBg = idx % 3 === 0 ? 'bg-blue-100 text-blue-600' : idx % 3 === 1 ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600';

            return (
              <div key={project.id} className="bg-white dark:bg-sikap-darkCard rounded-3xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-visible relative">
                 {/* Card Header */}
                 <div className="p-6 pb-4 flex justify-between items-start">
                   <div className="flex gap-4">
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg} shadow-sm`}>
                       <User size={24} />
                     </div>
                     <div>
                       <h3 className="font-bold text-gray-800 dark:text-white text-lg">{project.sharedBy}</h3>
                       <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{project.startDate}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock size={12}/> 2h ago</span>
                       </div>
                     </div>
                   </div>
                   <div className="relative">
                       <button 
                         onClick={() => setActiveMenuId(activeMenuId === project.id ? null : project.id)}
                         className="text-gray-400 hover:text-sikap-teal transition-colors p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800"
                       >
                           <MoreHorizontal size={20} />
                       </button>
                       {activeMenuId === project.id && (
                           <div className="absolute right-0 top-10 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg w-40 z-20 py-2 animate-fade-in">
                               <button className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold">Report</button>
                               <button className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold">Not interested</button>
                           </div>
                       )}
                   </div>
                 </div>
                 
                 {/* Card Body */}
                 <div className="px-6 py-2">
                    <h2 className="text-xl font-extrabold text-sikap-teal mb-2">{project.name}</h2>
                    <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                 </div>

                 {/* Project Stats */}
                 <div className="px-6 py-6">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                       <div className="flex justify-between items-center text-sm mb-3">
                          <span className="font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Project Status</span>
                          <span className={`px-3 py-1 rounded-full font-bold text-xs ${statusColor}`}>{project.status}</span>
                       </div>
                       
                       <div className="space-y-4">
                          <div>
                             <div className="flex justify-between text-sm font-bold mb-2">
                                <span className="text-gray-700 dark:text-gray-300">Budget Usage</span>
                                <span className="text-gray-900 dark:text-white">{formatCurrency(project.budgetUsed)} <span className="text-gray-400 font-normal">/ {formatCurrency(project.totalBudget)}</span></span>
                             </div>
                             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                               <div className={`h-2.5 rounded-full ${project.status === 'Completed' ? 'bg-green-500' : 'bg-sikap-teal'}`} style={{ width: project.status === 'Completed' ? '100%' : '67.5%' }}></div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 {/* Card Footer */}
                 <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex gap-6">
                       <button 
                        onClick={() => toggleLike(project.id)}
                        className={`flex items-center gap-2 transition-colors font-bold text-sm ${likedPosts[project.id] ? 'text-pink-500' : 'text-gray-500 dark:text-gray-400 hover:text-pink-500'}`}
                       >
                          <Heart size={18} fill={likedPosts[project.id] ? "currentColor" : "none"} /> {likes[project.id]} Likes
                       </button>
                       <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors font-bold text-sm">
                          <MessageSquare size={18} /> {comments[project.id]} Comments
                       </button>
                    </div>
                    <button 
                        onClick={() => handleShare(project.name)}
                        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-sikap-teal transition-colors font-bold text-sm"
                    >
                       <Share2 size={18} /> Share Project
                    </button>
                 </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar - Updates & Stats (4 columns) */}
        <div className="lg:col-span-4 space-y-8">
           {/* Recent Updates */}
           <div className="bg-white dark:bg-sikap-darkCard p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-md transition-colors">
             <h4 className="font-extrabold text-sikap-teal text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-sikap-teal rounded-full"></span>
                {t('recentUpdates')}
             </h4>
             <div className="space-y-8 relative">
               <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-gray-100 dark:bg-gray-700"></div>
               
               {MOCK_UPDATES.slice(0, 3).map(update => (
                 <div key={update.id} className="relative pl-8 group">
                   <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white dark:bg-sikap-darkCard border-4 border-gray-200 dark:border-gray-600 group-hover:border-sikap-teal transition-colors z-10"></div>
                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 leading-snug">
                     <span className="font-bold text-gray-900 dark:text-white">{update.user}</span> {update.action} <span className="font-bold text-sikap-teal hover:underline cursor-pointer">{update.target}</span>
                   </p>
                   <p className="text-xs text-gray-400 font-medium">{update.date}</p>
                 </div>
               ))}
             </div>
             <button 
                onClick={() => setIsHistoryModalOpen(true)}
                className="w-full mt-8 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
             >
                <History size={16} /> View All History
             </button>
           </div>

           {/* Stats Cards */}
           <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-br from-sikap-teal to-teal-600 p-6 rounded-3xl shadow-lg text-white">
                 <p className="text-xs font-bold text-white/70 uppercase tracking-wide mb-2">{t('communityBudget')}</p>
                 <h3 className="text-3xl font-extrabold">₱630,000</h3>
                 <p className="text-sm text-white/80 mt-1">Total allocated across projects</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-sikap-darkCard p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors text-center">
                    <p className="text-4xl font-extrabold text-gray-800 dark:text-white">{sortedProjects.length}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2 leading-tight">{t('totalShared')}</p>
                </div>
                
                <div className="bg-white dark:bg-sikap-darkCard p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors text-center">
                    <p className="text-4xl font-extrabold text-sikap-orange">3</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2 leading-tight">{t('activeContrib')}</p>
                </div>
              </div>
           </div>
           
           {/* Invite Box */}
           <div className="bg-gray-800 dark:bg-gray-700 rounded-3xl p-8 text-center text-white shadow-lg">
              <h4 className="font-bold text-lg mb-2">Invite Neighbors</h4>
              <p className="text-sm text-gray-300 mb-6">Encourage transparency by inviting other barangay officials.</p>
              <button 
                onClick={() => {
                    setShowInviteToast(true);
                    setTimeout(() => setShowInviteToast(false), 3000);
                }}
                className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors w-full"
              >
                 Send Invite Link
              </button>
           </div>
        </div>
      </div>

      {/* History Modal */}
      <Modal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        title="Community Activity History"
        subtitle="Full log of actions and updates"
        maxWidth="max-w-2xl"
      >
          <div className="space-y-6 pl-4 relative">
             <div className="absolute left-[22px] top-2 bottom-2 w-[2px] bg-gray-100 dark:bg-gray-700"></div>
             {MOCK_UPDATES.map(update => (
                 <div key={update.id} className="relative pl-10 group">
                   <div className="absolute left-3 top-1.5 w-4 h-4 rounded-full bg-white dark:bg-sikap-darkCard border-4 border-gray-200 dark:border-gray-600 group-hover:border-sikap-teal transition-colors z-10"></div>
                   <p className="text-sm text-gray-800 dark:text-white mb-1">
                     <span className="font-bold">{update.user}</span> {update.action} <span className="font-bold text-sikap-teal">{update.target}</span>
                   </p>
                   <p className="text-xs text-gray-400 font-medium">{update.date}</p>
                 </div>
             ))}
             {/* Mock older updates */}
             <div className="relative pl-10 group opacity-60">
                <div className="absolute left-3 top-1.5 w-4 h-4 rounded-full bg-white dark:bg-sikap-darkCard border-4 border-gray-200 dark:border-gray-600 z-10"></div>
                <p className="text-sm text-gray-800 dark:text-white mb-1">System started tracking</p>
                <p className="text-xs text-gray-400 font-medium">12/01/2023</p>
             </div>
          </div>
          <button onClick={() => setIsHistoryModalOpen(false)} className="mt-8 w-full py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold text-gray-600 dark:text-gray-300">Close Log</button>
      </Modal>
    </div>
  );
};

export default Community;