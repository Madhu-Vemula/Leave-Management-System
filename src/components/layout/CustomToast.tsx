import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastType } from '../../Types/enumTypes';

interface CustomToastProps {
    message: string,
    type: ToastType,
    duration?: number
}
const CustomToast: React.FC<CustomToastProps> = ({ message, type, duration = 3000 }: CustomToastProps) => { 
    console.log(type)
    useEffect(() => {
        toast[type](message, { autoClose: duration })
    }, [type, message, duration])

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
}
export default CustomToast