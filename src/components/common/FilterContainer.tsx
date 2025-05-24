import React, { ChangeEvent } from "react";
import { LeaveStatus, LeaveType } from "../../Types/enumTypes";
/**
 * @description
 * Renders the filter container for leave type and status.
 *
 * Allows users to filter leave requests by type (paid/unpaid) and status (pending, accepted, etc.).
 * @component FilterContainter
 * @returns {React.JSX.Element} The filter container component.
 */

interface FilterContainerProps {
    onLeaveStatusFilterChange: (leaveStatus: string) => void,
    onLeaveTypeFilterChange: (leaveType: string) => void
}
const FilterContainer: React.FC<FilterContainerProps> = (props): React.JSX.Element => {
    const { onLeaveStatusFilterChange, onLeaveTypeFilterChange } = props

    /**
     * Handles changes to the leave type filter.
     *
     * Dispatches the selected leave type to the Redux store.
     *
     * @param {ChangeEvent<HTMLSelectElement>} event - The change event from the select input.
     * @returns {void}
     */
    const handleRequestType = (event: ChangeEvent<HTMLSelectElement>): void => {
        const requestValue = event.target.value;
        onLeaveTypeFilterChange(requestValue)
    };

    /**
     * Handles changes to the leave status filter.
     *
     * Dispatches the selected leave status to the Redux store.
     *
     * @param {ChangeEvent<HTMLSelectElement>} event - The change event from the select input.
     * @returns {void}
     */
    const handleStatusType = (event: ChangeEvent<HTMLSelectElement>): void => {
        const statusValue = event.target.value;
        onLeaveStatusFilterChange(statusValue)
    };

    return (
        <div className="filter-container">
            <div>
                <label htmlFor="request-type">Request Type</label>
                <select id="request-type" onChange={(e) => handleRequestType(e)}>
                    <option value={LeaveType.ALL}>All</option>
                    <option value={LeaveType.UNPAID}>Unpaid Leave</option>
                    <option value={LeaveType.PAID}>Paid Leave</option>
                </select>
            </div>
            <div>
                <label htmlFor="request-status">Request Status</label>
                <select id="request-status" onChange={(e) => handleStatusType(e)}>
                    <option value={LeaveStatus.ALL}>All</option>
                    <option value={LeaveStatus.PENDING}>Pending</option>
                    <option value={LeaveStatus.APPROVED}>Approved</option>
                    <option value={LeaveStatus.REJECTED}>Rejected</option>
                    <option value={LeaveStatus.CANCELLED}>Cancelled</option>
                </select>
            </div>
        </div>
    );
};

export default FilterContainer;
