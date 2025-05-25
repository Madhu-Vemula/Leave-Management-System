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
    /**all leaves */
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
    REJECT = 'reject',
    CANCEL = 'cancel',
    APPROVE = "approve"
}

export enum LeaveBalance {
    BALANCE = 20
}

export enum ToastContent {
    LEAVESUCCESS = "Leave Submitted Successfully",
    LEAVECANCEL = "Leave Cancelled Successfully",
    EMPLOYEESUCCESS = "Employee Added Successfully",
    EMPLOYEEUPDATED = "Employee Updated Successfully ",
    EMPLOYEEDELETED = "Employee Deleted Successfully",
    LEAVEAPPROVED = "Leave Approved Successfully",
    LEAVEREJECTED = "Leave Rejected Successfully"
}

export enum ToastType {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info",
    WARNING = "warning"

}
