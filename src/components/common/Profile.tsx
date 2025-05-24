import { ProfileProps } from "../../Types";
import palTechProfile from "../../assets/images/paltech-profile.jpg";
import { convertFirstLetterToUpperCase } from "../../utils/leaveUtils";

/** 
 * @description
 * Displays the profile information of an employee.
 *
 * If `employeeData` is not available, shows a loading spinner.
 * Otherwise, renders profile details including employee ID, name, email, role, and reporting manager.
 * @component Profile
 * @param {ProfileProps} props - The props object containing employee data.
 * @returns {React.JSX.Element} The rendered profile component.
 */
const Profile: React.FC<ProfileProps> = ({ employeeData }: ProfileProps): React.JSX.Element => {
    return (
        <div className="profile-containter">
            <h2>My profile</h2>
            <div className="profile-header">
                <img src={palTechProfile} alt="paltech-profile" className="company-profile-image" />
                <div>
                    <p><b>Employee Id: </b><span>{employeeData.empId}</span></p>
                    <p><b>Employee Name: </b><span>{employeeData.name}</span></p>
                    <p><b>Employee Email: </b>{employeeData.email}</p>
                    <p><b>Employee Role: </b>{convertFirstLetterToUpperCase(employeeData.role)}</p>
                    <p><b>Reporting To: </b>{employeeData.managerEmail}</p>
                </div>
            </div>
        </div>
    )
};

export default Profile;
