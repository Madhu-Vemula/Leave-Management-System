/**
 * @description Form fields used for user login.
 */
export interface LoginForm {
  email: string;
  password: string;
}

/**
 * @description Props for protecting routes based on user roles.
 */
export interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

/**
 * @description Represents a leave application submitted by an employee.
 */
export interface Leave {
  id?: string;
  empId: string;
  email: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  dayDifference: number;
  status: string;
  respondedBy?: string;
}

/**
 * @description Represents an employee record in the system.
 */
export interface Employee {
  id?: string;
  empId: string;
  name: string;
  email: string;
  role: string;
  managerEmail: string;
  password: string;
}

/**
 * @description Represents a user session or login credentials.
 */
export interface User {
  email: string;
  password: string;
  role?: string;
}

/**
 * @description Props for leave status component.
 */
export interface LeaveStatusProps {
  leave: Leave;
}

/**
 * @description Number of paid and unpaid leaves for a user.
 */
export interface LeaveTypes {
  paidLeaves: number;
  unPaidLeaves: number;
}

/**
 * @description Props for rendering a donut chart visualization of leave types.
 */
export interface DonutChartProps {
  leaveTypes: LeaveTypes;
}

/**
 * @description Props for rendering employee profile.
 */
export interface ProfileProps {
  employeeData: Employee;
}


/**
 * @description Props for rendering leave balance card.
 */
export interface LeaveBalanceCardProps {
  leaveData: Leave[];
}

export interface PopupProps {
  title: string;
  logoSrc: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export type ColumnDefinition<T> = {
  header: string,
  accessor?: keyof T | string,
  render?: (row: T) => React.ReactNode
}

export interface CustomTableProps<T> {
  data: T[],
  columns: ColumnDefinition<T>[],
  emptyMessage?: string
}


