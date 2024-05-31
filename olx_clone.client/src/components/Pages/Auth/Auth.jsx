import React, { useState } from 'react';
import { Grid, TextField, Typography, Box, Collapse } from '@mui/material';
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
    selectLoading,
    selectName,
    selectPassword, selectSuccess,
    selectSurname, setEmail, setName, setPassword, setSurname
} from "@/Storage/Redux/Slices/userAuthSlice.js";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[A-Za-z\d]{8,}$/;
const nameSurnameRegex = /^[A-Za-z]{3,}$/; // Регекс для імені та прізвища

const Auth = () => {
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
    const error  = useSelector(selectError);

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

    const regHandler = () => {
        dispatch(fetchRegistrationAsync());
    }
    const logHandler = () => {
        dispatch(fetchLogInAsync());
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
                            sx={FormField}
                            label={<FormattedMessage id="auth.name" />}
                            value={name}
                            onChange={(e) => dispatch(setName(e.target.value))}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            sx={FormField}
                            label={<FormattedMessage id="auth.surname" />}
                            value={surname}
                            onChange={(e) => dispatch(setSurname(e.target.value))}
                            error={!!errors.surname}
                            helperText={errors.surname}
                        />
                    </Collapse>
                    <TextField
                        sx={FormField}
                        label={<FormattedMessage id="auth.email" />}
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        sx={FormField}
                        label={<FormattedMessage id="auth.password" />}
                        type="password"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </Box>
                <SButton
                    type='whiteOutlined'
                    text={<FormattedMessage id={isRegister ? 'auth.registerButton' : 'auth.loginButton'} />}
                    sl={{width: '100%', color: colors.text.revers}}
                    action={handleSubmit}
                />
            </Grid>
        </Grid>
    );
};

export default Auth;
