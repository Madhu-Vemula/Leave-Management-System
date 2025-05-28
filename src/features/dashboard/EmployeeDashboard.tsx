import Navbar from "../../components/common/Navbar";
import { useGetLeaveByUserQuery } from "../../services/leaveService";
import LeaveBalanceCard from "../../components/common/LeaveBalanceCard";
import Profile from "../../components/common/Profile";
import { useGetEmployeeByMailQuery } from "../../services/employeeService";
import { getUserMailFromSession, getUserRoleFromSession } from "../../utils/roleUtils";
import Loader from "../../components/common/Loader";
import { convertFirstLetterToUpperCase } from "../../utils/leaveUtils"
import DashboardBlock from "../../components/layout/DashboardBlock";

/**
 * @component EmployeeDashboard
 * @description Renders the employee dashboard page including profile info, leave balance, and leave history.
 * Handles conditional UI rendering based on loading states, route, and popup visibility.
 * @returns {React.JSX.Element} JSX element representing the dashboard.
 */
const EmployeeDashboard: React.FC = (): React.JSX.Element => {
    const userEmail = getUserMailFromSession();
    const userRole = getUserRoleFromSession()
    const { data: leaveData = [], isLoading: isLoadingLeaveData } = useGetLeaveByUserQuery(userEmail);
    const { data: employeeData = [], isLoading: isLoadingEmployeeData } = useGetEmployeeByMailQuery(userEmail);

    if (isLoadingEmployeeData || isLoadingLeaveData || employeeData.length === 0) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <DashboardBlock
                title={`${convertFirstLetterToUpperCase(userRole)} Dashboard`}
            >
                <div className="employee-header">
                    <Profile employeeData={employeeData[0]} />
                    <LeaveBalanceCard leaveData={leaveData} />
                </div>
            </DashboardBlock>
        </>
    );
};

export default EmployeeDashboard;
