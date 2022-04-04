// import React, { useState } from 'react';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert, { PaperProps } from '@material-ui/core/';
//
// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//     props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
//
// export function ErrorSnackbar() {
//     const [open, setOpen] = useState(true);
//
//     const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setOpen(false);
//     };
//
//     return (
//         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//             <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
//                 Error message 😠
//             </Alert>
//         </Snackbar>
//     );
// }
