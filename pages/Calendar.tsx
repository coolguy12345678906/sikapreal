import React, { useState, useMemo } from 'react';
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, AlignLeft, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import { MOCK_EVENTS } from '../constants';
import { useConfig } from '../ConfigContext';
import { CalendarEvent } from '../types';

const Calendar: React.FC = () => {
  const { t } = useConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // Start at current month/year
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    type: 'meeting' as 'meeting' | 'deadline' | 'holiday'
  });

  // Calendar Logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 = Sunday

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    const event: CalendarEvent = {
      id: Math.random().toString(36).substr(2, 9),
      ...newEvent,
    };

    setEvents([...events, event]);
    setNewEvent({ title: '', date: '', description: '', type: 'meeting' });
    setIsModalOpen(false);
  };

  const getEventsForDay = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${month}-${dayStr}`;
    return events.filter(e => e.date === dateStr);
  };

  const selectedDayEvents = useMemo(() => {
    if (!selectedDate) {
        // If no day selected, show upcoming events for this month
        return events
            .filter(e => new Date(e.date).getMonth() === currentDate.getMonth() && new Date(e.date).getFullYear() === currentDate.getFullYear())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return getEventsForDay(selectedDate);
  }, [selectedDate, currentDate, events]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sikap-teal">{t('calendar')}</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your schedule and events</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-sikap-teal text-white font-bold hover:bg-sikap-teal-dark transition-colors shadow-lg shadow-sikap-teal/20"
        >
          <Plus size={20} />
          {t('add')} Event
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Calendar Grid */}
        <div className="flex-1 bg-white dark:bg-sikap-darkCard p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
           <div className="flex justify-between items-center mb-8">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"><ChevronLeft className="text-gray-600 dark:text-gray-300" /></button>
              <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white uppercase tracking-wide">
                {monthNames[currentDate.getMonth()]} <span className="text-sikap-teal">{currentDate.getFullYear()}</span>
              </h2>
              <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"><ChevronRight className="text-gray-600 dark:text-gray-300" /></button>
           </div>
           
           <div className="grid grid-cols-7 gap-4 mb-4 text-center">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="text-xs font-bold text-gray-400 tracking-wider">{day}</div>
              ))}
           </div>
           
           <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                const isSelected = selectedDate === day;
                const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();

                return (
                  <div 
                    key={day} 
                    onClick={() => setSelectedDate(day)}
                    className={`
                      aspect-square rounded-2xl flex flex-col items-center justify-start pt-2 relative cursor-pointer transition-all duration-200 border-2
                      ${isSelected 
                        ? 'bg-sikap-teal border-sikap-teal text-white shadow-lg shadow-sikap-teal/30 scale-105 z-10' 
                        : isToday
                            ? 'bg-orange-50 dark:bg-orange-900/20 border-sikap-orange text-sikap-orange'
                            : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-200'
                      }
                    `}
                  >
                    <span className={`text-sm font-bold`}>{day}</span>
                    <div className="flex gap-1 mt-1 flex-wrap justify-center px-1">
                        {dayEvents.map((ev, idx) => (
                            <div key={idx} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : ev.type === 'meeting' ? 'bg-sikap-orange' : 'bg-blue-400'}`}></div>
                        ))}
                    </div>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Sidebar Events */}
        <div className="w-full xl:w-96">
           <div className="bg-white dark:bg-sikap-darkCard p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 h-full transition-colors flex flex-col">
             <div className="mb-6 flex justify-between items-end border-b border-gray-100 dark:border-gray-700 pb-4">
               <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">SCHEDULE FOR</p>
                   <h3 className="text-2xl font-bold text-sikap-teal mt-1">
                     {selectedDate 
                        ? `${monthNames[currentDate.getMonth()].slice(0, 3)} ${selectedDate}` 
                        : `${monthNames[currentDate.getMonth()]} (All)`}
                   </h3>
               </div>
               <div className="text-right">
                   <p className="text-3xl font-extrabold text-gray-800 dark:text-white">{selectedDayEvents.length}</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Events</p>
               </div>
             </div>

             <div className="space-y-4 flex-1 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
               {selectedDayEvents.length > 0 ? (
                   selectedDayEvents.map(event => (
                     <div key={event.id} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl border-l-4 border-sikap-orange group hover:shadow-md transition-all">
                       <div className="flex justify-between items-start">
                           <div>
                               <h4 className="font-bold text-gray-800 dark:text-white text-lg">{event.title}</h4>
                               <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1 font-bold">
                                   <CalendarIcon size={12} /> {event.date}
                                   <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${event.type === 'meeting' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                       {event.type}
                                   </span>
                               </div>
                           </div>
                           <button onClick={() => setEvents(events.filter(e => e.id !== event.id))} className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                               <Trash2 size={16} />
                           </button>
                       </div>
                       <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">{event.description}</p>
                     </div>
                   ))
               ) : (
                   <div className="text-center py-10 text-gray-400">
                       <CalendarIcon size={48} className="mx-auto mb-3 opacity-20" />
                       <p className="font-medium">No events scheduled.</p>
                       <button onClick={() => setIsModalOpen(true)} className="text-sikap-teal text-sm font-bold mt-2 hover:underline">Add one now</button>
                   </div>
               )}
             </div>
           </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Add New Event"
        subtitle="Schedule a meeting or deadline"
      >
        <form onSubmit={handleAddEvent} className="space-y-5">
          <div className="space-y-4">
             <div className="relative">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Event Name</label>
                <div className="relative">
                    <AlignLeft className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        required
                        value={newEvent.title}
                        onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                        placeholder="e.g. Barangay Monthly Assembly" 
                        className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all" 
                    />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                 <div className="relative">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Date</label>
                    <div className="relative">
                        <input 
                            type="date" 
                            required
                            value={newEvent.date}
                            onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all" 
                        />
                    </div>
                 </div>
                 <div className="relative">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Type</label>
                    <div className="relative">
                        <select 
                            value={newEvent.type}
                            onChange={e => setNewEvent({...newEvent, type: e.target.value as any})}
                            className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all appearance-none" 
                        >
                            <option value="meeting">Meeting</option>
                            <option value="deadline">Deadline</option>
                            <option value="holiday">Holiday</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-3.5 text-gray-400 rotate-90" size={16} />
                    </div>
                 </div>
             </div>

             <div className="relative">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Description</label>
                <textarea 
                    rows={4} 
                    value={newEvent.description}
                    onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                    placeholder="Enter event details..." 
                    className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all"
                ></textarea>
             </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">{t('cancel')}</button>
            <button type="submit" className="flex-1 bg-sikap-teal text-white font-bold py-3.5 rounded-xl hover:bg-sikap-teal-dark transition-colors shadow-lg shadow-sikap-teal/20">{t('add')}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Calendar;