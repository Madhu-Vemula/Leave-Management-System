import React, { useState, ChangeEvent } from "react";
import { Leave, LeaveFormProps } from "../../Types";
import { LeaveType, LeaveStatus, LeaveBalance } from "../../Types/enumTypes";
import palTechLogo from "../../assets/images/paltech_logo.png";
import { useGetLeaveByUserQuery, useSubmitLeaveMutation, useUpdateLeaveByIdMutation, } from "../../services/leaveService";
import { getUserFromSession, getUserMailFromSession, } from "../../utils/roleUtils";
import { calculateLeaveTypes, checkDuplicatedLeaves, compareUpdatedData, } from "../../utils/leaveUtils";
import Modal from "../../components/common/CustomModal";
import { ErrorMessages } from "../../utils/errorUtils";
/**
 * @component LeaveForm
 * @description Form component for employees to request or edit leave.
 * Automatically calculates leave balance and ensures no overlapping requests.
 *
 * @param {EmployeeDataProps} props - Props containing the selected employee's data.
 * @returns {React.JSX.Element} Form UI for submitting or updating a leave request.
 */
/**
 * @description Props for rendering employee data.
 */

const LeaveForm: React.FC<LeaveFormProps> = (props: LeaveFormProps): React.JSX.Element => {
    const { employeeData,
        initialLeaveData, onClose, onSubmit } = props

    const userEmail = getUserMailFromSession();
    const [submitLeave] = useSubmitLeaveMutation();
    const [updateLeaveById] = useUpdateLeaveByIdMutation();
    const { data: allLeaveData = [] } = useGetLeaveByUserQuery(userEmail);
    const [leaveForm, setLeaveForm] = useState<Leave>(
        initialLeaveData ?? {
            empId: "",
            email: "",
            startDate: "",
            endDate: "",
            leaveType: "",
            reason: "",
            status: LeaveStatus.PENDING,
            dayDifference: 1,
        })

    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    /**
    * @description Set value for start date for leave in leave form
    * @param {ChangeEvent<HTMLInputElement>} event
    * @returns {void}
    */
    const handleStartDate = (event: ChangeEvent<HTMLInputElement>): void => {
        setLeaveForm({ ...leaveForm, startDate: event.target.value });
    };
    /**
    * @description Set value for end date for leave in leave form
    * @param {ChangeEvent<HTMLInputElement>} event
    * @returns {void}
    */
    const handleEndDate = (event: ChangeEvent<HTMLInputElement>): void => {
        setLeaveForm({ ...leaveForm, endDate: event.target.value });
    };
    /**
    * @description Set value for leave type for leave in leave form
    * @param {ChangeEvent<HTMLSelectElement>} event
    * @returns {void}
    */
    const handleLeaveType = (event: ChangeEvent<HTMLSelectElement>): void => {
        setLeaveForm({ ...leaveForm, leaveType: event.target.value });
    };
    /**
    * @description Set value for reason for leave in leave form
    * @param {ChangeEvent<HTMLTextAreaElement>} event
    * @returns {void}
    */
    const handleReason = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setLeaveForm({ ...leaveForm, reason: event.target.value });
    };
    /**
     * @function handleLeaveFormData
     * @description Submits or updates leave request based on form mode.
     *
     * @param {ChangeEvent<HTMLFormElement>} event - The form submit event.
     * @returns {Promise<void>}
     */
    const handleLeaveFormData = async (): Promise<void> => {
        if (!leaveForm.startDate ||
            !leaveForm.endDate ||
            !leaveForm.reason ||
            !leaveForm.leaveType) {
            setHasError(true);
            return;
        }
        const start = new Date(leaveForm.startDate);
        const end = new Date(leaveForm.endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error(ErrorMessages.LeaveForm.INVALID_DATE_FORMAT);
        }
        const dayDifference = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        if (dayDifference < 0) {
            setHasError(true);
            return;
        }
        const error = checkDuplicatedLeaves(allLeaveData, leaveForm.startDate, leaveForm.endDate, initialLeaveData);
        if (error) {
            setErrorMessage(error);
            return;
        }
        if (initialLeaveData) {
            const unpaidToPaid = leaveForm.leaveType === LeaveType.PAID && initialLeaveData.leaveType === LeaveType.UNPAID;
            if (unpaidToPaid) {
                if ((LeaveBalance.BALANCE - calculateLeaveTypes(allLeaveData).paidLeaves - dayDifference) < 0) {
                    setErrorMessage(ErrorMessages.LeaveForm.NO_ENOUGH_PAID_LEAVES)
                    return;
                }
            }

            const paidToPaid = leaveForm.leaveType === LeaveType.PAID && initialLeaveData.leaveType === LeaveType.PAID;
            if (paidToPaid) {
                if (LeaveBalance.BALANCE - calculateLeaveTypes(allLeaveData).paidLeaves + initialLeaveData.dayDifference - dayDifference < 0) {
                    setErrorMessage(ErrorMessages.LeaveForm.NO_ENOUGH_PAID_LEAVES)
                    return;
                }
            }
        }
        else if (leaveForm.leaveType === LeaveType.PAID &&
            LeaveBalance.BALANCE - (calculateLeaveTypes(allLeaveData).paidLeaves + dayDifference) < 0) {
            setErrorMessage(ErrorMessages.LeaveForm.NO_ENOUGH_PAID_LEAVES);
            return;
        }
        const user = getUserFromSession();
        const updatedDayDifference = dayDifference;
        const leaveData: Leave = {
            empId: employeeData.empId,
            email: user.email,
            dayDifference: updatedDayDifference,
            status: leaveForm.status,
            leaveType: leaveForm.leaveType,
            reason: leaveForm.reason,
            startDate: leaveForm.startDate,
            endDate: leaveForm.endDate,
        }
        try {
            if (!initialLeaveData) {
                await submitLeave(leaveData).unwrap();
            }
            else {
                if (!compareUpdatedData(initialLeaveData, leaveForm)) {
                    setErrorMessage(ErrorMessages.LeaveForm.FORM_NOT_UPDATED);
                    return;
                }
                const updatedLeave = {
                    ...leaveForm,
                    status: LeaveStatus.PENDING,
                    dayDifference: updatedDayDifference,
                };
                await updateLeaveById(updatedLeave).unwrap();
            }
        }
        catch (error) {
            alert(ErrorMessages.CatchError + { error });
        }
        onSubmit()
    }

    const onCancel = (): void => {
        onClose()
    }

    return (
        <Modal
            title="Request Leave"
            logoSrc={palTechLogo}
            onClose={onCancel}
            onSubmit={handleLeaveFormData}
        >
            <div className="modal-container">
                <label htmlFor="start-date">
                    Start Date<span className="required">*</span>
                </label>
                <input value={leaveForm.startDate} min={new Date().toISOString().split("T")[0]} type="date" id="start-date" onChange={handleStartDate} />
                {hasError && !leaveForm.startDate && (<span className="error-message">Field is required</span>)}

                <label htmlFor="end-date">
                    End Date<span className="required">*</span>
                </label>
                <input value={leaveForm.endDate} type="date" id="end-date" onChange={handleEndDate} />
                {hasError && !leaveForm.endDate && (<span className="error-message">Field is required</span>)}
                {leaveForm.startDate &&
                    leaveForm.endDate &&
                    new Date(leaveForm.startDate) > new Date(leaveForm.endDate) && (<span className="error-message">
                        End date should be greater than start date.
                    </span>)}

                <label htmlFor="leave-type">
                    Leave Type<span className="required">*</span>
                </label>
                <select value={leaveForm.leaveType} id="leave-type" onChange={handleLeaveType}>
                    <option value="">Select Leave Type</option>
                    <option value={LeaveType.UNPAID}>Unpaid Leave - Infinite days available</option>
                    <option value={LeaveType.PAID}>
                        Paid Leave - {LeaveBalance.BALANCE - calculateLeaveTypes(allLeaveData).paidLeaves} days available
                    </option>
                </select>
                {hasError && !leaveForm.leaveType && (<span className="error-message">Field is required</span>)}

                <label htmlFor="reason">
                    Reason<span className="required">*</span>
                </label>
                <textarea maxLength={20} id="reason" value={leaveForm.reason} onChange={handleReason}></textarea>
                {hasError && !leaveForm.reason && (<span className="error-message">Field is required</span>)}
                {errorMessage && <span className="error-message">{errorMessage}</span>}
            </div>
        </Modal>
    )
}
export default LeaveForm;
