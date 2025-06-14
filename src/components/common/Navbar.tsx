import { NavLink, useNavigate } from "react-router-dom";
import palTechLogoNew from "../../assets/images/paltech_logo_new.svg";
import navCrossIcon from "../../assets/icons/cross-icon.png";
import navBarIcon from "../../assets/icons/nav-bar-icon.svg";
import { getUserMailFromSession, getUserRoleFromSession } from "../../utils/roleUtils";
import React, { useState } from "react";
import { RoleType } from "../../Types/enumTypes";
import { convertFirstLetterToUpperCase } from "../../utils/leaveUtils";
import { useGetEmployeeByMailQuery } from "../../services/employeeService";
import Loader from "./Loader";

/** 
 * @description
 * Renders the navigation bar component.
 *
 * Provides navigation links based on user role, toggles mobile view,
 * and handles user logout and default leave filter resetting.
 * @component Navbar
 * @returns {React.JSX.Element} The rendered Navbar component.
 */
const Navbar: React.FC = (): React.JSX.Element => { 
    const userRole = getUserRoleFromSession();
    const userEmail = getUserMailFromSession()
    const navigate = useNavigate();
    const [toggleNavBar, setToggleNavBar] = useState<boolean>(false);
    const { data: employeeData = [], isLoading: isLoadingEmployeeData } = useGetEmployeeByMailQuery(userEmail)
    /**
     * Logs out the current user.
     *
     * Clears user session data and navigates to the login page.
     *
     * @returns {void}
     */
    const logOutUser = (): void => {
        sessionStorage.removeItem('user');
        navigate("/");
    };

    /**
     * Resets leave type and status filters to default values.
     *
     * @returns {void}
     */

    /**
     * Toggles the visibility of the mobile navigation bar.
     * Also resets filters when toggling.
     *
     * @returns {void}
     */
    const hideNavBar = (): void => {
        setToggleNavBar((prev) => !prev);
    };
    if (isLoadingEmployeeData) return <Loader />

    return (
        <>
            <div className={`navbar-containter`}>
                <img src={palTechLogoNew} alt="company-logo-new" className="company-logo-new" />
                {!toggleNavBar && (
                    <img src={navBarIcon} alt="nav-bar" className="nav-bar-icon" onClick={hideNavBar} />
                )}
                {toggleNavBar && (
                    <img src={navCrossIcon} alt="nav-cross-icon" className="nav-bar-icon" onClick={hideNavBar} />
                )}
                <div className='nav-buttons-container'>
                    <NavLink to={`/${userRole}/home`} className="nav-link">Home</NavLink>
                    <NavLink to={`/${userRole}/leave-history`} className="nav-link">Leave History</NavLink>
                    {(userRole === RoleType.MANAGER || userRole === RoleType.HR) &&
                        <NavLink to={`/${userRole}/leave-requests`} className="nav-link">Leave Requests</NavLink>
                    }
                </div>
                <div className="nav-footer">
                    <div className="nav-profile">
                        {employeeData[0] && <span><b>Name: </b>{employeeData[0].name ?? 'Not Found'}</span>}
                        <span><b>Role: </b>{convertFirstLetterToUpperCase(userRole)}</span>
                    </div>
                    <button type="button" title="logout" className="button logout-btn" onClick={() => logOutUser()}>
                        Log out
                    </button>
                </div>
            </div>

            <div className={`mobile-navbar ${!toggleNavBar && 'hide-nav-bar'}`}>
                <NavLink to={`/${userRole}/home`} className="nav-link mobile-nav-link">Home</NavLink>
                <NavLink to={`/${userRole}/leave-history`} className="nav-link mobile-nav-link">Leave History</NavLink>
                {(userRole === RoleType.MANAGER || userRole === RoleType.HR) &&
                    <NavLink to={`/${userRole}/leave-requests`} className="nav-link mobile-nav-link">Leave Requests</NavLink>
                }
                <div className="nav-logout-container">
                    <button type="button" title="logout" className="button logout-btn" onClick={() => logOutUser()}>
                        Log out
                    </button>
                </div>
            </div>
        </>
    );
};

export default React.memo(Navbar)
