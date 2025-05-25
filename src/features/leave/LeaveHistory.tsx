import { ChangeEvent, useEffect, useState } from "react";
import { Leave, ToastMessage } from "../../Types";
import { ActionType, LeaveStatus, LeaveType, RoleType, ToastContent, ToastType } from "../../Types/enumTypes";
import { useLazyGetLeaveByUserQuery, useLazyGetLeavesQuery } from "../../services/leaveService";
import { getUserFromSession, getUserMailFromSession } from "../../utils/roleUtils";
import { convertFirstLetterToUpperCase } from "../../utils/leaveUtils";
import FilterContainer from "../../components/common/FilterContainer";
import Navbar from "../../components/common/Navbar";
import LeaveForm from "../../features/leave/LeaveForm";
import { useGetEmployeeByMailQuery } from "../../services/employeeService";
import { CustomTable } from "../../components/common/CustomTable";
import CancelLeave from "./CancelLeave";
import { ErrorMessages } from "../../utils/errorUtils";
import { getLeaveColumns } from "./LeaveHistoryColumns";
import CustomToast from "../../components/layout/CustomToast";
import { v4 as uuidv4 } from "uuid"

/**
 * @component LeaveHistory
 * @description Component to display and manage leave history for employees, managers, or HR.
 * @returns {React.JSX.Element}
 */

const LeaveHistory = (): React.JSX.Element => {
    const user = getUserFromSession();
    const userEmail = getUserMailFromSession();
    const authRole = user?.role?.toLowerCase();
    const [triggerGetLeaveByUser] = useLazyGetLeaveByUserQuery();
    const [triggerGetAllLeaves] = useLazyGetLeavesQuery();
    const { data: employeeData = [] } = useGetEmployeeByMailQuery(userEmail);
    const [leavesData, setLeavesData] = useState<Leave[]>([]);
    const [filteredLeaves, setFilterLeaves] = useState<Leave[]>([]);
    const [leaveStatusFilter, setLeaveStatusFilter] = useState<string>(LeaveStatus.ALL)
    const [leaveTypeFilter, setLeaveTypeFilter] = useState<string>(LeaveType.ALL)
    const [refetchLeaveHistory, setRefetchLeaveHistory] = useState<boolean>(false)
    const [initialLeaveData, setInitialLeaveData] = useState<Leave | null>(null)
    const [showLeaveFormModal, setShowLeaveFormModal] = useState<boolean>(false)
    const [showCancelLeaveModal, setshowCancelLeaveModal] = useState<boolean>(false)
    const [showToast, setShowToast] = useState<boolean>(false)
    const [toastFields, setToastFields] = useState<ToastMessage>({
        toastKey: uuidv4(),
        message: '',
        type: ToastType.SUCCESS
    })

    useEffect(() => {
        /**
         * @function fetchLeaves
         * @description Fetches leaves data from the server based on the authenticated user's role.
         * @returns {Promise<void>}
         */
        const fetchLeaves = async (): Promise<void> => {
            if (authRole === RoleType.EMPLOYEE || authRole === RoleType.MANAGER) {
                try {
                    const response = await triggerGetLeaveByUser(user.email).unwrap();
                    setLeavesData(response);
                } catch (error) {
                    alert(ErrorMessages.CatchError + { error });
                }
            } else if (authRole === RoleType.HR) {
                try {
                    const response = await triggerGetAllLeaves().unwrap();
                    setLeavesData(response);
                } catch (error) {
                    alert(ErrorMessages.CatchError + { error });
                }
            }
        };
        fetchLeaves();
    }, [triggerGetLeaveByUser, authRole, triggerGetAllLeaves, user.email, refetchLeaveHistory]);

    useEffect(() => {
        let result = [...leavesData].reverse();
        if (leaveTypeFilter !== LeaveStatus.ALL) {
            result = result.filter((leave) => leave.leaveType === leaveTypeFilter);
        }
        if (leaveStatusFilter !== LeaveStatus.ALL) {
            result = result.filter((leave) => leave.status === leaveStatusFilter);
        }
        setFilterLeaves(result);
    }, [leaveTypeFilter, leavesData, leaveStatusFilter]);

    /**
     * @function handleModifyLeave
     * @description Handles leave modification or cancellation based on user selection.
     * @param {ChangeEvent<HTMLSelectElement>} event - The change event from the action select dropdown.
     * @param {Leave} item - The selected leave item for modification or cancellation.
     */
    const handleModifyLeave = (event: ChangeEvent<HTMLSelectElement>, item: Leave): void => {
        const modifyValue = event.target.value;
        setInitialLeaveData(item)
        if (modifyValue === ActionType.MODIFY) {
            setShowLeaveFormModal(true)
        } else {
            setshowCancelLeaveModal(true)
        }
    }

    const showLeavePopUp = (value: boolean): void => {
        setShowLeaveFormModal(value)
        setInitialLeaveData(null)
    }

    return (
        <>
            <Navbar />
            <div className='employee-container'>
                <h1>{convertFirstLetterToUpperCase(authRole ?? "")} Dashboard</h1>
                <div className="list-container">
                    <h2>{authRole !== RoleType.HR ? "My" : "Employees"} leave history</h2>
                    <FilterContainer
                        onLeaveStatusFilterChange={(leaveStatus: string) => setLeaveStatusFilter(leaveStatus)}
                        onLeaveTypeFilterChange={(leaveType: string) => setLeaveTypeFilter(leaveType)}
                    />

                    <CustomTable
                        data={filteredLeaves}
                        columns={getLeaveColumns(authRole ?? '', handleModifyLeave)}
                    />
                </div>
                {authRole !== RoleType.HR &&
                    <button
                        type="button"
                        className="button submit-btn req-leave-btn"
                        onClick={() => showLeavePopUp(true)}
                    >
                        Request Leave
                    </button>
                }
            </div>
            {showLeaveFormModal && (
                <LeaveForm
                    employeeData={employeeData[0]}
                    initialLeaveData={initialLeaveData}
                    onClose={() => { setShowLeaveFormModal(false) }}
                    onSubmit={() => {
                        setShowToast(true)
                        setShowLeaveFormModal(false)
                        setRefetchLeaveHistory((prev) => !prev)
                        setToastFields({
                            ...toastFields, toastKey: uuidv4(),
                            type: ToastType.SUCCESS, message: ToastContent.LEAVESUCCESS
                        })
                    }}
                />
            )}
            {showCancelLeaveModal && (
                <CancelLeave
                    cancelledLeaveItem={initialLeaveData}
                    onClose={() => { setshowCancelLeaveModal(false) }}
                    onSubmit={() => {
                        setShowToast(true)
                        setRefetchLeaveHistory((prev) => !prev)
                        setshowCancelLeaveModal(false)
                        setToastFields({
                            ...toastFields, toastKey: uuidv4(),
                            type: ToastType.ERROR, message: ToastContent.LEAVECANCEL
                        })
                    }}
                />
            )}
            {showToast && (<CustomToast
                key={toastFields.toastKey}
                message={toastFields.message}
                type={toastFields.type}
            />)}
        </>
    )
};

export default LeaveHistory; 
