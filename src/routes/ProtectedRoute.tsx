import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../Types";
import { getUserFromSession } from "../utils/roleUtils";
import UnAuthorized from "../pages/UnAuthorized";
/**
 * @function ProtectedRoute
 * @description Protects a route based on the user's role stored in session storage.
 * @param {ProtectedRouteProps} param0 - Contains children components and the required role for access.
 * @returns {React.JSX.Element}
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }): React.JSX.Element => {
    const user = getUserFromSession()
    if (!user.email) return <Navigate to="/" />;

    if (user.role !== role) return <UnAuthorized />;
    return <>{children}</>;
};

export default ProtectedRoute;
