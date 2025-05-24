import { User } from "../Types";

/** 
 * @description
 * Retrieves the current user object from session storage.
 * @returns {User} The user object if available, otherwise a default user structure.
 */
export const getUserFromSession = (): User => {
    try {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) as User : { email: '', password: '', role: '' };
    } catch (error) {
        return { email: '', password: '', role: '' };
    }
};

/** 
 * @description
 * Retrieves the user's email from session storage.
 * @returns {string} The user's email or an empty string if unavailable.
 */
export const getUserMailFromSession = (): string => {
    return getUserFromSession().email || '';
};

/** 
 * @description
 * Retrieves the user's role from session storage.
 * @returns {string} The user's role or an empty string if unavailable.
 */
export const getUserRoleFromSession = (): string => {
    return getUserFromSession().role || '';
};
