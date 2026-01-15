import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { ToastContext } from '../contexts/toastContext';
export default function MySnackBar() {
    const { open, massageToast, toastColor } = useContext(ToastContext);

    return (
        <div>
            <Snackbar open={open}  autoHideDuration={6000}>
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%',backgroundColor: toastColor ? "green" : "red"  }}
                >
                    {massageToast}
                </Alert>
            </Snackbar>
        </div>
    );
}
