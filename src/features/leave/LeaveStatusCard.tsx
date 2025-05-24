import { ChangeEvent, useEffect, useState } from "react";
import { Leave } from "../../Types";
import { LeaveType, LeaveStatus } from "../../Types/enumTypes";
import { getUserFromSession } from "../../utils/roleUtils";
import { convertFirstLetterToUpperCase } from "../../utils/leaveUtils";
import FilterContainer from "../../components/common/FilterContainer";
import Navbar from "../../components/common/Navbar";
import { CustomTable } from "../../components/common/CustomTable";
import Modal from "../../components/common/CustomModal";
import { useUpdateLeaveByIdMutation, useGetLeaveByManagerQuery } from "../../services/leaveService";
import { useGetEmployeesByManagerQuery } from "../../services/employeeService";
import { getUserMailFromSession } from "../../utils/roleUtils";
import { ErrorMessages } from "../../utils/errorUtils";
import { getLeaveStatusColumns } from "./LeaveStatusColumns";

/**
 * @component LeaveStatus
 * @description Renders a table displaying leave requests for employees under a manager.
 * @returns {React.JSX.Element}
 */
const LeaveStatusCard: React.FC = (): React.JSX.Element => {
    const user = getUserFromSession();
    const authRole = user?.role?.toLowerCase();
    const { data } = useGetEmployeesByManagerQuery(user.email);
    const employeeEmails = data?.map((employee) => employee.email);
    const { data: employeeLeaves = [] } = useGetLeaveByManagerQuery(employeeEmails ?? [])
    const [filterEmployeeLeaves, setFilterEmployeeLeaves] = useState<Leave[]>([]);
    const [leaveTypeFilter, setLeaveTypeFilter] = useState<string>(LeaveType.ALL)
    const [leaveStatusFilter, setLeaveStatusFilter] = useState<string>(LeaveStatus.ALL)

    useEffect(() => {
        let result = [...employeeLeaves].reverse();
        if (leaveTypeFilter !== LeaveStatus.ALL) {
            result = result.filter((leave) => leave.leaveType === leaveTypeFilter);
        }
        if (leaveStatusFilter !== LeaveStatus.ALL) {
            result = result.filter((leave) => leave.status === leaveStatusFilter);
        }
        setFilterEmployeeLeaves(result);
    }, [leaveTypeFilter, employeeLeaves, leaveStatusFilter]);

    /**
     * @function handleActionsTypes
     * @description Handles the selection of action (approve/reject) for a leave request.
     * @param {ChangeEvent<HTMLSelectElement>} event - The change event from the select input.
     * @param {Leave} leave - The leave object associated with the selected action.
     * @returns {void}
     */
    const [actionPopUp, setActionPopUp] = useState<boolean>(false)
    const [updatedLeaveItem, setUpdatedLeaveItem] = useState<Leave | null>(null)
    const [actionType, setActionType] = useState<string>("")

    const handleActionsTypes = (event: ChangeEvent<HTMLSelectElement>, leave: Leave): void => {
        setUpdatedLeaveItem(leave)
        setActionType(event.target.value)
        setActionPopUp(true)
    };
    const [updateLeaveById] = useUpdateLeaveByIdMutation();
    const userEmail = getUserMailFromSession();

    /**
     * Cancels the current action and closes the popup.
     *
     * @returns {void}
     */
    const handleCancel = (): void => {
        setActionPopUp((prev) => !prev)
    };

    /**
     * Handles the approval or rejection of a leave request.
     *
     * Updates the leave record and, if rejected, restores the employee's leave balance.
     *
     * @async
     * @returns {Promise<void>}
     */
    const handleSubmit = async (): Promise<void> => {
        try {
            const updatedLeaveData = {
                ...updatedLeaveItem,
                status: actionType,
                respondedBy: userEmail
            };
            await updateLeaveById(updatedLeaveData).unwrap();
        } catch (error) {
            alert(ErrorMessages.CatchError + { error })
        }
        setActionPopUp((prev) => !prev)
    }

    return (
        <>
            <Navbar />
            <div className='employee-container'>
                <h1>{convertFirstLetterToUpperCase(authRole ?? "")} Dashboard</h1>
                <div className="list-container">
                    <h2>Employees Leave Request</h2>
                    <FilterContainer
                        onLeaveStatusFilterChange={(leaveStatus: string) => setLeaveStatusFilter(leaveStatus)}
                        onLeaveTypeFilterChange={(leaveType: string) => setLeaveTypeFilter(leaveType)}
                    />
                    <CustomTable
                        data={filterEmployeeLeaves}
                        columns={getLeaveStatusColumns(handleActionsTypes)}
                    />
                </div>
            </div>

            {actionPopUp && (
                <Modal
                    title={`Do you want to ${actionType} the request?`}
                    onClose={handleCancel}
                    onSubmit={handleSubmit}
                    submitText={convertFirstLetterToUpperCase(actionType)}
                >
                    <form className="modal-container">
                        <label htmlFor="comments">Comments</label>
                        <textarea id="comments"></textarea>
                    </form>
                </Modal>
            )}
        </>
    )
};

export default LeaveStatusCard;
