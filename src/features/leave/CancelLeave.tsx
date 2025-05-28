import { useState, type ChangeEvent } from "react";
import { useUpdateLeaveByIdMutation } from "../../services/leaveService";
import type { CancelLeaveProps } from "../../Types";
import Modal from "../../components/layout/CustomModal";
import { LeaveFormVariables, LeaveStatus } from "../../Types/enumTypes";
import { ErrorMessages } from "../../utils/errorUtils";

/** 
 * @description
 * Renders the employee popup for submitting leave or cancelling a leave request.
 * 
 * Displays the leave form or a cancellation confirmation dialog depending on state.
 * Handles leave cancellation logic including reason validation and leave balance adjustment.
 * @component EmployeePopUp
 * @returns {React.JSX.Element} The employee popup component.
 */

const CancelLeave: React.FC<CancelLeaveProps> = (props: CancelLeaveProps): React.JSX.Element => {
    const { cancelledLeaveItem, onClose, onSubmit } = props
    const [updateLeaveById] = useUpdateLeaveByIdMutation();
    const [cancelReason, setCancelReason] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);

    /**
     * Handles changes to the cancellation reason textarea.
     *
     * Updates local state with the user's input.
     *
     * @param {ChangeEvent<HTMLTextAreaElement>} event - The change event from the textarea.
     * @returns {void}
     */
    const handleReasonText = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        const reasonValue = event.target.value;
        setCancelReason(reasonValue);
    };

    /**
     * Handles cancelling the cancellation popup without submitting.
     *
     * Clears local input state and closes the popup.
     *
     * @returns {void}
     */
    const handleCancelRequest = (): void => {
        setCancelReason('');
        onClose()
    };

    /**
     * Handles submitting a leave cancellation request.
     *
     * Validates input, updates leave status
     *
     * @async
     * @returns {Promise<void>}
     */
    const handleSubmitRequest = async (): Promise<void> => {
        if (!cancelReason) {
            setHasError(true);
            return;
        }

        const updatedLeaveData = { ...cancelledLeaveItem, status: LeaveStatus.CANCELLED, reason: cancelReason };
        try {
            const leaveResponse = await updateLeaveById(updatedLeaveData).unwrap();
            console.log(leaveResponse);
        } catch (error) {
            alert(ErrorMessages.CatchError + { error });
        }

        onSubmit()
        setCancelReason('');
    };

    return (
        <Modal
            title="Do you want to cancel leave request?"
            onClose={handleCancelRequest}
            onSubmit={handleSubmitRequest}
        >
            <div className="modal-container">
                <label htmlFor="reason">
                    Reason<span className="required">*</span>
                </label>
                <textarea
                    maxLength={LeaveFormVariables.REASONMAXLENGTH}
                    id="reason"
                    value={cancelReason}
                    onChange={(e) => handleReasonText(e)}
                />
                {hasError && !cancelReason && (
                    <span className="error-message">Field is required!</span>
                )}
            </div>
        </Modal>
    )
};

export default CancelLeave;
