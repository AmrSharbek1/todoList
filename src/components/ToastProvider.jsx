import * as React from 'react';
import MySnackBar from "../components/MySnackBar";
import { ToastContext } from '../contexts/toastContext';
export const ToastProvider = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [messageToast, setMessageToast] = React.useState("");
    const [toastColor, setToastColor] = React.useState(true);
    const showHideToast = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 2500);
    }
    return (
        <ToastContext.Provider value={{ toastColor, setToastColor, open, messageToast, setMessageToast, showHideToast }} >
            <MySnackBar />
            {children}
        </ToastContext.Provider>
    )
}