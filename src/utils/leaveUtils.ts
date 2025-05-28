import type { Leave, LeaveTypes } from "../Types";

import { LeaveType, LeaveStatus } from "../Types/enumTypes";
import { ErrorMessages } from "./errorUtils";
/**
 * @description  Calculates the total number of paid and unpaid leave days (excluding cancelled or rejected).
 * @param {Leave[]} leaveData - Array of leave records.
 * @returns {LeaveTypes} Object containing paid and unpaid leave totals.
 */
export const calculateLeaveTypes = (leaveData: Leave[]): LeaveTypes => {
    let paidLeaves = 0;
    let unPaidLeaves = 0;
    for (const leave of leaveData) {
        if (leave.status !== LeaveStatus.CANCELLED && leave.status !== LeaveStatus.REJECTED) { 
            if (leave.leaveType === LeaveType.PAID) {
                paidLeaves += leave.dayDifference;
            }
            else if (leave.leaveType === LeaveType.UNPAID) {
                unPaidLeaves += leave.dayDifference;
            }
        }
    }
    return { paidLeaves, unPaidLeaves };
};
/**
 * @description
 * Compares two leave objects to detect any field-level changes.
 * @param {Leave} initialData - The original leave data.
 * @param {Leave} leaveForm - The updated leave form data.
 * @returns {boolean} True if any field differs, otherwise false.
 */
export const compareUpdatedData = (initialData: Leave, leaveForm: Leave): boolean => {
    return (Object.keys(initialData) as Array<keyof Leave>).some((key) => initialData[key] !== leaveForm[key]);
};
/**
 * @description
 * Converts the first letter of a string to uppercase.
 * @param {string} value - The input string.
 * @returns {string} String with the first letter in uppercase.
 */
export const convertFirstLetterToUpperCase = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);
/**
 * @description
 * Converts the first letter of a string to lowercase.
 * @param {string} value - The input string.
 * @returns {string} String with the first letter in lowercase.
 */
export const convertFirstLetterToLowerCase = (value: string): string => value.charAt(0).toLowerCase() + value.slice(1);
/**
 * @description
 * Validates for duplicate leave dates by checking overlaps and improper ranges.
 * @param {Leave[]} allLeaveData - All leave records.
 * @param {string} startDate - New leave start date.
 * @param {string} endDate - New leave end date.
 * @param {Leave | null} [initialLeaveData] - Leave data being edited (to exclude from conflict).
 * @returns {string} An error message if there's a conflict, otherwise an empty string.
 */
export const checkDuplicatedLeaves = (allLeaveData: Leave[], startDate: string, endDate: string, initialLeaveData?: Leave | null): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end)
        return ErrorMessages.LeaveForm.END_DATE_INVALID
    for (const leave of allLeaveData) {
        if (initialLeaveData?.id === leave.id || leave.status === LeaveStatus.CANCELLED || leave.status === LeaveStatus.REJECTED) {
            continue;
        }
        const leaveStart = new Date(leave.startDate);
        const leaveEnd = new Date(leave.endDate);
        const overlaps = (start >= leaveStart && start <= leaveEnd) ||
            (end >= leaveStart && end <= leaveEnd) ||
            (leaveStart >= start && leaveEnd <= end);
        if (overlaps) {
            return ErrorMessages.LeaveForm.DUPLICATE_LEAVE
        }
    }
    return "";
};

/**
 * Converts a leave status string from the backend format to the UI format.
 *
 * @param item - The leave status string to be converted. 
 *               Expected values are "approve", "reject", or other strings.
 * @returns The converted leave status string in the UI format.
 *          - "approve" is converted to "approved".
 *          - "reject" is converted to "rejected".
 *          - Other strings are returned as-is.
 */
export const convertToUIStatus = (item: string): string => {
    if (item === "approve") return "approved"
    if (item === "reject") return "rejected"
    return item
} 
