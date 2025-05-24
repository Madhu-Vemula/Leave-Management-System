import DonutChart from "../../components/layout/DoNutChart";
import { LeaveBalanceCardProps } from "../../Types";
import { LeaveBalance } from "../../Types/enumTypes";
import { calculateLeaveTypes } from "../../utils/leaveUtils";

/**
 * @component LeaveBalanceCard
 * @description Displays a visual representation of an employee's leave balance,
 * including a donut chart of paid and unpaid leaves. Shows a loader if employee data is not available.
 *
 * @param {LeaveBalanceCardProps} props - Props containing leave and employee data.
 * @param {Array} props.leaveData - An array of leave records associated with the employee.
 * @param {Employee} props.employeeData - The employee object containing the leave balance and personal data.
 *
 * @returns {React.JSX.Element} A component showing leave statistics and visual representation.
 */
const LeaveBalanceCard: React.FC<LeaveBalanceCardProps> = (props: LeaveBalanceCardProps): React.JSX.Element => {
    const { leaveData } = props;
    const leaveTypes = calculateLeaveTypes(leaveData);

    const { paidLeaves, unPaidLeaves } = leaveTypes;
    console.log(leaveTypes)
    const donutChartData = [
        { name: "Paid", value: paidLeaves, color: "#eb6666" },
        { name: "Unpaid", value: unPaidLeaves, color: "#ffd06e" },
    ]

    return (
        <div className="leave-balance-card">
            <h2>Total leave balance: {LeaveBalance.BALANCE - leaveTypes.paidLeaves}</h2>
            <div className="donut-container">
                <div className="donut">
                    <DonutChart data={donutChartData} />
                </div>
                <div>
                    <button type="button" className="button paid-btn">
                        Paid {leaveTypes.paidLeaves}/20
                    </button>
                    <button type="button" className="button unpaid-btn">
                        Unpaid {leaveTypes.unPaidLeaves}/&#8734;
                    </button>
                </div>
            </div>
        </div>
    )
};

export default LeaveBalanceCard;
