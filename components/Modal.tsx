import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Content */}
      <div className={`relative bg-white dark:bg-sikap-darkCard rounded-2xl w-full ${maxWidth} shadow-2xl transform transition-all overflow-hidden flex flex-col max-h-[90vh]`}>
        {/* Header */}
        <div className="bg-sikap-teal p-6 flex justify-between items-start">
          <div className="text-white">
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && <p className="text-white/80 text-sm mt-1">{subtitle}</p>}
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
