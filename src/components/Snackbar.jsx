import { IconButton, Snackbar, Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import useScreenSize from "../utils/useScreenSize";

const Feedback = ({ message, open, severity, setOpen }) => {
    const width = useScreenSize();

    const handleClose = () => {
        setOpen(false);
    };

    const anchorOriginProps = width > 800 ? { vertical: "top", horizontal: "right" } : { vertical: "bottom", horizontal: "center" }
    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="medium" />
            </IconButton>
        </>
    );

    return (
        <div>
            <Snackbar
                anchorOrigin={anchorOriginProps}
                open={open}
                autoHideDuration={2000}
                action={action}
                onClose={handleClose}

            >
                <Alert
                    variant="filled"
                    severity={severity}
                    sx={{ width: "100%", marginTop: "3rem", fontSize: "15px" }}
                    onClose={handleClose}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}


export default Feedback;