import { ChangeEvent, useEffect, useState } from "react";
import { Leave, ToastMessage } from "../../Types";
import { LeaveType, LeaveStatus, ToastType, ToastContent, ActionType } from "../../Types/enumTypes";
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
import { v4 as uuidv4 } from "uuid"
import CustomToast from "../../components/layout/CustomToast";
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
    const [showToast, setShowToast] = useState<boolean>(false)
    const [toastFields, setToastFields] = useState<ToastMessage>({
        toastKey: uuidv4(),
        message: '',
        type: ToastType.INFO
    })

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
                    onSubmit={() => {
                        handleSubmit()
                        setShowToast(true)
                        setToastFields({
                            ...toastFields,
                            toastKey: uuidv4(),
                            type: actionType === ActionType.APPROVE ? ToastType.ERROR : ToastType.ERROR,
                            message: actionType === ActionType.APPROVE ? ToastContent.LEAVEAPPROVED :
                                ToastContent.LEAVEREJECTED
                        })
                    }}
                    submitText={convertFirstLetterToUpperCase(actionType)}
                >
                    <form className="modal-container">
                        <label htmlFor="comments">Comments</label>
                        <textarea id="comments"></textarea>
                    </form>
                </Modal>
            )}
            {showToast && <CustomToast
                key={toastFields.toastKey}
                message={toastFields.message}
                type={toastFields.type}
            />}
        </>
    )
};

export default LeaveStatusCard;
