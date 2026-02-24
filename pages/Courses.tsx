import React, { useState } from 'react';
import { Plus, Clock, Users, BookOpen, PlayCircle, CheckCircle, Lock, Play, Pause, AlignLeft } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import Modal from '../components/Modal';
import { useConfig } from '../ConfigContext';
import { Course } from '../types';

const Courses: React.FC = () => {
  const { t } = useConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const handleEnroll = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    setEnrolledCourses(prev => ({ ...prev, [courseId]: true }));
  };

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveLessonId(course.lessons?.[0]?.id || null);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sikap-teal">{t('courses')}</h1>
          <p className="text-gray-600 dark:text-gray-400">Enhance your financial management skills</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-sikap-teal text-white font-bold hover:bg-sikap-teal-dark transition-colors shadow-lg shadow-sikap-teal/20"
        >
          <Plus size={20} />
          New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COURSES.map((course) => {
          const badgeColor = course.level === 'Beginner' ? 'bg-green-100 text-green-700' : 
                             course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
          const isEnrolled = enrolledCourses[course.id];
          
          return (
            <div key={course.id} className="bg-white dark:bg-sikap-darkCard p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] px-3 py-1 rounded-full font-extrabold uppercase ${badgeColor}`}>
                  {course.level}
                </span>
                <BookOpen size={20} className="text-sikap-orange" />
              </div>
              
              <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 min-h-[56px] line-clamp-2">{course.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 flex-1 line-clamp-3">{course.description}</p>
              
              <div className="flex justify-between items-center text-xs text-gray-400 font-bold mb-6">
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg">
                  <Clock size={14} />
                  <span>{course.durationHours} hours</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg">
                  <Users size={14} />
                  <span>{course.enrolled + (isEnrolled ? 1 : 0)}</span>
                </div>
              </div>
              
              {isEnrolled ? (
                   <button 
                     onClick={() => openCourse(course)}
                     className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 active:scale-95 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                   >
                     <PlayCircle size={18} /> Continue Learning
                   </button>
              ) : (
                   <button 
                     onClick={(e) => handleEnroll(e, course.id)}
                     className="w-full bg-sikap-teal text-white font-bold py-3 rounded-xl hover:bg-sikap-teal-dark active:scale-95 transition-all shadow-lg shadow-sikap-teal/20"
                   >
                     Enroll Now
                   </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Course Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Add New Course"
        subtitle="Create a learning module"
      >
        <form className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 ml-1">Course Title</label>
            <div className="relative">
                <BookOpen className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input type="text" placeholder="e.g. Advanced Auditing" className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 ml-1">Description</label>
            <div className="relative">
                <AlignLeft className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <textarea rows={3} placeholder="Course overview..." className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all"></textarea>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 ml-1">Level</label>
              <select className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all appearance-none">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 ml-1">Duration (Hours)</label>
              <input type="number" className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all" />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">{t('cancel')}</button>
            <button type="submit" className="flex-1 bg-sikap-teal text-white font-bold py-3.5 rounded-xl hover:bg-sikap-teal-dark transition-colors shadow-lg shadow-sikap-teal/20">{t('add')}</button>
          </div>
        </form>
      </Modal>

      {/* Course View / Player Modal */}
      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse?.title || ''}
        maxWidth="max-w-6xl"
      >
        <div className="flex flex-col lg:flex-row gap-6 h-[70vh]">
          {/* Left: Video Player Area */}
          <div className="flex-1 flex flex-col gap-4">
             <div className="flex-1 bg-black rounded-2xl overflow-hidden relative group">
                {isPlaying ? (
                    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                        <p className="text-white/50 animate-pulse">Playing Lesson Simulation...</p>
                        {/* In a real app, Video tag goes here */}
                    </div>
                ) : (
                    <>
                        <img src={`https://placehold.co/800x450/1F2937/FFF?text=${encodeURIComponent(selectedCourse?.title || 'Course')}`} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button 
                                onClick={() => setIsPlaying(true)}
                                className="bg-white/20 backdrop-blur-md rounded-full p-6 text-white group-hover:scale-110 transition-transform hover:bg-sikap-teal hover:border-transparent border-2 border-white"
                            >
                                <Play size={48} fill="currentColor" className="ml-2" />
                            </button>
                        </div>
                    </>
                )}
                
                {/* Player Controls (Fake) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                    </button>
                    <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full bg-sikap-teal w-1/3"></div>
                    </div>
                    <span className="text-xs font-bold">12:45 / 45:00</span>
                </div>
             </div>
             <div>
                 <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                     {selectedCourse?.lessons?.find(l => l.id === activeLessonId)?.title || "Introduction"}
                 </h3>
                 <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{selectedCourse?.description}</p>
             </div>
          </div>
          
          {/* Right: Modules / Sidebar */}
          <div className="w-full lg:w-96 flex flex-col bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <h4 className="font-bold text-gray-800 dark:text-white mb-4 px-2">Course Content</h4>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
               {selectedCourse?.lessons?.map((lesson, idx) => {
                 const isActive = lesson.id === activeLessonId;
                 return (
                    <div 
                        key={lesson.id} 
                        onClick={() => { setActiveLessonId(lesson.id); setIsPlaying(false); }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3
                            ${isActive 
                                ? 'bg-white dark:bg-gray-700 border-sikap-teal shadow-md' 
                                : 'bg-transparent border-transparent hover:bg-white dark:hover:bg-gray-700 hover:border-gray-200'
                            }`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${lesson.isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-sikap-teal text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-500'}`}>
                            {lesson.isCompleted ? <CheckCircle size={14} /> : idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h5 className={`text-sm font-bold truncate ${isActive ? 'text-sikap-teal' : 'text-gray-700 dark:text-gray-300'}`}>
                                {lesson.title}
                            </h5>
                            <p className="text-xs text-gray-400">{lesson.duration}</p>
                        </div>
                        {isActive && <div className="w-2 h-2 rounded-full bg-sikap-teal animate-pulse"></div>}
                        {!lesson.isCompleted && !isActive && <Lock size={14} className="text-gray-300" />}
                    </div>
                 );
               })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Courses;