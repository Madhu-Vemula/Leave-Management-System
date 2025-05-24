/**
 * A collection of static error message groups used throughout the application.
 */
export class ErrorMessages {
    /**
     * Error messages related to the login form.
     */
    static LoginForm = {
        /** User not found with the provided email. */
        INVALID_USER: "User not existed with given mail!",
        /** Incorrect password entered. */
        INVALID_PASSWORD: "Your password was incorrect"
    }

    /**
     * Generic catch error message.
     */
    static CatchError = 'Error Message'

    /**
     * Error messages related to the employee form.
     */
    static EmployeeForm = {
        /** Employee ID is already taken. */
        INVALID_ID: "Employee Id already Taken",
        /** Password length is less than the minimum required length. */
        INVALID_PASSWORD_LENGTH: "Password minimum length is 6",
        /** Employee email is already registered. */
        INVALID_EMAIL: 'Employee email already taken',
        /** Email must include the domain "@pal.tech". */
        INVALID_DOMAIN: "Include domain ,include @pal.tech ",  
        
        INVALID_MANAGER:"Manager not found!", 
    }

    /**
     * Error messages related to the leave form.
     */
    static LeaveForm = {
        /** The provided date format is invalid. */
        INVALID_DATE_FORMAT: "Invalid date format",
        /** Not enough paid leaves are available. */
        NO_ENOUGH_PAID_LEAVES: "Your paid leaves are not enough!",
        /** Leave form update failed. */
        FORM_NOT_UPDATED: "Form not updated, please try again!",
        /** End date must be after start date. */
        END_DATE_INVALID: "End date should be greater than start date.",
        /** Duplicate leave application detected. */
        DUPLICATE_LEAVE: "You have already applied for leave on these dates"
    }
}
