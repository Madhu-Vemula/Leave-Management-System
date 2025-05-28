import type { DashboardBlockProps } from "../../Types"

const DashboardBlock: React.FC<DashboardBlockProps> = ({ title, children }) => {
    return (
        <div className="dashboard-block-container">
            <h1>{title}</h1>
            {children}
        </div>
    )
}

export default DashboardBlock