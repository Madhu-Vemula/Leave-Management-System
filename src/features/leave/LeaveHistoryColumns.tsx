import { ChangeEvent } from "react";
import { ColumnDefinition, Leave } from "../../Types";
import { ActionType, LeaveStatus, RoleType } from "../../Types/enumTypes";
import { convertFirstLetterToUpperCase, convertToUIStatus } from "../../utils/leaveUtils";

/**
 * @function getLeaveColumns
 * @description Generates column configurations for a leave management table based on user role
 * 
 * @param {string} role - The user's role (HR, Manager, Employee) from RoleType enum
 * @param {(e: ChangeEvent<HTMLSelectElement>, leave: Leave) => void} handleModifyLeave - 
 *        Callback function to handle leave modification actions
 * 
 * @returns {ColumnDefinition<Leave>[]} Array of column configurations for the leave table
**/ 

export const getLeaveColumns = (
    role: string,
    handleModifyLeave: (e: ChangeEvent<HTMLSelectElement>, leave: Leave) => void
): ColumnDefinition<Leave>[] => {
    /**
     * @constant baseColumns
     * @type {ColumnDefinition<Leave>[]}
     * @description Base column configuration that varies based on user role
     * - HR users see employee ID and email columns
     * - All users see date, type, reason, days, status, and responder columns
     */
    const baseColumns: ColumnDefinition<Leave>[] = [
        // Conditionally include employee columns for HR users
        ...(role === RoleType.HR
            ? [
                { header: "EmpId", accessor: "empId" },
                { header: "Employee Email", accessor: "email" },
            ]
            : []),
        // Common columns for all roles
        { header: "Start Date", accessor: "startDate" },
        { header: "End Date", accessor: "endDate" },
        {
            header: "Type",
            render: (item) => convertFirstLetterToUpperCase(item.leaveType)
        },
        { header: "Reason", accessor: "reason" },
        { header: "Days", accessor: "dayDifference" },
        {
            header: "Status",
            render: (item) => (
                <span className={convertToUIStatus(item.status)}>
                    {convertFirstLetterToUpperCase(convertToUIStatus(item.status))}
                </span>
            ),
        },
        {
            header: "Responded By",
            render: (item) => item.respondedBy ?? "Still in progress",
        },
    ];

    /**
     * @description Add actions column for non-HR users (Employees and Managers)
     * - Only shows for pending leaves
     * - Provides modify and cancel options
     */
    if (role !== RoleType.HR) {
        baseColumns.push({
            header: "Actions",
            render: (item) => (
                <button
                    type="button"
                    title="actions"
                    className="button submit-btn action-btn"
                    disabled={item.status !== LeaveStatus.PENDING}
                >
                    <select
                        name="actions"
                        title="actions"
                        value=""
                        disabled={item.status !== LeaveStatus.PENDING}
                        onChange={(e) => handleModifyLeave(e, item)}
                    >
                        <option value="">Actions</option>
                        <option value={ActionType.MODIFY}>Modify</option>
                        <option value={ActionType.CANCEL}>Cancel</option>
                    </select>
                </button>
            ),
        });
    }

    return baseColumns;
};