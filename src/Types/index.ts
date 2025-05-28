import { ToastType } from "./enumTypes";

/**
 * @interface LoginForm
 * @description Form fields used for user login.
 * @property {string} email - User's email address
 * @property {string} password - User's password
 */
export interface LoginForm {
  email: string;
  password: string;
}

/**
 * @interface ProtectedRouteProps
 * @description Props for protecting routes based on user roles.
 * @property {React.ReactNode} children - Child components to render
 * @property {string} role - Required role to access the route
 */
export interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

/**
 * @interface Leave
 * @description Represents a leave application submitted by an employee.
 * @property {string} [id] - Optional unique identifier
 * @property {string} empId - Employee ID
 * @property {string} email - Employee email
 * @property {string} startDate - Leave start date
 * @property {string} endDate - Leave end date
 * @property {string} leaveType - Type of leave (paid/unpaid)
 * @property {string} reason - Reason for leave
 * @property {number} dayDifference - Number of leave days
 * @property {string} status - Current status of leave
 * @property {string} [respondedBy] - Optional identifier of who responded
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
 * @interface Employee
 * @description Represents an employee record in the system.
 * @property {string} [id] - Optional unique identifier
 * @property {string} empId - Employee ID
 * @property {string} name - Employee name
 * @property {string} email - Employee email
 * @property {string} role - Employee role
 * @property {string} managerEmail - Manager's email
 * @property {string} password - Employee password
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
 * @interface User
 * @description Represents a user session or login credentials.
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {string} [role] - Optional user role
 */
export interface User {
  email: string;
  password: string;
  role?: string;
}

/**
 * @interface LeaveStatusProps
 * @description Props for leave status component.
 * @property {Leave} leave - Leave object to display status for
 */
export interface LeaveStatusProps {
  leave: Leave;
}

/**
 * @interface LeaveTypes
 * @description Number of paid and unpaid leaves for a user.
 * @property {number} paidLeaves - Count of paid leaves
 * @property {number} unPaidLeaves - Count of unpaid leaves
 */
export interface LeaveTypes {
  paidLeaves: number;
  unPaidLeaves: number;
}

/**
 * @interface ProfileProps
 * @description Props for rendering employee profile.
 * @property {Employee} employeeData - Employee data to display
 */
export interface ProfileProps {
  employeeData: Employee;
}

/**
 * @interface LeaveBalanceCardProps
 * @description Props for rendering leave balance card.
 * @property {Leave[]} leaveData - Array of leave records
 */
export interface LeaveBalanceCardProps {
  leaveData: Leave[];
}

/**
 * @interface FilterContainerProps
 * @description Props for leave filter container component.
 * @property {(leaveStatus: string) => void} onLeaveStatusFilterChange - Handler for status filter change
 * @property {(leaveType: string) => void} onLeaveTypeFilterChange - Handler for type filter change
 */
export interface FilterContainerProps {
  onLeaveStatusFilterChange: (leaveStatus: string) => void;
  onLeaveTypeFilterChange: (leaveType: string) => void;
}

/**
 * @interface PopupProps
 * @description Props for popup/modal component.
 * @property {string} title - Popup title
 * @property {string} logoSrc - Path to logo image
 * @property {boolean} show - Whether to show the popup
 * @property {() => void} onClose - Close handler
 * @property {React.ReactNode} children - Popup content
 */
export interface PopupProps {
  title: string;
  logoSrc: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * @type ColumnDefinition
 * @description Configuration for table columns.
 * @template T - Type of data in the table
 * @property {string} header - Column header text
 * @property {keyof T | string} [accessor] - Property accessor for data
 * @property {(row: T) => React.ReactNode} [render] - Custom render function
 */
export type ColumnDefinition<T> = {
  header: string;
  accessor?: keyof T | string;
  render?: (row: T) => React.ReactNode;
};

/**
 * @interface CustomTableProps
 * @description Props for custom table component.
 * @template T - Type of data in the table
 * @property {T[]} data - Array of data items
 * @property {ColumnDefinition<T>[]} columns - Column configurations
 * @property {string} [emptyMessage] - Message to display when no data
 */
export interface CustomTableProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  emptyMessage?: string;
}

/**
 * @interface CustomToastProps
 * @description Props for toast notification component.
 * @property {string} message - Notification message
 * @property {ToastType} type - Type of toast (success/error/etc.)
 * @property {number} [duration] - Optional duration in milliseconds
 */
