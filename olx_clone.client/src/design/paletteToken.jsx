const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                header: {
                    background: {
                        primary: '#313030',
                        secondary: '#fffcf8',
                    },
                    text:{
                        primary: '#fff',
                        secondary: '#adacac',
                        input: '#313030'
                    },
                    button:{
                        primary: '#ff9d00',
                        secondary: '#fffcf8',
                        search: '#313030',
                    }
                },
                body: {
                    background: '#fff',
                    mtext: {
                            primary: '#313030',
                            secondary: '#fffcf8',
                    },
                    button: {
                        background: {
                            primary: '#fffcf8',
                            secondary: '#ff9d00',
                            lightGradient: 'linear-gradient(45deg, #ffc66b  30%, #ff9d00 90%)',
                            darkGradient: 'linear-gradient(45deg, #727171  30%, #313030 90%)',
                        },
                        text: {
                            primary: '#313030',
                            secondary: '#fffcf8',
                        }
                    }
                },
                footer: {
                    background: '#313030',
                    text: {
                        primary: '#ff9d00',
                        secondary: '#fffcf8',
                        
                    },
                    button: {
                        background: 'linear-gradient(45deg, #ffc66b  30%, #ff9d00 90%)'
                    }
                },
            }
            : {
                header: {
                    background: {
                        primary: '#313030',
                        secondary: '#fffcf8',
                    },
                    text:{
                        primary: '#fff',
                        secondary: '#adacac',
                        input: '#313030'
                    },
                    button:{
                        primary: '#ff9d00',
                        secondary: '#fffcf8',
                        search: '#313030',
                    }
                },
                body: {
                    background: '#fff',
                    mtext: {
                        primary: '#313030',
                        secondary: '#fffcf8',
                    },
                    button: {
                        background: {
                            primary: '#fffcf8',
                            secondary: '#ff9d00',
                            lightGradient: 'linear-gradient(45deg, #ffc66b  30%, #ff9d00 90%)',
                            darkGradient: 'linear-gradient(45deg, #727171  30%, #313030 90%)',
                        },
                        text: {
                            primary: '#313030',
                            secondary: '#fffcf8',
                        }
                    }
                },
                footer: {
                    background: '#313030',
                    text: {
                        primary: '#ff9d00',
                        secondary: '#fffcf8',

                    },
                    button: {
                        background: 'linear-gradient(45deg, #ffc66b  30%, #ff9d00 90%)'
                    }
                },
            }),
    },
});

export default getDesignTokens;
