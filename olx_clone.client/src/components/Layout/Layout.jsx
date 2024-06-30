import React, {Suspense, useMemo} from 'react';
import {Box, CircularProgress, Stack} from "@mui/material";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { IntlProvider } from 'react-intl';
import ColorModeContext from "@/contexts/ColorModeContext.jsx";
import messagesEn from '@/locales/messages_en.json';
import messagesUa from '@/locales/messages_ua.json';
import {useDispatch, useSelector} from "react-redux";
import {changeTheme, selectLocale, selectTheme} from "@/Storage/Redux/Slices/themeAndLocaleSlice.js";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import getDesignTokens from "@/design/paletteToken.jsx";
import OrangeProgress from "@/components/Tools/CentralProgress/OrangeProgress.jsx";
import {ChatProvider} from "@/providers/ChatProvider.jsx";
import {AuthProvider} from "@/providers/AuthProvider.jsx";
import {AddPostProvider} from "@/providers/AddPostModalProvider.jsx";
import {AlertProvider} from "@/providers/AlertsProvider.jsx";


const messages = {
    en: messagesEn,
    uk: messagesUa,
};
const Layout = (props) => {
    const dispatch = useDispatch();
    const locale = useSelector(selectLocale) ?? 'uk';
    const themeMode = useSelector(selectTheme) ?? 'light';

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                dispatch(changeTheme(themeMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [dispatch, themeMode]
    );

    const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <IntlProvider locale={locale} messages={messages[locale]} defoult>
                    <Suspense fallback={<OrangeProgress/>}>
                        <AlertProvider>
                        <AuthProvider>
                            <AddPostProvider>
                                <ChatProvider>
                                        <Stack>
                                            <Header/>
                                            <div style={{minHeight: '62.5vh'}}>
                                                {props.children}
                                            </div>
                                            <Footer/>
                                        </Stack>
                                </ChatProvider>
                            </AddPostProvider>
                        </AuthProvider>
                        </AlertProvider>
                    </Suspense>
                </IntlProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default Layout;