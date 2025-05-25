import { ChangeEvent, useState } from "react";
import { Employee, EmployeeFormProps } from "../../Types";
import {
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetAllManagersQuery,
  useGetEmployeesQuery
} from "../../services/employeeService";
import palTechLogo from "../../assets/images/paltech_logo.png";
import {
  checkDuplicateEmployeeEmails,
  checkDuplicateEmployeeIds
} from "../../utils/employeeUtils";
import Modal from "../../components/common/CustomModal";
import { ErrorMessages } from "../../utils/errorUtils";
import { DomainDetails, HrDetails, RoleType } from "../../Types/enumTypes";
import ManagerDropDown from "./ManagerDropDown";

/**
 * @component EmployeeForm
 * @description Component to handle both adding and editing employees. It includes validation, dynamic manager assignment,
 * API integration, and error handling. It supports controlled inputs for fields like ID, name, email, password, role, and manager.
 * @returns {React.JSX.Element} A JSX form element for employee input.
 */

const EmployeeForm: React.FC<EmployeeFormProps> = (props: EmployeeFormProps): React.JSX.Element => {
  const { initialEmployeeData, onClose, onSubmit } = props
  const [addEmployee] = useAddEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const { data: managerData = [] } = useGetAllManagersQuery();
  const { data: allEmployeesData = [] } = useGetEmployeesQuery();

  const [employeeForm, setEmployeeForm] = useState<Employee>(
    initialEmployeeData ?? {
      empId: '',
      name: '',
      email: '',
      role: '',
      managerEmail: '',
      password: '',
    }
  );

  const [hasError, setHasError] = useState<boolean>(false);
  const [hasManagerError, sethasManagerError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  /**
   * @description Handles employee ID input changes and checks for duplicates.
   * @param {ChangeEvent<HTMLInputElement>} event - Input change event.
   */
  const handleEmployeeId = (event: ChangeEvent<HTMLInputElement>): void => {
    const idValue = event.target.value;
    setEmployeeForm({ ...employeeForm, empId: idValue });
  };

  /**
   * @description Handles employee name input changes.
   * @param {ChangeEvent<HTMLInputElement>} event - Input change event.
   */
  const handleEmployeeName = (event: ChangeEvent<HTMLInputElement>): void => {
    const nameValue = event.target.value;
    setEmployeeForm({ ...employeeForm, name: nameValue });
  };

  /**
   * @description Handles employee password input and validates length.
   * @param {ChangeEvent<HTMLInputElement>} event - Input change event.
   */
  const handleEmployeePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    const passwordValue = event.target.value;
    setEmployeeForm({ ...employeeForm, password: passwordValue })
  };

  /**
   * @description Handles employee email input and checks for duplicates.
   * @param {ChangeEvent<HTMLInputElement>} event - Input change event.
   */
  const handleEmployeeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    const emailValue = event.target.value;
    setEmployeeForm({ ...employeeForm, email: emailValue })
  };

  /**
   * @description Handles role selection from dropdown.
   * @param {ChangeEvent<HTMLSelectElement>} event - Select change event.
   */
  const handleEmployeeRole = (event: ChangeEvent<HTMLSelectElement>): void => {
    const roleValue = event.target.value;
    setEmployeeForm({ ...employeeForm, role: roleValue });
  }

  /**
   * @description Closes the form pop-up without submitting data.
   */
  const handleCancelRequest = (): void => {
    onClose()
  };

  /**
   * @description Handles form submission, performs validation, and triggers API call for add or update.
   * @param {ChangeEvent<HTMLFormElement>} event - Form submission event.
   * @returns {Promise<void>} Promise resolving when form handling is complete.
   */
  const submitEmployeeForm = async (): Promise<void> => {
    setErrorMessage('')
    if (!employeeForm.name || !employeeForm.email || !employeeForm.empId || !employeeForm.role || !employeeForm.password) {
      setHasError(true);
      return
    }

    if (checkDuplicateEmployeeIds(allEmployeesData, employeeForm.empId, initialEmployeeData)) {
      setErrorMessage(ErrorMessages.EmployeeForm.INVALID_ID);
      return
    }

    if (!employeeForm.email.includes(DomainDetails.DOMAIN)) {
      setErrorMessage(ErrorMessages.EmployeeForm.INVALID_DOMAIN)
      return;
    }

    if (checkDuplicateEmployeeEmails(allEmployeesData, employeeForm.email, initialEmployeeData)) {
      setErrorMessage(ErrorMessages.EmployeeForm.INVALID_EMAIL)
      return
    }

    if (employeeForm.password.length < 6) {
      setErrorMessage(ErrorMessages.EmployeeForm.INVALID_PASSWORD_LENGTH)
      return
    }

    if (employeeForm.role === RoleType.EMPLOYEE) {
      if (!employeeForm.managerEmail) {
        sethasManagerError(true)
        return;
      }
      if (!employeeForm.managerEmail.includes(DomainDetails.DOMAIN)) {
        setErrorMessage(ErrorMessages.EmployeeForm.INVALID_DOMAIN);
        return;
      }
    }

    if (employeeForm.role === RoleType.MANAGER) {
      employeeForm.managerEmail = HrDetails.MAIL;
    }

    try {
      if (!initialEmployeeData) {
        const response = await addEmployee(employeeForm).unwrap();
        console.log(response);
      } else {
        const response = await updateEmployee(employeeForm).unwrap();
        console.log(response);
      }
      onSubmit()
    } catch (error) {
      alert(ErrorMessages.CatchError + { error });
    }
  };

  return (
    <Modal
      title="Add Employee"
      logoSrc={palTechLogo}
      onSubmit={submitEmployeeForm}
      onClose={handleCancelRequest}
    >
      <form onSubmit={submitEmployeeForm} className="modal-container">
        <label htmlFor="employee-id">Employee id<span className="required">*</span></label>
        <input type="text" id="employee-id" placeholder="Enter employee id" value={employeeForm.empId} onChange={handleEmployeeId} />
        {hasError && !employeeForm.empId && <span className="error-message">Field is required</span>}

        <label htmlFor="employee-name">Employee name<span className="required">*</span></label>
        <input type="text" id="employee-name" placeholder="Enter employee name" value={employeeForm.name} onChange={handleEmployeeName} />
        {hasError && !employeeForm.name && <span className="error-message">Field is required</span>}

        <label htmlFor="employee-email">Employee email<span className="required">*</span></label>
        <input type="text" id="employee-email" placeholder="Enter employee email" value={employeeForm.email} onChange={handleEmployeeEmail} />
        {hasError && !employeeForm.email && <span className="error-message">Field is required</span>}

        <label htmlFor="employee-password">Employee password<span className="required">*</span></label>
        <input type="password" id="employee-password" placeholder="Enter employee password" value={employeeForm.password} onChange={handleEmployeePassword} />
        {hasError && !employeeForm.password && <span className="error-message">Field is required</span>}

        <label htmlFor="assign-role">Assign role<span className="required">*</span></label>
        <select id="assign-role" value={employeeForm.role} onChange={handleEmployeeRole}>
          <option value="">Select role</option>
          <option value={RoleType.EMPLOYEE}>Employee</option>
          <option value={RoleType.MANAGER}>Manager</option>
        </select>
        {hasError && !employeeForm.role && <span className="error-message">Field is required</span>}

        {employeeForm.role === RoleType.EMPLOYEE && (
          <>
            <label htmlFor="manager-email">Assign Manager<span className="required">*</span></label>
            <ManagerDropDown managerData={managerData}
              initialManagerMail={initialEmployeeData?.managerEmail ?? ""}
              onSelect={(email) => setEmployeeForm((prev) => ({ ...prev, managerEmail: email }))}
            />
            {hasManagerError && !employeeForm.managerEmail && <span className="error-message">{ErrorMessages.EmployeeForm.INVALID_MANAGER}</span>}
          </>
        )}
        {errorMessage && <span className="error-message">{errorMessage}</span>}
      </form>
    </Modal>
  )
}

export default EmployeeForm;
