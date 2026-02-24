import React, { useState } from 'react';
import { Download, TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useConfig } from '../ConfigContext';
import { exportToCSV } from '../utils/csvExport';
import { formatCurrency } from '../constants';

const Reports: React.FC = () => {
  const { t } = useConfig();
  const [timeRange, setTimeRange] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');
  
  const projectedSavings = -540000;
  const isNegative = projectedSavings < 0;
  
  // Mock data changing based on filter
  const barData = timeRange === 'Monthly' 
    ? [
        { name: 'Jan', value: 3000 }, { name: 'Feb', value: 4500 }, { name: 'Mar', value: 2500 },
        { name: 'Apr', value: 5500 }, { name: 'May', value: 4000 }, { name: 'Jun', value: 5000 }
      ]
    : timeRange === 'Quarterly'
    ? [
        { name: 'Q1', value: 10000 }, { name: 'Q2', value: 14500 }, { name: 'Q3', value: 12000 }, { name: 'Q4', value: 16000 }
      ]
    : [
        { name: '2023', value: 45000 }, { name: '2024', value: 52000 }, { name: '2025', value: 68000 }
      ];

  const pieData = [
    { name: 'Infrastructure', value: 40000 },
    { name: 'Health', value: 30000 },
    { name: 'Education', value: 20000 },
    { name: 'Admin', value: 10000 },
  ];

  const COLORS = ['#40C0C8', '#F5A050', '#2E9CA3', '#D68538'];

  const handleExport = () => {
    exportToCSV(barData, `sikap-reports-${timeRange.toLowerCase()}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-sikap-teal">{t('reports')} & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Financial insights and data visualization</p>
        </div>
        <div className="flex gap-2">
            <div className="bg-white dark:bg-sikap-darkCard p-1 rounded-lg border border-gray-200 dark:border-gray-700 flex">
                {['Monthly', 'Quarterly', 'Yearly'].map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range as any)}
                        className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${timeRange === range ? 'bg-sikap-teal text-white shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400'}`}
                    >
                        {range}
                    </button>
                ))}
            </div>
            <button 
            onClick={handleExport}
            className="bg-gray-800 dark:bg-gray-700 text-white px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors shadow-lg shadow-gray-400/20"
            >
            <Download size={16} />
            Export
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: 'TOTAL CONSUMED', value: '₱466,000', sub: '77.7% of budget', color: 'text-sikap-teal', icon: TrendingUp },
            { label: 'BUDGET REMAINING', value: '₱134,000', sub: '22.3% remaining', color: 'text-sikap-orange', icon: Calendar },
            { label: 'AVG MONTHLY', value: '₱95,000', sub: '+12% vs last year', color: 'text-gray-800 dark:text-white', icon: Filter },
            { label: 'PROJECT SUCCESS', value: '54.5%', sub: '12 of 22 completed', color: 'text-green-500', icon: TrendingUp }
        ].map((kpi, idx) => (
            <div key={idx} className="bg-white dark:bg-sikap-darkCard p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{kpi.label}</p>
                    <kpi.icon size={16} className="text-gray-300" />
                </div>
                <h3 className={`text-2xl font-extrabold ${kpi.color}`}>{kpi.value}</h3>
                <p className="text-xs text-gray-400 mt-2 font-medium bg-gray-50 dark:bg-gray-800 inline-block px-2 py-1 rounded">{kpi.sub}</p>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-sikap-darkCard p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
          <div className="flex justify-between items-center mb-8">
             <div>
                <h3 className="font-bold text-xl text-gray-800 dark:text-white">Expense Trends</h3>
                <p className="text-xs text-gray-400 mt-1">{timeRange} overview of spending</p>
             </div>
             <div className="flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-sikap-teal"></span>
               <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Expenses</span>
             </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barSize={40}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 600 }} dy={10} />
                <Tooltip 
                    cursor={{fill: '#f3f4f6', opacity: 0.4}} 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }} 
                />
                <Bar dataKey="value" fill="#40C0C8" radius={[6, 6, 6, 6]} animationDuration={1000} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Pie Chart */}
        <div className="bg-white dark:bg-sikap-darkCard p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm transition-colors flex flex-col">
           <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-6">Allocation by Sector</h3>
           <div className="flex-1 min-h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                  <div className="text-center">
                      <p className="text-xs text-gray-400 uppercase font-bold">Total</p>
                      <p className="text-xl font-extrabold text-gray-800 dark:text-white">100%</p>
                  </div>
              </div>
           </div>
        </div>
      </div>
      
       {/* Comparison and Projected */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* CAPEX vs OPEX */}
           <div className="bg-white dark:bg-sikap-darkCard p-8 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
              <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-6">CAPEX vs OPEX Ratio</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-sikap-teal flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-sikap-teal"></div> CAPEX</span>
                    <span className="dark:text-gray-300">79.0%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div className="bg-sikap-teal h-3 rounded-full relative" style={{ width: '79%' }}>
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 font-medium">₱368,000 of total expenses</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-sikap-orange flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-sikap-orange"></div> OPEX</span>
                    <span className="dark:text-gray-300">21.0%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div className="bg-sikap-orange h-3 rounded-full relative" style={{ width: '21%' }}>
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 font-medium">₱98,000 of total expenses</p>
                </div>
              </div>
           </div>

           {/* Projected Savings */}
           <div className={`bg-gradient-to-br ${isNegative ? 'from-red-500 to-red-600' : 'from-blue-500 to-blue-600'} p-8 rounded-[2rem] shadow-lg text-white flex flex-col justify-between relative overflow-hidden`}>
              <div className="absolute -right-10 -top-10 bg-white/10 w-40 h-40 rounded-full blur-2xl"></div>
              
              <div>
                <h3 className="font-bold text-xl mb-1">Projected Savings</h3>
                <p className="text-white/80 text-sm">Expected year-end financial standing</p>
              </div>
              
              <div className="py-8">
                  <div className="text-5xl font-extrabold tracking-tight">{formatCurrency(projectedSavings)}</div>
                  <div className="flex items-center gap-2 mt-2 bg-white/20 inline-flex px-3 py-1 rounded-lg backdrop-blur-sm">
                    {isNegative ? <TrendingDown size={16} className="text-white" /> : <TrendingUp size={16} className="text-white" />}
                    <span className="text-xs font-bold">{isNegative ? '12% Deficit Expected' : '8% Surplus Expected'}</span>
                  </div>
              </div>

              <div className="text-xs text-white/70 leading-relaxed max-w-sm">
                  {isNegative 
                    ? "Based on current spending habits, the project is exceeding budget allocations. Immediate review of OPEX is recommended."
                    : "Excellent financial management! Current spending is well within budget limits, projecting a healthy surplus by year-end."}
              </div>
           </div>
        </div>
    </div>
  );
};

export default Reports;