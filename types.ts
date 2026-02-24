export enum ExpenseCategory {
  OPEX = 'OPEX',
  CAPEX = 'CAPEX'
}

export interface Expense {
  id: string;
  name: string;
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  projectId?: string; // Links expense to a project
  receiptImage?: string; // URL or placeholder for the receipt image
}

export interface Project {
  id: string;
  name: string;
  description: string;
  budgetUsed: number;
  totalBudget: number;
  status: 'In Progress' | 'Completed' | 'Planned';
  startDate: string;
  endDate?: string;
  sharedBy?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  enrolled: number;
  lessons: Lesson[];
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  type: 'meeting' | 'deadline' | 'holiday';
}

export interface CommunityUpdate {
  id: string;
  user: string;
  action: string;
  target: string;
  date: string;
}

export type Language = 'en' | 'fil';