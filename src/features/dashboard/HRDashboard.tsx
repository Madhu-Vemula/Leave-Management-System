import { useGetEmployeesQuery, useRemoveEmployeeMutation } from "../../services/employeeService";
import type { Employee, ToastMessage } from "../../Types";
import { useDeleteLeavesByIdMutation, useLazyGetLeaveByUserQuery } from "../../services/leaveService";
import EmployeeForm from "../employee/EmployeeForm";
import { useCallback, useMemo, useState } from "react";
import Navbar from "../../components/common/Navbar";
import CustomTable from "../../components/layout/CustomTable";
import { ErrorMessages } from "../../utils/errorUtils";
import { getEmployeeColumns } from "../employee/EmployeeColumns";
import { v4 as uuidv4 } from "uuid"
import { ToastContent, ToastType } from "../../Types/enumTypes";
import CustomToast from "../../components/layout/CustomToast";
import Modal from "../../components/layout/CustomModal";
import CardSection from "../../components/layout/CardSection";
import DashboardBlock from "../../components/layout/DashboardBlock";
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
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const [showEmployeeFormModal, setShowEmployeeFormModal] = useState<boolean>(false)
    const [showRemoveEmployeeModal, setShowRemoveEmployeeModal] = useState<boolean>(false)
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
    const handleEditEmployee = useCallback((employee: Employee): void => {
        setShowEmployeeFormModal(true)
        setSelectedEmployee(employee)
    }, [])


        /**
     * @function handleRemoveEmployee
     * @description Handles the initiation of employee removal by:
     *              - Showing the confirmation modal
     *              - Setting the employee to be removed in state
     * @param {Employee} employee - The employee object marked for removal
     * @returns {void}
     */
    const handleRemoveEmployee = useCallback((employee: Employee): void => {
        setShowRemoveEmployeeModal(true);
        setSelectedEmployee(employee);
    }, []);

    /**
     * @function deleteEmployeeData
     * @description Performs complete employee deletion including:
     *              - Fetching all associated leaves
     *              - Removing employee record
     *              - Cleaning up all related leaves
     *              - Handling success/error states
     *              - Managing UI feedback (toast notifications)
     * @returns {Promise<void>}
     * @throws {Error} When any deletion operation fails
     */
    const deleteEmployeeData = async (): Promise<void> => {
        if (!selectedEmployee) {
            console.warn('No employee selected for deletion');
            return;
        }

        try {
            const leaves = await getLeavesByUser(selectedEmployee.email).unwrap();

            await removeEmployee(selectedEmployee.id).unwrap();

            await Promise.all(
                leaves.map(async (leave) => {
                    if (leave.id) {
                        const response = await deleteLeavesById(leave.id);
                        console.log('Leave deletion response:', response);
                    }
                })
            );

            setShowToast(true);
            setToastFields({
                ...toastFields,
                toastKey: uuidv4(),
                message: ToastContent.EMPLOYEEDELETED,
                type: ToastType.SUCCESS
            });

        } catch (error) {
            console.error('Employee deletion failed:', error);

            setToastFields({
                ...toastFields,
                toastKey: uuidv4(),
                message: `${ErrorMessages.CatchError}: ${error}`,
                type: ToastType.ERROR
            });

            alert(`${ErrorMessages.CatchError}\n${error}`);
        } finally {
            setShowRemoveEmployeeModal(false);
        }
    }
    /**
        * @function handleAddEmployee
        * @description Opens the employee form popup and resets initial employee form data.
        * @returns {void}
        */

    const handleAddEmployee = (): void => {
        setSelectedEmployee(null)
        setShowEmployeeFormModal(true)
    }

    /**
     * @constant memoizedEmployeeColumns
     * @description Memoized Employee columns 
     * @type {ColumnDefinition<Leave>[]}
     */
    const memoizedEmployeeColumns = useMemo(() => (
        getEmployeeColumns(handleEditEmployee, handleRemoveEmployee)
    ), [handleEditEmployee, handleRemoveEmployee])

    return (
        <>
            <Navbar />
            <DashboardBlock
                title="Hr Dashboard"
            >
                <CardSection
                    title="Employees List"
                >
                    <CustomTable
                        data={employeeData}
                        columns={memoizedEmployeeColumns}
                    />
                </CardSection>
                <button
                    type="button"
                    className="button add-btn"
                    onClick={() => handleAddEmployee()}
                >
                    Add Employee
                </button>
            </DashboardBlock>
            {showEmployeeFormModal && <EmployeeForm
                initialEmployeeData={selectedEmployee}
                onClose={() => setShowEmployeeFormModal(false)}
                onSubmit={() => {
                    setShowEmployeeFormModal(false)
                    setShowToast(true)
                    setToastFields({
                        ...toastFields,
                        toastKey: uuidv4(),
                        message: selectedEmployee ? ToastContent.EMPLOYEEUPDATED : ToastContent.EMPLOYEESUCCESS,
                        type: ToastType.SUCCESS
                    })
                }}
            />}
            {showRemoveEmployeeModal && (
                <Modal
                    title="Do you want to remove the employee?"
                    onClose={() => setShowRemoveEmployeeModal(false)}
                    onSubmit={deleteEmployeeData}
                    submitText="Remove"
                >
                    <></>
                </Modal>
            )
            }
            {showToast && <CustomToast
                key={toastFields.toastKey}
                message={toastFields.message}
                type={toastFields.type}
            />}
        </>
    );
};

export default HrDashboard;
