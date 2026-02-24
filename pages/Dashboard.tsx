
import React, { useMemo } from 'react';
import { formatCurrency, MOCK_EXPENSES, MOCK_PROJECTS } from '../constants';
import { useConfig } from '../ConfigContext';
// Changed import from 'react-router-dom' to 'react-router' to fix export error
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, DollarSign, Activity, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t, language } = useConfig();

  // Dynamically calculate totals to ensure consistency with Expenses tab
  const financials = useMemo(() => {
    const totalExpenses = MOCK_EXPENSES.reduce((sum, exp) => sum + exp.amount, 0);
    const capexExpenses = MOCK_EXPENSES.filter(e => e.category === 'CAPEX').reduce((sum, exp) => sum + exp.amount, 0);
    const opexExpenses = MOCK_EXPENSES.filter(e => e.category === 'OPEX').reduce((sum, exp) => sum + exp.amount, 0);
    
    // Hardcoded Budget Limits (as per original design logic, but expenses are dynamic)
    const capexBudget = 500000;
    const opexBudget = 200000;
    const totalBudget = capexBudget + opexBudget;

    return {
      totalExpenses,
      remainingBudget: totalBudget - totalExpenses,
      capex: {
        used: capexExpenses,
        total: capexBudget,
        percent: (capexExpenses / capexBudget) * 100,
        remaining: capexBudget - capexExpenses
      },
      opex: {
        used: opexExpenses,
        total: opexBudget,
        percent: (opexExpenses / opexBudget) * 100,
        remaining: opexBudget - opexExpenses
      }
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-sikap-teal">{t('dashboard')}</h1>
        <p className="text-gray-600 dark:text-gray-400 font-medium text-lg mt-2">
          {t('budgetOverview')} - {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'fil-PH', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Budget Cards */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* CAPEX Card */}
            <div className="flex-1 bg-gradient-to-br from-white to-teal-50 dark:from-sikap-darkCard dark:to-gray-800 p-8 rounded-[2rem] shadow-md border border-sikap-teal/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                 <Wallet size={140} className="text-sikap-teal" />
               </div>
               
               <div className="relative z-10">
                 <h3 className="text-sikap-teal font-extrabold mb-4 tracking-wide flex items-center gap-2 text-xl">
                   <div className="w-3 h-3 rounded-full bg-sikap-teal"></div>
                   CAPEX
                 </h3>
                 <div className="text-5xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-tight">{formatCurrency(financials.capex.used)}</div>
                 <div className="text-base text-gray-500 dark:text-gray-400 font-medium mb-8">/ {formatCurrency(financials.capex.total)} Budget</div>
                 
                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
                   <div className="bg-sikap-teal h-4 rounded-full shadow-lg shadow-sikap-teal/30" style={{ width: `${financials.capex.percent}%` }}></div>
                 </div>
                 <div className="flex justify-between text-sm font-bold text-sikap-teal">
                   <span className="bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-lg">{financials.capex.percent.toFixed(1)}% {t('used')}</span>
                   <span className="text-gray-500 dark:text-gray-500 font-normal">{formatCurrency(financials.capex.remaining)} {t('remaining')}</span>
                 </div>
               </div>
            </div>

            {/* OPEX Card */}
            <div className="flex-1 bg-gradient-to-br from-white to-orange-50 dark:from-sikap-darkCard dark:to-gray-800 p-8 rounded-[2rem] shadow-md border border-sikap-orange/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                 <TrendingUp size={140} className="text-sikap-orange" />
               </div>

              <div className="relative z-10">
                <h3 className="text-sikap-orange font-extrabold mb-4 tracking-wide flex items-center gap-2 text-xl">
                  <div className="w-3 h-3 rounded-full bg-sikap-orange"></div>
                  OPEX
                </h3>
                <div className="text-5xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-tight">{formatCurrency(financials.opex.used)}</div>
                <div className="text-base text-gray-500 dark:text-gray-400 font-medium mb-8">/ {formatCurrency(financials.opex.total)} Budget</div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
                  <div className="bg-sikap-orange h-4 rounded-full shadow-lg shadow-sikap-orange/30" style={{ width: `${financials.opex.percent}%` }}></div>
                </div>
                <div className="flex justify-between text-sm font-bold text-sikap-orange">
                  <span className="bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-lg">{financials.opex.percent.toFixed(1)}% {t('used')}</span>
                  <span className="text-gray-500 dark:text-gray-500 font-normal">{formatCurrency(financials.opex.remaining)} {t('remaining')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="bg-white dark:bg-sikap-darkCard p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center border-b border-gray-100 dark:border-gray-700 pb-10 mb-10">
                <div className="relative pl-8 border-l-4 border-sikap-orange">
                  <p className="text-gray-400 dark:text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">{t('totalExpenses')}</p>
                  <div className="text-6xl font-extrabold text-gray-800 dark:text-white tracking-tight">{formatCurrency(financials.totalExpenses)}</div>
                </div>
                <div className="relative pl-8 border-l-4 border-sikap-teal">
                  <p className="text-gray-400 dark:text-gray-400 font-bold text-sm uppercase tracking-wider mb-2">{t('remaining')} Budget</p>
                  <div className="text-6xl font-extrabold text-sikap-teal tracking-tight">{formatCurrency(financials.remainingBudget)}</div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-6 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 transition-colors">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-sm text-sikap-orange">
                    <FileText size={32} />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white">{MOCK_PROJECTS.length}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">PROJECTS</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 transition-colors">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-sm text-sikap-teal">
                    <DollarSign size={32} />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white">{MOCK_EXPENSES.length}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">TRANSACTIONS</p>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column - Recent Expenses */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-sikap-darkCard p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 h-full transition-colors flex flex-col">
            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-8 flex items-center justify-between">
              <span>{t('recentExpenses')}</span>
              <Activity size={24} className="text-gray-300" />
            </h3>
            <div className="space-y-8 flex-1">
              {MOCK_EXPENSES.slice(0, 5).map(expense => (
                <div key={expense.id} className="flex justify-between items-center group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-12 rounded-full transition-all group-hover:h-14 ${expense.category === 'OPEX' ? 'bg-sikap-orange' : 'bg-sikap-teal'}`}></div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 text-base group-hover:text-sikap-teal transition-colors">{expense.name}</h4>
                      <p className="text-sm text-gray-400 mt-1">{expense.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-lg text-gray-800 dark:text-white">{formatCurrency(expense.amount)}</div>
                    <span className={`text-xs font-bold uppercase ${expense.category === 'CAPEX' ? 'text-sikap-teal' : 'text-sikap-orange'}`}>
                      {expense.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/expenses" className="mt-8 w-full py-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-center text-sm font-bold text-gray-500 hover:text-sikap-teal hover:bg-gray-100 dark:hover:bg-gray-700 transition-all uppercase tracking-wider">
              {t('viewAll')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
