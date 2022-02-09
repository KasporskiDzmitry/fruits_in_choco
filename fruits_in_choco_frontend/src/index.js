import store from './redux/redux-store'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import ScrollToTop from "./components/common/ScrollToTop";
import {SnackbarProvider} from "notistack";


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ScrollToTop />
            <SnackbarProvider maxSnack={5}>
                <App/>
            </SnackbarProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
