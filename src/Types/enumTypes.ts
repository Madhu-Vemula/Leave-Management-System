/**
 * Enum representing possible statuses for a leave request.
 */
export enum LeaveStatus {
    /** All leave statuses. */
    ALL = 'all',
    /** Cancelled leave request. */
    CANCELLED = "cancelled",
    /** Approved leave request. */
    APPROVED = "approve",
    /** Rejected leave request. */
    REJECTED = "reject",
    /** Pending leave request. */
    PENDING = "pending"
}

/**
 * Enum representing types of leaves.
 */
export enum LeaveType {
    /** All leaves. */
    ALL = 'all',
    /** Paid leave. */
    PAID = "paid",
    /** Unpaid leave. */
    UNPAID = "unpaid"
}

/**
 * Enum representing different user roles in the system.
 */
export enum RoleType {
    /** Manager role. */
    MANAGER = 'manager',
    /** Employee role. */
    EMPLOYEE = "employee",
    /** HR role. */
    HR = "hr"
}

/**
 * Enum containing default HR login details.
 */
export enum HrDetails {
    /** HR email address. */
    MAIL = "hr@pal.tech",
    /** HR password. */
    PASSWORD = "hr@pal"
}

/**
 * Enum for domain-related configuration.
 */
export enum DomainDetails {
    /** Required email domain for user validation. */
    DOMAIN = "@pal.tech"
}

/**
 * Enum for types of actions that can be performed.
 */
export enum ActionType {
    /** Modify action type. */
    MODIFY = 'modify',
    /** Reject action type. */
    REJECT = 'reject',
    /** Cancel action type. */
    CANCEL = 'cancel',
    /** Approve action type. */
    APPROVE = "approve"
}

/**
 * Enum representing leave balance configuration.
 */
export enum LeaveBalance {
    /** Default leave balance. */
    BALANCE = 20
}

/**
 * Enum containing toast notification messages.
 */
export enum ToastContent {
    /** Success message for leave submission. */
    LEAVESUCCESS = "Leave Submitted Successfully",
    /** Success message for leave cancellation. */
    LEAVECANCEL = "Leave Cancelled Successfully",
    /** Success message for employee addition. */
    EMPLOYEESUCCESS = "Employee Added Successfully",
    /** Success message for employee update. */
    EMPLOYEEUPDATED = "Employee Updated Successfully ",
    /** Success message for employee deletion. */
    EMPLOYEEDELETED = "Employee Deleted Successfully",
    /** Success message for leave approval. */
    LEAVEAPPROVED = "Leave Approved Successfully",
    /** Success message for leave rejection. */
    LEAVEREJECTED = "Leave Rejected Successfully"
}

/**
 * Enum representing types of toast notifications.
 */
export enum ToastType {
    /** Success toast type. */
    SUCCESS = "success",
    /** Error toast type. */
    ERROR = "error",
    /** Info toast type. */
    INFO = "info",
    /** Warning toast type. */
    WARNING = "warning"
}