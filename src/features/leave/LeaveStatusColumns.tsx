import { type ChangeEvent } from "react";
import type { ColumnDefinition, Leave } from "../../Types";
import { ActionType, LeaveStatus } from "../../Types/enumTypes";
import { convertFirstLetterToUpperCase, convertToUIStatus } from "../../utils/leaveUtils";

/**
 * @function getLeaveStatusColumns
 * @description Generates column definitions for a leave status table with action handlers
 * 
 * @param {(e: ChangeEvent<HTMLSelectElement>, leave: Leave) => void} handleActionsTypes - 
 * Callback function to handle action selection changes
 * 
 * @returns {ColumnDefinition<Leave>[]} Array of column definitions for the leave status table
 * 
 * @example
 * const columns = getLeaveStatusColumns((e, leave) => {
 *   console.log(`Action ${e.target.value} selected for leave ${leave.id}`);
 * });
 */
export const getLeaveStatusColumns = (
    handleActionsTypes: (e: ChangeEvent<HTMLSelectElement>, leave: Leave) => void
): ColumnDefinition<Leave>[] => {
    /**
     * @constant baseColumns
     * @type {ColumnDefinition<Leave>[]}
     * @description Base column configuration for leave status table
     */
    const baseColumns: ColumnDefinition<Leave>[] = [
        {
            header: "Employee Id",
            accessor: "empId"
        },
        {
            header: "Employee Email",
            accessor: "email"
        },
        {
            header: "Leave Type",
            render: (item) => convertFirstLetterToUpperCase(item.leaveType)
        },
        {
            header: "Date",
            render: (row) => `${row.startDate} to ${row.endDate}`
        },
        {
            header: "Reason",
            accessor: "reason"
        },
        {
            header: "Status",
            render: (row) => (
                <span className={convertToUIStatus(row.status)}>
                    {convertFirstLetterToUpperCase(convertToUIStatus(row.status))}
                </span>
            )
        },
        {
            header: "Take Action",
            render: (row) => (
                <button
                    title="actions"
                    type="button"
                    className="button submit-btn action-btn"
                    disabled={row.status !== LeaveStatus.PENDING}
                >
                    <select
                        name="actions"
                        title="actions"
                        disabled={row.status !== LeaveStatus.PENDING}
                        value=''
                        onChange={(e) => handleActionsTypes(e, row)}
                    >
                        <option value="">Actions</option>
                        <option value={ActionType.APPROVE}>Approve</option>
                        <option value={ActionType.REJECT}>Reject</option>
                    </select>
                </button>
            )
        },
    ];

    return baseColumns;
};