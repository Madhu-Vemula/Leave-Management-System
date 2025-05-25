import { ColumnDefinition, Employee } from "../../Types";
import { convertFirstLetterToUpperCase } from "../../utils/leaveUtils";

/**
 * @function getEmployeeColumns
 * @description Generates column configurations for an employee management table with edit/remove actions
 * 
 * @param {(employee: Employee) => void} handleEditEmployee - Callback function triggered when edit button is clicked
 * @param {(employee: Employee) => Promise<void>} handleRemoveEmployee - Async callback function triggered when remove button is clicked
 * 
 * @returns {ColumnDefinition<Employee>[]} Array of column configurations for the employee table
 */
export const getEmployeeColumns = (
    handleEditEmployee: (employee: Employee) => void,
    handleRemoveEmployee: (employee: Employee) => Promise<void>
): ColumnDefinition<Employee>[] => {
    /**
     * @constant baseColumns
     * @type {ColumnDefinition<Employee>[]}
     * @description Base column configuration for employee table containing:
     * - Employee ID, Name, Email, Role (formatted), and Manager Email
     * - Action buttons for editing and removing employees
     */
    const baseColumns: ColumnDefinition<Employee>[] = [
        {
            header: 'Employee Id',
            accessor: 'empId'
        },
        {
            header: 'Employee Name',
            accessor: 'name'
        },
        {
            header: 'Employee Email',
            accessor: 'email'
        },
        {
            header: 'Employee Role',
            accessor: 'role',
            render: (row) => convertFirstLetterToUpperCase(row.role)
        },
        {
            header: 'Manager Email',
            accessor: 'managerEmail'
        },
        {
            header: 'Edit',
            accessor: '',
            render: (row) => (
                <button
                    onClick={() => handleEditEmployee(row)}
                    className="button edit-btn"
                    aria-label={`Edit employee ${row.name}`}
                >
                    Edit
                </button>
            )
        },
        {
            header: 'Remove',
            accessor: '',
            render: (row) => (
                <button
                    onClick={() => handleRemoveEmployee(row)}
                    className="button remove-btn"
                    aria-label={`Remove employee ${row.name}`}
                >
                    Remove
                </button>
            )
        }
    ];

    return baseColumns;
};