import { useLazyGetEmployeeByMailQuery } from "../services/employeeService";
import { User } from "../Types";

/**
 * Custom authentication hook for handling user login
 * @module useAuth
 * @returns {Object} An object containing the loginUser function
 * @property {Function} loginUser - Function to authenticate a user by email
 */
const useAuth = () => {
    const [triggerAuth] = useLazyGetEmployeeByMailQuery();

    /**
     * Authenticates a user by their email address
     * @function loginUser
     * @param {User} user - The user object containing email to authenticate
     * @returns {Promise} A promise that resolves with the authentication result
     */
    const loginUser = (user: User) => {
        return triggerAuth(user.email);
    };

    return { loginUser };
};

export default useAuth;