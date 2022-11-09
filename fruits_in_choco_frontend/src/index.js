import store from './redux/redux-store'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import ScrollToTop from "./components/common/ScrollToTop";
import {SnackbarProvider} from "notistack";


import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <React.StrictMode>
                <ScrollToTop />
                <SnackbarProvider maxSnack={5}>
                    <App/>
                </SnackbarProvider>
            </React.StrictMode>
        </Provider>
    </BrowserRouter>
);
