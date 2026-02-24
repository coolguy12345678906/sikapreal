import { Project, Expense, ExpenseCategory, Course, CalendarEvent, CommunityUpdate } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Barangay Hall Renovation',
    description: 'Complete renovation of the main barangay hall building including electrical and plumbing upgrade.',
    budgetUsed: 120000,
    totalBudget: 250000,
    status: 'In Progress',
    startDate: '2026-02-10'
  },
  {
    id: '2',
    name: 'Street Lighting Project',
    description: 'Installation of LED street lights on main roads.',
    budgetUsed: 45000,
    totalBudget: 180000,
    status: 'In Progress',
    startDate: '2026-02-15'
  },
  {
    id: '3',
    name: 'Health Center Equipment',
    description: 'Purchase of medical equipment for barangay health center',
    budgetUsed: 150000,
    totalBudget: 150000,
    status: 'Completed',
    startDate: '2025-01-10'
  }
];

export const MOCK_EXPENSES: Expense[] = [
  {
    id: '1',
    name: 'Office Supplies',
    description: 'Papers, pens, and other materials.',
    amount: 15000,
    date: '2026-02-20',
    category: ExpenseCategory.OPEX,
    projectId: '1',
    receiptImage: 'https://placehold.co/400x600/e2e8f0/475569?text=Receipt+001'
  },
  {
    id: '2',
    name: 'Computer Equipment',
    description: 'New laptops and monitors for staff.',
    amount: 85000,
    date: '2026-02-19',
    category: ExpenseCategory.CAPEX,
    projectId: '2',
    receiptImage: 'https://placehold.co/400x500/e2e8f0/475569?text=Tech+Invoice'
  },
  {
    id: '3',
    name: 'Utilities',
    description: 'Electricity and water bills.',
    amount: 12000,
    date: '2026-02-18',
    category: ExpenseCategory.OPEX,
    projectId: '1',
    receiptImage: 'https://placehold.co/300x500/e2e8f0/475569?text=Meralco+Bill'
  },
  {
    id: '4',
    name: 'Building Renovation',
    description: 'Materials for hall renovation.',
    amount: 120000,
    date: '2026-02-17',
    category: ExpenseCategory.CAPEX,
    projectId: '1',
    receiptImage: 'https://placehold.co/500x700/e2e8f0/475569?text=Construction+Receipt'
  },
  {
    id: '5',
    name: 'Vehicle Maintenance',
    description: 'Repair and oil change for patrol car.',
    amount: 8000,
    date: '2026-02-16',
    category: ExpenseCategory.OPEX,
    receiptImage: 'https://placehold.co/400x400/e2e8f0/475569?text=Auto+Shop+Receipt'
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Budget Planning Basics',
    description: 'Budget Planning Fundamentals for Barangay Leaders',
    level: 'Beginner',
    durationHours: 3,
    enrolled: 45,
    lessons: [
      { id: '1-1', title: 'Introduction to Budgeting', duration: '15:00', isCompleted: true },
      { id: '1-2', title: 'Identifying Income Sources', duration: '25:00', isCompleted: true },
      { id: '1-3', title: 'Allocating Funds Effectively', duration: '45:00', isCompleted: false },
    ]
  },
  {
    id: '2',
    title: 'CAPEX vs OPEX Management',
    description: 'Advanced CAPEX vs OPEX Management for Barangay Officials',
    level: 'Intermediate',
    durationHours: 4,
    enrolled: 32,
    lessons: [
      { id: '2-1', title: 'Defining CAPEX and OPEX', duration: '20:00', isCompleted: false },
      { id: '2-2', title: 'Long-term vs Short-term', duration: '30:00', isCompleted: false },
    ]
  },
  {
    id: '3',
    title: 'Project Financial Tracking',
    description: 'Advanced Project Financial Tracking and Monitoring',
    level: 'Advanced',
    durationHours: 5,
    enrolled: 28,
    lessons: [
      { id: '3-1', title: 'Tracking Tools', duration: '40:00', isCompleted: false },
      { id: '3-2', title: 'Audit Preparation', duration: '55:00', isCompleted: false },
    ]
  },
  {
    id: '4',
    title: 'Community Financial Transparency',
    description: 'Building Trust Through Financial Transparency',
    level: 'Intermediate',
    durationHours: 4.5,
    enrolled: 51,
    lessons: [
      { id: '4-1', title: 'Public Reporting', duration: '35:00', isCompleted: false },
      { id: '4-2', title: 'Engaging the Community', duration: '25:00', isCompleted: false },
    ]
  }
];

export const MOCK_SHARED_PROJECTS: Project[] = [
  {
    id: 's1',
    name: 'Barangay Hall Renovation',
    description: 'Complete renovation of the main barangay hall building including electrical and plumbing upgrades to ensure safety and modernize the facility for better public service.',
    budgetUsed: 120000,
    totalBudget: 250000,
    status: 'In Progress',
    startDate: '1/10/2024',
    sharedBy: 'Juan Dela Cruz'
  },
  {
    id: 's2',
    name: 'Youth Development Program',
    description: 'Annual program for skills training and development of barangay youth, focusing on computer literacy, sportsmanship, and leadership workshops.',
    budgetUsed: 80000,
    totalBudget: 200000,
    status: 'Planned',
    startDate: '1/8/2024',
    sharedBy: 'Maria Santos'
  },
  {
    id: 's3',
    name: 'Street Improvement Project',
    description: 'Road repairs and installation of proper drainage system along Mabini Street to prevent flooding during the rainy season.',
    budgetUsed: 150000,
    totalBudget: 180000,
    status: 'Completed',
    startDate: '1/2/2024',
    sharedBy: 'Pedro Garcia'
  }
];

export const MOCK_UPDATES: CommunityUpdate[] = [
  {
    id: 'u1',
    user: 'Juan Dela Cruz',
    action: 'shared',
    target: 'Barangay Hall Renovation project',
    date: '1/10/2024'
  },
  {
    id: 'u2',
    user: 'Maria Santos',
    action: 'added new expense to',
    target: 'Youth Development Program',
    date: '1/8/2024'
  },
  {
    id: 'u3',
    user: 'Pedro Garcia',
    action: 'completed',
    target: 'Street Improvement Project',
    date: '1/2/2024'
  }
];

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: 'e1',
    date: '2026-03-03',
    title: 'Barangay Meeting',
    description: 'Monthly meeting with barangay councilors regarding budget allocation.',
    type: 'meeting'
  },
  {
    id: 'e2',
    date: '2026-03-05',
    title: 'Budget Review',
    description: 'Review of Q4 Expenses',
    type: 'deadline'
  }
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};