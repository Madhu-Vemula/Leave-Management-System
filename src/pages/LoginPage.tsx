import { type ChangeEvent, useEffect, useState } from "react";
import palTechLogo from "../assets/images/paltech_logo.png";
import palTechCover from "../assets/images/paltech_cover.jpeg";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import type { LoginForm } from "../Types";
import { HrDetails, RoleType } from "../Types/enumTypes";
import { ErrorMessages } from "../utils/errorUtils";
import { getUserFromSession } from "../utils/roleUtils";

/**
 * @component Login
 * @description Renders the login form for user authentication. Handles form submission, validation, and redirects based on user roles.
 * @returns {React.JSX.Element} A JSX element rendering the login interface.
 */
const LoginPage: React.FC = (): React.JSX.Element => {
    const navigate = useNavigate()
    useEffect(() => {
        const user = getUserFromSession()
        if (user.role) {
            navigate(`/${user.role}/home`)
        }
    }, [navigate])

    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: "",
        password: ""
    });
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { loginUser } = useAuth();

    /**
     * @function handleOnSubmit
     * @description Handles login form submission. Validates user input and authenticates the user via `loginUser`.
     * @param {ChangeEvent<HTMLFormElement>} event - The form submit event.
     * @returns {Promise<void>}
     */
    const handleOnSubmit = async (event: ChangeEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (!loginForm.email || !loginForm.password) {
            setHasError(true);
            return;
        }

        const user = { email: loginForm.email, password: loginForm.password };

        if (loginForm.email === HrDetails.MAIL && loginForm.password === HrDetails.PASSWORD) {
            const validUser = JSON.stringify({ email: loginForm.email, role: RoleType.HR });
            sessionStorage.setItem('user', validUser);
            navigate(`/${RoleType.HR}`);
            return;
        }

        try {
            const response = await loginUser(user).unwrap();
            const responseUser = response[0];
            if (responseUser) {
                if (responseUser.password !== loginForm.password) {
                    setErrorMessage(ErrorMessages.LoginForm.INVALID_PASSWORD);
                    return;
                }
                const validUser = JSON.stringify({ email: loginForm.email, role: responseUser.role });
                sessionStorage.setItem('user', validUser);
                navigate(`/${responseUser.role}`);
            } else {
                setErrorMessage(ErrorMessages.LoginForm.INVALID_USER);
            }
        } catch (error) {
            alert(ErrorMessages.CatchError + { error })
        }
    };

    /**
     * @function handleEmailChange
     * @description Updates the email field in the login form state.
     * @param {ChangeEvent<HTMLInputElement>} event - The input change event.
     */
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const emailValue = event.target.value;
        setLoginForm({ ...loginForm, email: emailValue });
    };

    /**
     * @function handlePasswordChange
     * @description Updates the password field in the login form state.
     * @param {ChangeEvent<HTMLInputElement>} event - The input change event.
     */
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const passwordValue = event.target.value;
        setLoginForm({ ...loginForm, password: passwordValue });
    };

    return (
        <div className="login-container">
            <img src={palTechCover} alt="company-cover-image" className="company-cover-image" />
            <div className="form-wrapper">
                <form onSubmit={handleOnSubmit} className="form-container login-form">
                    <div className="form-header">
                        <img src={palTechLogo} alt="company-logo" className="company-logo" />
                        <h1>Login</h1>
                    </div>
                    <label htmlFor="email">Email<span className="required">*</span></label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={loginForm.email}
                        onChange={handleEmailChange}
                        placeholder="Enter your mail"
                    />
                    {hasError && !loginForm.email && (
                        <span className="error-message">Field is required</span>
                    )}

                    <label htmlFor="password">Password<span className="required">*</span></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginForm.password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                    />
                    {hasError && !loginForm.password && (
                        <span className="error-message">Field is required</span>
                    )}

                    <button type="submit" className="button submit-btn">Submit</button>
                    {errorMessage && <span className="error-message">{errorMessage}</span>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
