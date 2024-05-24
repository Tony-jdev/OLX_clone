const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                colors: {
                    background: {
                        primary: '#313030',
                        secondary: '#fffcf8',
                        orange: '#ff9d00',
                        def: '#fffcf8',
                        lightGradient: 'linear-gradient(45deg, #ffc66b  30%, #ff9d00 90%)',
                        darkGradient: 'linear-gradient(45deg, #727171  30%, #313030 90%)',
                    },
                    text:{
                        primary: '#fffcf8',
                        secondary: '#adacac',
                        orange: '#ff9d00',
                        input: '#313030',
                        revers: '#313030',
                    },
                    boxShadow: '0px 26px 11px rgba(49, 48, 48, 0.01), 0px 15px 9px rgba(49, 48, 48, 0.05), 0px 7px 7px rgba(49, 48, 48, 0.09), 0px 2px 4px rgba(49, 48, 48, 0.1)',
                },
            }
            : {
                colors: {
                    background: {
                        primary: '#313030',
                        secondary: '#313030',
                        orange: '#ff9d00',
                        def: '#fffcf8',
                        lightGradient: 'linear-gradient(45deg, #ffc66b  30%, #ff9d00 90%)',
                        darkGradient: 'linear-gradient(45deg, #727171  30%, #313030 90%)',
                    },
                    text:{
                        primary: '#fffcf8',
                        secondary: '#adacac',
                        orange: '#ff9d00',
                        input: '#313030',
                        revers: '#fffcf8',
                    },
                    boxShadow: '0px 26px 11px rgba(255, 200, 10, 0.05), 0px 15px 9px rgba(255, 200, 10, 0.1), 0px 7px 7px rgba(255, 200, 10, 0.15), 0px 2px 4px rgba(255, 200, 10, 0.25)',
                },
            }),
    },
});

export default getDesignTokens;
