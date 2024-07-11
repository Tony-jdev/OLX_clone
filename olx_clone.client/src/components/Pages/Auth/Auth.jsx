import React, {useEffect, useState} from 'react';
import { Grid, TextField, Box, Modal } from '@mui/material';
import { useIntl, FormattedMessage } from 'react-intl';
import {
    FormField,
    ToggleContainer,
    ActiveToggleOption,
    InactiveToggleOption,
    AuthModalContainer,
} from './Styles';
import { useTheme } from "@mui/material/styles";
import SButton from "@/components/Tools/Button/SButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchLogInAsync,
    fetchRegistrationAsync,
    selectEmail, selectError,
    selectLoading, selectMessage,
    selectPassword, selectSuccess,
    setEmail, setPassword, setSuccess, setMessage, clearData, clearInput, clearInfo
} from "@/Storage/Redux/Slices/userAuthSlice.js";
import Text from "@/components/Tools/TextContainer/Text.jsx";
import {useAlert} from "@/providers/AlertsProvider.jsx";
import Icon from "@/components/Tools/IconContainer/Icon.jsx";
import {fetchUserDataAsync, selectToken, selectUser} from "@/Storage/Redux/Slices/userInfoSlice.js";
import {setToken} from "@/Helpers/recentViewsHelper.js";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

const AuthModal = ({ open, handleClose}) => {
    const theme = useTheme();
    const { colors } = theme.palette;
    
    const navigate = useNavigate();
    
    const [isRegister, setIsRegister] = useState(false);

    const dispatch = useDispatch();
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);
    const loading = useSelector(selectLoading);
    const success = useSelector(selectSuccess);
    const message = useSelector(selectMessage);
    const error = useSelector(selectError);
    
    const [errors, setErrors] = useState({});
    
    const intl = useIntl();

    const validateEmail = (email) => emailRegex.test(email);
    const validatePassword = (password) => passwordRegex.test(password);

    const { showAlert } = useAlert();

    const alertHandler = () => {
        if(message){
            showAlert(success ? 'success' : 'warning', message );
        }
        else if(error)
        {
            showAlert('error', error.message);
        }
    }
    
    const handleSubmit = () => {
        let validationErrors = {};
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
            setTimeout(() => {
                dispatch(clearData());
                handleClose();
            }, 2000);
        } else {
            dispatch(setSuccess(false));
        }
    };
    const handleOpenSnackbarRegIn = async (success) => {
        if (success) {
            setIsRegister(false);
            dispatch(clearInput());
        } else {
            dispatch(setSuccess(false));
            dispatch(setMessage('Registration Error'));
        }
    };

    const regHandler = async () => {
        const success = await dispatch(fetchRegistrationAsync());
        if(success)
        {
            setIsRegister(false);
        }
    }
    const logHandler = async () => {
        const success = await dispatch(fetchLogInAsync());
        if(success)
        {
            const user = await dispatch(fetchUserDataAsync());
            const token = localStorage.getItem('userToken');
            const decodedToken = jwtDecode(token);
            const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            setToken(user.userId, token);
            if(role === 'Administrator')
                navigate('/admin');
        }
    }

    useEffect(() => {
        alertHandler();
    }, [message, error]);
    
    return (
        <Modal open={open} onClose={handleClose}>
            <Grid container sx={{...AuthModalContainer, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: colors.background.secondary, padding: '20px', borderRadius: '20px', boxShadow: colors.boxShadow}}>
                <img src={'../../../../public/EVSE.png'} style={{width: '225px', height: '89px', marginTop: '-120px', marginBottom: '40px' }} alt={'error'}/>
                <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    <SButton
                        type='orangeRoundButton'
                        textType={'Title'}
                        Color={colors.text.primary}
                        text={<FormattedMessage id="auth.continueFacebook" />}
                        sl={{ background: colors.background.lightGradient}}
                        sr={{maxWidth: 370, maxHeight: 48, height: '100vh', width: '100%', marginBottom: '10px'}}
                    />
                    <SButton
                        type='orangeRoundButton'
                        textType={'Title'}
                        Color={colors.text.primary}
                        text={<FormattedMessage id="auth.continueGoogle" />}
                        sl={{ background: colors.background.lightGradient }}
                        sr={{maxWidth: 370, maxHeight: 48, height: '100vh', width: '100%', marginBottom: '10px'}}
                    />
                    <SButton
                        type='orangeRoundButton'
                        textType={'Title'}
                        Color={colors.text.primary}
                        text={<FormattedMessage id="auth.continueApple" />}
                        sl={{ background: colors.background.lightGradient}}
                        sr={{maxWidth: 370, maxHeight: 48, height: '100vh', width: '100%', marginBottom: '10px'}}
                    />
                    <Text type={'Body'} sr={{textAlign: 'center'}}>або</Text>
                    <Grid container sx={ToggleContainer}>
                        <SButton
                            action={() => setIsRegister(false)}
                            type={'transparentButton'}
                            Color={isRegister ? colors.text.revers : colors.text.orange}
                            text={<FormattedMessage id="auth.login" />}
                            sr={{...(isRegister ? InactiveToggleOption : ActiveToggleOption), 
                                borderColor: !isRegister ? colors.text.orange : '',
                                width: '50%',
                            }}
                        />
                        <SButton
                            action={() => setIsRegister(true)}
                            type={'transparentButton'}
                            Color={!isRegister ? colors.text.revers : colors.text.orange}
                            text={<FormattedMessage id="auth.register" />}
                            sr={{...(!isRegister ? InactiveToggleOption : ActiveToggleOption), 
                                borderColor: isRegister ? colors.text.orange : '',
                                width: '50%',
                        }}
                        />
                    </Grid>
                    <TextField
                        sx={{
                            ...FormField,
                            '& .MuiOutlinedInput-root': {
                                background: colors.background.input,
                                border: 'none',
                                borderRadius: '20px',
                                height: '48px',
                                width: '370px',
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                        label={<Text type={'Body'} color={colors.text.orange}><FormattedMessage id="auth.email" /></Text>}
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        sx={{...FormField,
                            '& .MuiOutlinedInput-root': {
                                background: colors.background.input,
                                border: 'none',
                                borderRadius: '20px',
                                height: '48px',
                                width: '370px',
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                        label={<Text type={'Body'} color={colors.text.orange}><FormattedMessage id="auth.password" /></Text>}
                        type="password"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputLabelProps={{ shrink: true }}
                    />
                    <SButton
                        type='orangeRoundButton'
                        textType={'Title'}
                        Color={colors.text.primary}
                        text={<FormattedMessage id={isRegister ? 'auth.registerButton' : 'auth.loginButton'} />}
                        sl={{ background: colors.background.darkGradient}}
                        sr={{maxWidth: 370, maxHeight: 48, height: '100vh', width: '100%', marginBottom: '10px', marginTop: '20px'}}
                        action={handleSubmit}
                    />
                </Box>
            </Grid>
        </Modal>
    );
};

export default AuthModal;
