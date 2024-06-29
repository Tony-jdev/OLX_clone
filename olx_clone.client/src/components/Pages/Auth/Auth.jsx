import React, { useState } from 'react';
import { Grid, TextField, Typography, Box, Collapse, Modal } from '@mui/material';
import { useIntl, FormattedMessage } from 'react-intl';
import {
    AuthContainer,
    FormContainer,
    FormField,
    ToggleContainer,
    ActiveToggleOption,
    InactiveToggleOption,
    AuthModalContainer,
    SocialButton,
} from './Styles';
import { useTheme } from "@mui/material/styles";
import SButton from "@/components/Tools/Button/SButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchLogInAsync,
    fetchRegistrationAsync,
    selectEmail, selectError,
    selectLoading, selectMessage,
    selectName,
    selectPassword, selectSuccess,
    selectSurname, setEmail, setName, setPassword, setSurname, setSuccess, setMessage, clearData, clearInput
} from "@/Storage/Redux/Slices/userAuthSlice.js";
import SAlert from "@/components/Tools/Alert/SAlert.jsx";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const nameSurnameRegex = /^[A-Za-z]{3,}$/;

const AuthModal = ({ open, handleClose }) => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const [isRegister, setIsRegister] = useState(false);

    const dispatch = useDispatch();
    const name = useSelector(selectName);
    const surname = useSelector(selectSurname);
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const loading = useSelector(selectLoading);
    const success = useSelector(selectSuccess);
    const message = useSelector(selectMessage);
    const error = useSelector(selectError);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [errors, setErrors] = useState({});

    const intl = useIntl();

    const validateEmail = (email) => emailRegex.test(email);
    const validatePassword = (password) => passwordRegex.test(password);
    const validateNameSurname = (value) => nameSurnameRegex.test(value);

    const handleSubmit = () => {
        let validationErrors = {};
        if (isRegister && (!name || !validateNameSurname(name))) {
            validationErrors.name = intl.formatMessage({ id: 'auth.invalidName' });
        }
        if (isRegister && (!surname || !validateNameSurname(surname))) {
            validationErrors.surname = intl.formatMessage({ id: 'auth.invalidSurname' });
        }
        if (!email || !validateEmail(email)) {
            validationErrors.email = intl.formatMessage({ id: 'auth.invalidEmail' });
        }
        if (!password || !validatePassword(password)) {
            validationErrors.password = intl.formatMessage({ id: 'auth.invalidPassword' });
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            isRegister ? regHandler() : logHandler();
        }
    };

    const handleOpenSnackbarLogIn = async (success) => {
        if (success) {
            setOpenSnackbar(true);
            setTimeout(() => {
                dispatch(clearData());
                handleClose();
            }, 2000);
        } else {
            dispatch(setSuccess(false));
            dispatch(setMessage('Input error data'));
            setOpenSnackbar(true);
        }
    };
    const handleOpenSnackbarRegIn = async (success) => {
        if (success) {
            setOpenSnackbar(true);
            setIsRegister(false);
            dispatch(clearInput());
        } else {
            dispatch(setSuccess(false));
            dispatch(setMessage('Registration Error'));
            setOpenSnackbar(true);
        }
    };

    const regHandler = async () => {
        const success = await dispatch(fetchRegistrationAsync());
        await handleOpenSnackbarRegIn(success);
    }
    const logHandler = async () => {
        const success = await dispatch(fetchLogInAsync());
        await handleOpenSnackbarLogIn(success);
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Grid container sx={AuthModalContainer}>
                <Box style={{ width: '100%' }}>
                    <SButton
                        type='socialButton'
                        text={<FormattedMessage id="auth.continueFacebook" />}
                        sl={{ background: colors.facebook, marginBottom: '10px' }}
                    />
                    <SButton
                        type='socialButton'
                        text={<FormattedMessage id="auth.continueGoogle" />}
                        sl={{ background: colors.google, marginBottom: '10px' }}
                    />
                    <SButton
                        type='socialButton'
                        text={<FormattedMessage id="auth.continueApple" />}
                        sl={{ background: colors.apple, marginBottom: '10px' }}
                    />
                    <Typography variant="h6" sx={{ textAlign: 'center', margin: '20px 0' }}>або</Typography>
                    <Grid container sx={ToggleContainer}>
                        <Typography
                            onClick={() => setIsRegister(false)}
                            sx={isRegister ? {...InactiveToggleOption, color: colors.text.revers, borderColor: colors.text.orange} : {...ActiveToggleOption, color: colors.text.orange}}
                        >
                            <FormattedMessage id="auth.login" />
                        </Typography>
                        <Typography
                            onClick={() => setIsRegister(true)}
                            sx={!isRegister ? {...InactiveToggleOption, color: colors.text.revers, borderColor: colors.text.orange} : {...ActiveToggleOption, color: colors.text.orange}}
                        >
                            <FormattedMessage id="auth.register" />
                        </Typography>
                    </Grid>
                    <Collapse in={isRegister} timeout={{ enter: 1000, exit: 1000 }}>
                        <TextField
                            sx={{...FormField, '& .MuiInputLabel-root': { color: colors.text.orange } }}
                            label={<FormattedMessage id="auth.name" />}
                            value={name}
                            onChange={(e) => dispatch(setName(e.target.value))}
                            error={!!errors.name}
                            helperText={errors.name}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            sx={{...FormField, '& .MuiInputLabel-root': { color: colors.text.orange } }}
                            label={<FormattedMessage id="auth.surname" />}
                            value={surname}
                            onChange={(e) => dispatch(setSurname(e.target.value))}
                            error={!!errors.surname}
                            helperText={errors.surname}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Collapse>
                    <TextField
                        sx={{...FormField, '& .MuiInputLabel-root': { color: colors.text.orange } }}
                        label={<FormattedMessage id="auth.email" />}
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        sx={{...FormField, '& .MuiInputLabel-root': { color: colors.text.orange } }}
                        label={<FormattedMessage id="auth.password" />}
                        type="password"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Typography sx={{ textAlign: 'right', marginBottom: '10px' }}>
                        <FormattedMessage id="auth.forgotPassword" />
                    </Typography>
                    <SButton
                        type='whiteOutlined'
                        textType={'Title'}
                        text={<FormattedMessage id={isRegister ? 'auth.registerButton' : 'auth.loginButton'} />}
                        sl={{ width: '100%', color: colors.text.revers }}
                        action={handleSubmit}
                    />
                </Box>
                <SAlert
                    message={message}
                    autoHideTime={2000}
                    openS={openSnackbar}
                    setOpenS={setOpenSnackbar}
                    severity={success ? 'success' : 'error'}
                />
            </Grid>
        </Modal>
    );
};

export default AuthModal;
