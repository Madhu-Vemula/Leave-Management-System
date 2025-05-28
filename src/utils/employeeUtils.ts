import type { Employee } from "../Types";

/**
 * @description Checks if the given employee ID already exists in the list of employees.
 * @param {Employee[]} allEmployeeData - List of all employee records.
 * @param {string} idValue - The employee ID to check for duplication.
 * @returns {boolean} True if the ID is a duplicate, false otherwise.
 */
export const checkDuplicateEmployeeIds = (allEmployeeData: Employee[], idValue: string, intialEmployeeData: Employee | null): boolean => {
    if (intialEmployeeData) if (idValue === intialEmployeeData.empId) return false
    return allEmployeeData.some((employee) => employee.empId === idValue)
};

/**
 * @description Checks if the given email already exists in the list of employees.
 * @param {Employee[]} allEmployeeData - List of all employee records.
 * @param {string} email - The email to check for duplication.
 * @returns {boolean} True if the email is a duplicate, false otherwise.
 */
export const checkDuplicateEmployeeEmails = (allEmployeeData: Employee[], email: string,intialEmployeeData:Employee|null): boolean => { 
    if (intialEmployeeData) if (email === intialEmployeeData.email) return false
    return allEmployeeData.some((employee) => employee.email === email);
};
