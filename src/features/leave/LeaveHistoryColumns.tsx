import { ChangeEvent } from "react";
import { ColumnDefinition, Leave } from "../../Types";
import { ActionType, LeaveStatus, RoleType } from "../../Types/enumTypes";
import { convertFirstLetterToUpperCase, convertToUIStatus } from "../../utils/leaveUtils";

export const getLeaveColumns = (
    role: string,
    handleModifyLeave: (e: ChangeEvent<HTMLSelectElement>, leave: Leave) => void
): ColumnDefinition<Leave>[] => {
    const baseColumns: ColumnDefinition<Leave>[] = [
        ...(role === RoleType.HR
            ? [
                { header: "EmpId", accessor: "empId" },
                { header: "Employee Email", accessor: "email" },
            ]
            : []),
        { header: "Start Date", accessor: "startDate" },
        { header: "End Date", accessor: "endDate" },
        {
            header: "Type",
            render: (item) =>
                convertFirstLetterToUpperCase((item.leaveType))
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