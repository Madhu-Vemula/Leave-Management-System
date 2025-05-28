import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { CustomToastProps } from '../../Types';

/**
 * @component CustomToast
 * @description A customizable toast notification component that displays temporary alert messages.
 * 
 * @param {CustomToastProps} props - The component props
 * @param {string} props.message - The message to display in the toast
 * @param {ToastType} props.type - The type of toast (success, error, info, warning)
 * @param {number} [props.duration=3000] - Optional duration in milliseconds for how long the toast displays (default: 3000ms)
 * 
 * @returns {React.ReactElement} A ToastContainer element that manages toast notifications
 */
const CustomToast: React.FC<CustomToastProps> = ({
    message,
    type,
    duration = 3000
}: CustomToastProps) => {
    /**
     * @effect
     * @description Displays the toast notification whenever the message, type, or duration changes.
     * Uses the react-toastify library's toast function to show notifications.
     */
    useEffect(() => {
        toast[type](message);
    }, [type, message, duration]);

    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
};

export default CustomToast;