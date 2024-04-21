import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const baseElement = document.getElementsByTagName('base')[0];
const baseUrl = baseElement ? baseElement.getAttribute('href') : '/';

root.render(
    <BrowserRouter basename={baseUrl}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
);
