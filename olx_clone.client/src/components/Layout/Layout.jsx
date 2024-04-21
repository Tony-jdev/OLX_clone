import React, {useState} from 'react';
import {Stack} from "@mui/material";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { IntlProvider } from 'react-intl';
import messagesEn from '@/locales/messages_en.json';
import messagesUa from '@/locales/messages_ua.json';

const messages = {
    en: messagesEn,
    ua: messagesUa,
};
const Layout = (props) => {
    const [locale, setLocale] = useState('ua');
    
    return (
        <IntlProvider locale={locale} messages={messages[locale]} defoult>
            <Stack>
                <Header changeLanguage={setLocale} language={locale}/>
                {props.children}
                <Footer/>
            </Stack>
        </IntlProvider>
    );
}

export default Layout;