import React, {useEffect, useState} from 'react';
import {Grid, TextField, Typography, Box, Collapse, Snackbar, Alert} from '@mui/material';
import { useIntl, FormattedMessage } from 'react-intl';
import {
    AuthContainer,
    FormContainer,
    FormField,
    FormButton,
    ToggleContainer,
    ActiveToggleOption,
    InactiveToggleOption,
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

import {useNavigate} from "react-router-dom";
import SAlert from "@/components/Tools/Alert/SAlert.jsx";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const nameSurnameRegex = /^[A-Za-z]{3,}$/; 

const Auth = () => {
    const theme = useTheme();
    const { colors } = theme.palette;

    const [isRegister, setIsRegister] = useState(false);
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const name = useSelector(selectName);
    const surname = useSelector(selectSurname);
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const loading = useSelector(selectLoading);
    const success = useSelector(selectSuccess);
    const message = useSelector(selectMessage);
    const error  = useSelector(selectError);

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
            console.log({ name, surname, email, password });
            isRegister ? regHandler() : logHandler();
        }
    };
    
    const handleOpenSnackbarLogIn = async (success) => {
        if (success) {
            setOpenSnackbar(true);
            setTimeout(() => {
                navigate('/user/Settings');
                dispatch(clearData());
            }, 2000);
        }
        else {
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
        }
        else {
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
        <Grid container sx={AuthContainer}>
            <Grid item xs={4} md={5} sm={6} style={FormContainer} sx={{background: colors.background.secondary, boxShadow: colors.boxShadow}}>
                <Grid container sx={ToggleContainer}>
                    <Typography
                        onClick={() => setIsRegister(false)}
                        sx={isRegister ? {...InactiveToggleOption, color: colors.text.revers, borderColor: colors.text.orange} : {...ActiveToggleOption, color: colors.text.orange}}
                        style={{borderRadius: '20px 0px 40px 0px', width: '50%', paddingLeft: '2px'}}
                    >
                        <FormattedMessage id="auth.login" />
                    </Typography>
                    <Typography
                        onClick={() => setIsRegister(true)}
                        sx={!isRegister ? {...InactiveToggleOption, color: colors.text.revers, borderColor: colors.text.orange} : {...ActiveToggleOption, color: colors.text.orange}}
                        style={{borderRadius: '40px 0px 20px 0px', width: '50%', paddingRight: '2px'}}
                    >
                        <FormattedMessage id="auth.register" />
                    </Typography>
                </Grid>
                <Box>
                    <Collapse in={isRegister} timeout={{enter: 1000, exit: 1000}}>
                        <TextField
                            sx={{...FormField,  '& .MuiInputLabel-root': {
                                    color: colors.text.orange
                                }
                            }}
                            label={<FormattedMessage id="auth.name" />}
                            value={name}
                            onChange={(e) => dispatch(setName(e.target.value))}
                            error={!!errors.name}
                            helperText={errors.name}
                            InputLabelProps={{
                                shrink: true, 
                            }}
                        />
                        <TextField
                            sx={{...FormField,  '& .MuiInputLabel-root': {
                                    color: colors.text.orange
                                }
                            }}
                            label={<FormattedMessage id="auth.surname" />}
                            value={surname}
                            onChange={(e) => dispatch(setSurname(e.target.value))}
                            error={!!errors.surname}
                            helperText={errors.surname}
                            InputLabelProps={{
                                shrink: true, 
                            }}
                        />
                    </Collapse>
                    <TextField
                        sx={{...FormField,  '& .MuiInputLabel-root': {
                                color: colors.text.orange
                            }
                        }}
                        label={<FormattedMessage id="auth.email" />}
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputLabelProps={{
                            shrink: true, 
                        }}
                    />
                    <TextField
                        sx={{...FormField,  '& .MuiInputLabel-root': {
                                color: colors.text.orange
                            }
                        }}
                        label={<FormattedMessage id="auth.password" />}
                        type="password"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <SButton
                    type='whiteOutlined'
                    text={<FormattedMessage id={isRegister ? 'auth.registerButton' : 'auth.loginButton'} />}
                    sl={{width: '100%', color: colors.text.revers}}
                    action={handleSubmit}
                />
            </Grid>
            <SAlert
                message={message}
                autoHideTime={2000}
                openS={openSnackbar}
                setOpenS={setOpenSnackbar}
                severity={success ? 'success' : 'error'}
            />
        </Grid>
    );
};

export default Auth;