export interface CustomToastProps {
  message: string;
  type: ToastType;
  duration?: number;
}

/**
 * @interface ToastMessage
 * @description Represents a toast message with metadata.
 * @property {string} toastKey - Unique identifier
 * @property {string} message - Notification message
 * @property {ToastType} type - Type of toast
 */
export interface ToastMessage {
  toastKey: string;
  message: string;
  type: ToastType;
}

/**
 * @interface DonutDataItem
 * @description Data item for donut chart.
 * @property {string} name - Name/label of the segment
 * @property {number} value - Numeric value
 * @property {string} [color] - Optional color override
 */
export interface DonutDataItem {
  name: string;
  value: number;
  color?: string;
}

/**
 * @interface DonutChartProps
 * @description Props for donut chart component.
 * @property {DonutDataItem[]} data - Chart data
 * @property {number} [width] - Optional chart width
 * @property {number} [height] - Optional chart height
 * @property {number} [outerRadius] - Optional outer radius
 * @property {number} [innerRadius] - Optional inner radius
 */
export interface DonutChartProps {
  data: DonutDataItem[];
  width?: number;
  height?: number;
  outerRadius?: number;
  innerRadius?: number;
}

/**
 * @interface EmployeeFormProps
 * @description Props for employee form component.
 * @property {Employee | null} initialEmployeeData - Initial form data
 * @property {() => void} onClose - Close handler
 * @property {() => void} onSubmit - Submit handler
 */
export interface EmployeeFormProps {
  initialEmployeeData: Employee | null;
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * @interface ManagerDropDownProps
 * @description Props for manager dropdown component.
 * @property {Employee[]} managerData - List of managers
 * @property {(email: string) => void} onSelect - Selection handler
 * @property {string} initialManagerMail - Initially selected manager email
 */
export interface ManagerDropDownProps {
  managerData: Employee[];
  onSelect: (email: string) => void;
  initialManagerMail: string;
}

/**
 * @interface CancelLeaveProps
 * @description Props for cancel leave component.
 * @property {Leave | null} cancelledLeaveItem - Leave to cancel
 * @property {() => void} onClose - Close handler
 * @property {() => void} onSubmit - Submit handler
 */
export interface CancelLeaveProps {
  cancelledLeaveItem: Leave | null;
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * @interface LeaveFormProps
 * @description Props for leave form component.
 * @property {Employee} employeeData - Employee data
 * @property {Leave | null} initialLeaveData - Initial leave data
 * @property {() => void} onClose - Close handler
 * @property {() => void} onSubmit - Submit handler
 */
export interface LeaveFormProps {
  employeeData: Employee;
  initialLeaveData: Leave | null;
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * @interface ModalProps
 * @description Props for a modal dialog component.
 * 
 * @property {string} title - The title displayed in the modal header
 * @property {string} [logoSrc] - Optional path to a logo image to display in the header
 * @property {() => void} onClose - Callback function invoked when the modal is closed
 * @property {() => any} [onSubmit] - Optional callback function invoked when the submit button is clicked
 * @property {React.ReactNode} children - The content to be rendered inside the modal body
 * @property {boolean} [showFooter] - Optional flag to control visibility of the footer (default: true)
 * @property {string} [submitText] - Optional custom text for the submit button (default: "Submit")
 * @property {string} [cancelText] - Optional custom text for the cancel button (default: "Cancel")
 */
export interface ModalProps {
  title: string,
  logoSrc?: string,
  onClose: () => void,
  onSubmit?: () => any,
  children: React.ReactNode,
  showFooter?: boolean,
  submitText?: string,
  cancelText?: string
}
 
/**
 * @interface CardSectionProps
 * @description Props for a CardSection component that typically contains a title and content area.
 * Commonly used for grouping related content with a visible header.
 * 
 * @property {string} title - The title text displayed at the top of the CardSection
 * @property {React.ReactNode} children - The content to be rendered inside the CardSection body
 */
export interface CardSectionProps {
  title: string;
  children: React.ReactNode;
}

/**
* @interface DashboardBlockProps
* @description Props for a dashboard block component that displays a titled content section.
* Similar to CardSectionProps but typically used specifically in dashboard layouts.
* 
* @property {string} title - The heading text for this dashboard block
* @property {React.ReactNode} children - The content to render within the dashboard block
*/
export interface DashboardBlockProps {
  title: string;
  children: React.ReactNode;
}