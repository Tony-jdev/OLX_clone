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
                },
            }),
    },
});

export default getDesignTokens;
