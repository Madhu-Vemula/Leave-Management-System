import { useGetEmployeesQuery, useRemoveEmployeeMutation } from "../../services/employeeService";
import { Employee, ToastMessage } from "../../Types";
import { useDeleteLeavesByIdMutation, useLazyGetLeaveByUserQuery } from "../../services/leaveService";
import EmployeeForm from "../employee/EmployeeForm";
import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import { CustomTable } from "../../components/common/CustomTable";
import { ErrorMessages } from "../../utils/errorUtils";
import { getEmployeeColumns } from "../employee/EmployeeColumns";
import { v4 as uuidv4 } from "uuid"
import { ToastContent, ToastType } from "../../Types/enumTypes";
import CustomToast from "../../components/layout/CustomToast";
/**
 * @component EmployeeList
 * @description Renders a table of all employees, with options to edit or remove employees.
 * Integrates with Redux for UI state and performs API operations to manage employees and their leaves.
 * @returns {React.JSX.Element} A table view of employees with actions.
 */

const HrDashboard: React.FC = (): React.JSX.Element => {
    const { data: employeeData = [] } = useGetEmployeesQuery();
    const [removeEmployee] = useRemoveEmployeeMutation();
    const [deleteLeavesById] = useDeleteLeavesByIdMutation();
    const [getLeavesByUser] = useLazyGetLeaveByUserQuery();
    const [initialEmployeeData, setInitialEmployeeData] = useState<Employee | null>(null)
    const [showEmployeeFormModal, setShowEmployeeFormModal] = useState<boolean>(false)
    const [showToast, setShowToast] = useState<boolean>(false)
    const [toastFields, setToastFields] = useState<ToastMessage>({
        toastKey: uuidv4(),
        message: '',
        type: ToastType.SUCCESS
    })
    /**
     * @function handleEditEmployee
     * @description Opens the form pop-up with selected employee data prefilled for editing.
     * @param {Employee} employee - The employee object to be edited.
     * @returns {void}
     */
    const handleEditEmployee = (employee: Employee): void => {
        setShowEmployeeFormModal(true)
        setInitialEmployeeData(employee)
    };

    /**
     * @function handleRemoveEmployee
     * @description Handles the removal of an employee and associated leave records.
     * Performs a cascade delete: first the employee, then their leave records (if any).
     * @param {Employee} employee - The employee object to be removed.
     * @returns {Promise<void>} A promise indicating completion.
     */
    const handleRemoveEmployee = async (employee: Employee): Promise<void> => {
        try {
            const leaves = await getLeavesByUser(employee.email).unwrap();

            await removeEmployee(employee.id).unwrap();

            await Promise.all(
                leaves.map(async (leave) => {
                    const response = await deleteLeavesById(leave.id ?? '');
                    console.log(response);
                })
            );
        } catch (error) {
            alert(ErrorMessages.CatchError + { error });
        }
        setShowToast(true)
        setToastFields({
            ...toastFields,
            toastKey: uuidv4(),
            message: ToastContent.EMPLOYEEDELETED,
            type: ToastType.ERROR
        })
    };
    /**
        * @function handleAddEmployee
        * @description Opens the employee form popup and resets initial employee form data.
        * @returns {void}
        */

    const handleAddEmployee = (): void => {
        setInitialEmployeeData(null)
        setShowEmployeeFormModal(true)
    };

    return (
        <>
            <Navbar />
            <div className={`employee-container`}>
                <h1>HR Dashboard</h1>
                <div className="list-container">
                    <h2>Employees List</h2>
                    <CustomTable
                        data={employeeData}
                        columns={getEmployeeColumns(handleEditEmployee, handleRemoveEmployee)}
                    />
                </div>

                <button
                    type="button"
                    className="button add-btn"
                    onClick={() => handleAddEmployee()}
                >
                    Add Employee
                </button>
            </div>
            {showEmployeeFormModal && <EmployeeForm
                initialEmployeeData={initialEmployeeData}
                onClose={() => setShowEmployeeFormModal(false)}
                onSubmit={() => {
                    setShowEmployeeFormModal(false)
                    setShowToast(true)
                    setToastFields({
                        ...toastFields,
                        toastKey: uuidv4(),
                        message: initialEmployeeData ? ToastContent.EMPLOYEEUPDATED : ToastContent.EMPLOYEESUCCESS,
                        type: ToastType.SUCCESS
                    })
                }}
            />}
            {showToast && <CustomToast
                key={toastFields.toastKey}
                message={toastFields.message}
                type={toastFields.type}
            />}
        </>
    );
};

export default HrDashboard;
