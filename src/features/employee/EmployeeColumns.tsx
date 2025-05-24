import { ColumnDefinition, Employee } from "../../Types";
import { convertFirstLetterToUpperCase } from "../../utils/leaveUtils";

export const getEmployeeColumns = (
    handleEditEmployee: (employee: Employee) => void,
    handleRemoveEmployee: (employee: Employee) => Promise<void>
): ColumnDefinition<Employee>[] => {
    const baseColumns: ColumnDefinition<Employee>[] = [
        { header: 'Employee Id', accessor: 'empId' },
        { header: 'Employee Name', accessor: 'name' },
        { header: 'Employee Email', accessor: 'email' },
        { header: 'Employee Role', accessor: 'role', render: (row) => convertFirstLetterToUpperCase(row.role) },
        { header: 'Manager Email', accessor: 'managerEmail' },
        {
            header: 'Edit',
            accessor: '',
            render: (row) => (
                <button onClick={() => handleEditEmployee(row)} className="button edit-btn">Edit</button>
            )
        },
        {
            header: 'Remove',
            accessor: '',
            render: (row) => (
                <button onClick={() => handleRemoveEmployee(row)} className="button remove-btn">Remove</button>
            )
        }
    ]
    return baseColumns;
}