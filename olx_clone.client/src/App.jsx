import './App.css';
import * as React from 'react';
import { useMemo, useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';
import Layout from './components/Layout/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ColorModeContext from "@/contexts/ColorModeContext.jsx";
import getDesignTokens from "@/design/paletteToken.jsx";

function App() {
    const [mode, setMode] = useState('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
    
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Layout>
                        <Routes>
                            {AppRoutes.map((route, index) => {
                                const { element, ...rest } = route;
                                return <Route key={index} {...rest} element={element} />;
                            })}
                        </Routes>
                    </Layout>
                </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;