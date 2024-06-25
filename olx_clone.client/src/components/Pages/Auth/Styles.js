export const AuthContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    minWidth: '335px',
};

export const FormContainer = {
    padding: '30px',
    borderRadius: '15px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
};

export const ToggleContainer = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
};

export const ToggleOption = {
    cursor: 'pointer',
};

export const ActiveToggleOption = {
    ...ToggleOption,
    fontWeight: '700',
    fontSize: '22px',
    color: '#ff9800',
};

export const InactiveToggleOption = {
    ...ToggleOption,
    fontWeight: '500',
    fontSize: '15px',
    color: '#000000',
    border: '1px solid #000000',
    padding: '5px 15px',
};

export const FormField = {
    marginBottom: '15px',
    width: '100%',
    
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
    },
    '& .MuiInputLabel-root': {
        fontFamily: 'Roboto',
        width: '100%',
        textAlign: 'start',
    },
};

export const FormButton = {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '16px',
    marginTop: '20px',
};
