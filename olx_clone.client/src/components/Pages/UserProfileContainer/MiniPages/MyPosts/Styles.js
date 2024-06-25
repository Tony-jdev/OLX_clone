export const AuthContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
};

export const FormContainer = {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    maxWidth: '400px',
    width: '100%'
};

export const FormField = {
    marginBottom: '20px',
    width: '100%'
};

export const FormButton = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#ff9d00',
    color: '#fff',
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: '#e68a00'
    }
};

export const ToggleContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
};

export const ActiveToggleOption = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#ff9d00',
    cursor: 'pointer'
};

export const InactiveToggleOption = {
    fontWeight: 'normal',
    fontSize: '16px',
    color: '#999',
    cursor: 'pointer'
};

export const TabsContainerStyles = {
    minHeight: '24px',
    height: '24px',
    marginTop: '0px',
    marginBottom: '20px',
    
    '& .MuiTab-root': {
        minHeight: '24px',
        height: '24px',
        '&:focus': {
            outline: 'none',
        },
        '&:focus-visible': {
            outline: 'none',
        },
        '&.Mui-selected': {
            color: 'inherit',
        }
    },
};
