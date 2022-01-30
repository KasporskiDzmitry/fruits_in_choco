import store from './redux/redux-store'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import ScrollToTop from "./components/common/ScrollToTop";


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ScrollToTop />
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
