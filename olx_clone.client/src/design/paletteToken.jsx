const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                colors: {
                    types: {
                        success: '#4ABDA0',
                        warning: '#FF9D00',
                        error: '#CC0000',
                        default: '#7B58C3',
                        shadows: {
                            boxShadowSuccess: '0px 26px 11px rgba(74, 189, 160, 0.01), 0px 15px 9px rgba(74, 189, 160, 0.05), 0px 7px 7px rgba(74, 189, 160, 0.09), 0px 2px 4px rgba(74, 189, 160, 0.1)',
                            boxShadowWarning: '0px 26px 11px rgba(255, 157, 0, 0.01), 0px 15px 9px rgba(255, 157, 0, 0.05), 0px 7px 7px rgba(255, 157, 0, 0.09), 0px 2px 4px rgba(255, 157, 0, 0.1)',
                            boxShadowError: '0px 26px 11px rgba(204, 0, 0, 0.01), 0px 15px 9px rgba(204, 0, 0, 0.05), 0px 7px 7px rgba(204, 0, 0, 0.09), 0px 2px 4px rgba(204, 0, 0, 0.1)',
                            boxShadowDefault: '0px 26px 11px rgba(123, 88, 195, 0.01), 0px 15px 9px rgba(123, 88, 195, 0.05), 0px 7px 7px rgba(123, 88, 195, 0.09), 0px 2px 4px rgba(123, 88, 195, 0.1)',
                        },
                    },
                    background: {
                        primary: '#313030',
                        secondary: '#fffcf8',
                        orange: '#ff9d00',
                        def: '#fffcf8',
                        input: '#ffebcc',
                        lightGradient: 'linear-gradient(45deg, #ffc66b  30%, #ff9d00 90%)',
                        darkGradient: 'linear-gradient(45deg, #727171  30%, #313030 90%)',
                    },
                    text:{
                        primary: '#fffcf8',
                        secondary: '#adacac',
                        orange: '#ff9d00',
                        input: '#313030',
                        revers: '#313030',
                        unrevers: '#fffcf8',
                    },
                    boxShadow: '0px 26px 11px rgba(49, 48, 48, 0.01), 0px 15px 9px rgba(49, 48, 48, 0.05), 0px 7px 7px rgba(49, 48, 48, 0.09), 0px 2px 4px rgba(49, 48, 48, 0.1)',
                    white: '#fff',
                    black: '#000',
                },
            }
            : {
                colors: {
                    types: {
                        success: '#4ABDA0',
                        warning: '#FF9D00',
                        error: '#CC0000',
                        default: '#7B58C3',
                        shadows: {
                            boxShadowSuccess: '0px 26px 11px rgba(74, 189, 160, 0.01), 0px 15px 9px rgba(74, 189, 160, 0.05), 0px 7px 7px rgba(74, 189, 160, 0.09), 0px 2px 4px rgba(74, 189, 160, 0.1)',
                            boxShadowWarning: '0px 26px 11px rgba(255, 157, 0, 0.01), 0px 15px 9px rgba(255, 157, 0, 0.05), 0px 7px 7px rgba(255, 157, 0, 0.09), 0px 2px 4px rgba(255, 157, 0, 0.1)',
                            boxShadowError: '0px 26px 11px rgba(204, 0, 0, 0.01), 0px 15px 9px rgba(204, 0, 0, 0.05), 0px 7px 7px rgba(204, 0, 0, 0.09), 0px 2px 4px rgba(204, 0, 0, 0.1)',
                            boxShadowDefault: '0px 26px 11px rgba(123, 88, 195, 0.01), 0px 15px 9px rgba(123, 88, 195, 0.05), 0px 7px 7px rgba(123, 88, 195, 0.09), 0px 2px 4px rgba(123, 88, 195, 0.1)',
                        },
                    },
                    background: {
                        primary: '#313030',
                        secondary: '#313030',
                        orange: '#ff9d00',
                        def: '#fffcf8',
                        input: '#ffebcc',
                        lightGradient: 'linear-gradient(45deg, #ffc66b  30%, #ff9d00 90%)',
                        darkGradient: 'linear-gradient(45deg, #727171  30%, #313030 90%)',
                    },
                    text:{
                        primary: '#fffcf8',
                        secondary: '#adacac',
                        orange: '#ff9d00',
                        input: '#313030',
                        revers: '#fffcf8',
                        unrevers: '#313030',
                    },
                    boxShadow: '0px 26px 11px rgba(255, 200, 10, 0.05), 0px 15px 9px rgba(255, 200, 10, 0.1), 0px 7px 7px rgba(255, 200, 10, 0.15), 0px 2px 4px rgba(255, 200, 10, 0.25)',
                    white: '#fff',
                    black: '#000',
                },
            }),
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme)=>`
                * {
                    transition: all 0.3s ease-in-out;
                }
                .css-6em28x {
                    background: none !important;
                }
                .css-54h2x {
                    background: none !important;
                }
                input:-webkit-autofill {
                  box-shadow: 0 0 0 1000px ${theme.palette.colors.background.revers} inset !important;
                  -webkit-text-fill-color: ${theme.palette.colors.text.primary} !important;
                  background-color: ${theme.palette.colors.background.input} !important;
                }
                input:-webkit-autofill:focus {
                  box-shadow: 0 0 0 1000px ${theme.palette.colors.background.input} inset !important;
                  -webkit-text-fill-color: ${theme.palette.colors.text.secondary} !important;
                  background-color: ${theme.palette.colors.background.input} !important;
                }
                input:-webkit-autofill:hover {
                  box-shadow: 0 0 0 1000px ${theme.palette.colors.background.input} inset !important;
                  -webkit-text-fill-color: ${theme.palette.colors.text.secondary} !important;
                  background-color: ${theme.palette.colors.background.input} !important;
                }
            `,
        },
    },
});

export default getDesignTokens;
