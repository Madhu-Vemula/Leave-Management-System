import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";
import { Route, Routes } from "react-router-dom";
import { protectedRoutes } from "./routeConfig";

/**
 * @function AppRoutes
 * @description Defines all application routes with role-based protection and corresponding components.
 * @returns {React.JSX.Element}
 */

const AppRoutes: React.FC = (): React.JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} /> 
            
            {protectedRoutes.map(({ path, role, routes }) => (
                <Route path={`/${path}`} key={path}>
                    {routes.map(({ path: subPath, element }) => (
                        <Route
                            key={subPath}
                            path={subPath}
                            element={
                                <ProtectedRoute role={role}>
                                    {element}
                                </ProtectedRoute>
                            }
                        />
                    ))}
                </Route>
            ))}
            
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
export default AppRoutes;
