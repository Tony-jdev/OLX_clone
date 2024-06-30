import React, { createContext, useContext, useReducer } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const AlertContext = createContext();

const alertReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ALERT':
            return [...state, action.payload];
        case 'REMOVE_ALERT':
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
};

export const AlertProvider = ({ children }) => {
    const [alerts, dispatch] = useReducer(alertReducer, []);

    const showAlert = (type, message) => {
        const id = uuidv4();
        dispatch({ type: 'ADD_ALERT', payload: { id, type, message } });

        setTimeout(() => {
            dispatch({ type: 'REMOVE_ALERT', payload: id });
        }, 5000);

        if (alerts.length >= 3) {
            dispatch({ type: 'REMOVE_ALERT', payload: alerts[0].id });
        }
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alerts.map((alert) => (
                <Snackbar
                    key={alert.id}
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert severity={alert.type}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            ))}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    return useContext(AlertContext);
};
