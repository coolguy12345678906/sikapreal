import React, { useState } from 'react';
import { Plus, Search, FileText, Upload, AlignLeft, DollarSign, Type } from 'lucide-react';
import { MOCK_EXPENSES, formatCurrency } from '../constants';
import Modal from '../components/Modal';
import { useConfig } from '../ConfigContext';
import { Expense } from '../types';

const Expenses: React.FC = () => {
  const { t } = useConfig();
  const [filter, setFilter] = useState<'All' | 'OPEX' | 'CAPEX'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const filteredExpenses = MOCK_EXPENSES.filter(e => filter === 'All' || e.category === filter);

  const getButtonClass = (type: string) => {
    const baseClass = "px-8 py-3 rounded-full font-bold text-sm transition-colors border";
    
    if (filter === type) {
      if (type === 'OPEX') return `${baseClass} bg-sikap-orange border-sikap-orange text-white shadow-lg shadow-sikap-orange/20`;
      if (type === 'CAPEX') return `${baseClass} bg-sikap-teal border-sikap-teal text-white shadow-lg shadow-sikap-teal/20`;
      return `${baseClass} bg-gray-700 border-gray-700 text-white`; // All
    }
    
    return `${baseClass} bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 hover:border-gray-300 dark:hover:border-gray-500`;
  };

  return (
    <div className="space-y-8">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-sikap-teal">{t('expenses')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Manage your expenses here!</p>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-3 px-8 py-3 rounded-full border-2 border-sikap-teal text-sikap-teal dark:text-sikap-teal font-bold hover:bg-sikap-teal hover:text-white transition-colors shadow-sm"
          >
            <Plus size={22} />
            {t('addExpense')}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-4 text-gray-300" size={24} />
          <input 
            type="text" 
            placeholder={t('searchExpenses')}
            className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sikap-teal/20 focus:border-sikap-teal transition-colors text-base"
          />
        </div>
        <div className="flex gap-3">
          {['All', 'OPEX', 'CAPEX'].map((type) => (
            <button 
              key={type}
              onClick={() => setFilter(type as any)}
              className={getButtonClass(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Expense List */}
      <div className="space-y-5">
        {filteredExpenses.map((expense) => (
          <div 
            key={expense.id} 
            onClick={() => setSelectedExpense(expense)}
            className="bg-white dark:bg-sikap-darkCard p-0 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
          >
            <div className={`w-24 md:w-36 flex-shrink-0 flex items-center justify-center text-white font-bold text-3xl ${expense.category === 'OPEX' ? 'bg-sikap-orange' : 'bg-sikap-teal'}`}>
               {expense.category[0]}
            </div>
            <div className="flex-1 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${expense.category === 'OPEX' ? 'text-sikap-orange' : 'text-sikap-teal'}`}>{expense.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-base mb-2">{expense.description}</p>
                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-400 font-medium">{expense.date}</p>
                    <span className="text-xs text-sikap-teal font-bold bg-sikap-teal/10 px-2 py-0.5 rounded flex items-center gap-1">
                        <FileText size={12} /> {t('clickToView')}
                    </span>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <span className={`text-3xl font-extrabold ${expense.category === 'OPEX' ? 'text-sikap-orange' : 'text-sikap-teal'}`}>
                  {formatCurrency(expense.amount)}
                </span>
                <span className={`text-xs px-4 py-1.5 rounded-full font-bold uppercase ${
                  expense.category === 'CAPEX' ? 'bg-sikap-teal/10 text-sikap-teal' : 'bg-sikap-orange/10 text-sikap-orange'
                }`}>
                  {expense.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Expense Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title={t('addExpense')}
        subtitle="Fill in the details below"
      >
        <form className="space-y-5">
          <div className="space-y-4">
            <div className="relative">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Expense Name</label>
                <div className="relative">
                    <Type className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input type="text" placeholder="e.g. Office Supplies" className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Amount (₱)</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={16} />
                        <input type="number" placeholder="0.00" className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl pl-10 pr-2 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all" />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Category</label>
                    <select className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all appearance-none">
                        <option>OPEX</option>
                        <option>CAPEX</option>
                    </select>
                </div>
            </div>

            <div className="relative">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1 mb-1 block">Description</label>
                <div className="relative">
                    <AlignLeft className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <textarea placeholder="Enter description details..." rows={3} className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-sikap-teal focus:ring-1 focus:ring-sikap-teal transition-all"></textarea>
                </div>
            </div>
            
            {/* File Upload Section */}
            <div>
                <label className="block text-xs font-bold text-sikap-teal uppercase mb-2">{t('uploadReceipt')}</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-sikap-teal hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer relative group">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="bg-gray-100 dark:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <Upload className="text-gray-400 group-hover:text-sikap-teal" size={24} />
                    </div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Click to upload receipt</p>
                    <p className="text-[10px] text-gray-400 mt-1">PNG, JPG, PDF up to 5MB</p>
                </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">{t('cancel')}</button>
            <button type="submit" className="flex-1 bg-sikap-teal text-white font-bold py-3.5 rounded-xl hover:bg-sikap-teal-dark transition-colors shadow-lg shadow-sikap-teal/20">{t('add')}</button>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      <Modal 
        isOpen={!!selectedExpense} 
        onClose={() => setSelectedExpense(null)}
        title={t('expenseDetails')}
        subtitle="View transaction information and documents"
        maxWidth="max-w-4xl"
      >
         <div className="flex flex-col md:flex-row gap-8">
            {/* Info Section */}
            <div className="flex-1 space-y-6">
               <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">{t('expenseInfo')}</h4>
                  
                  <div className="space-y-4">
                      <div>
                          <label className="text-xs text-gray-400 block mb-1">Name</label>
                          <p className="text-lg font-bold text-gray-800 dark:text-white">{selectedExpense?.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">Amount</label>
                            <p className="text-xl font-extrabold text-sikap-teal">{selectedExpense && formatCurrency(selectedExpense.amount)}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">Date</label>
                            <p className="text-base font-medium text-gray-700 dark:text-gray-300">{selectedExpense?.date}</p>
                          </div>
                      </div>
                      <div>
                          <label className="text-xs text-gray-400 block mb-1">Category</label>
                          <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase ${selectedExpense?.category === 'OPEX' ? 'bg-sikap-orange text-white' : 'bg-sikap-teal text-white'}`}>
                              {selectedExpense?.category}
                          </span>
                      </div>
                      <div>
                          <label className="text-xs text-gray-400 block mb-1">Description</label>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{selectedExpense?.description}</p>
                      </div>
                  </div>
               </div>
            </div>

            {/* Receipt Section */}
            <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">{t('receiptDocument')}</h4>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex items-center justify-center min-h-[400px]">
                    {selectedExpense?.receiptImage ? (
                        <img 
                            src={selectedExpense.receiptImage} 
                            alt="Receipt" 
                            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="text-center text-gray-400 p-8">
                            <FileText size={48} className="mx-auto mb-2 opacity-30" />
                            <p>{t('noReceipt')}</p>
                        </div>
                    )}
                </div>
                {selectedExpense?.receiptImage && (
                    <a href={selectedExpense.receiptImage} target="_blank" rel="noreferrer" className="block mt-4 text-center text-sikap-teal font-bold text-sm hover:underline">
                        View Full Size
                    </a>
                )}
            </div>
         </div>
      </Modal>
    </div>
  );
};

export default Expenses;