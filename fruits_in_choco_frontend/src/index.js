import store from './redux/redux-store';
import React from 'react';
import {BrowserRouter, RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import ScrollToTop from './components/common/ScrollToTop';
import {SnackbarProvider} from 'notistack';

import {createRoot} from 'react-dom/client';
import {router} from "./components/AppRouter/AppRouter";

const root = createRoot(document.getElementById('root'));

root.render(
    // <React.StrictMode>
        <Provider store={store}>
            {/*<ScrollToTop/>*/}
            {/*Commented scroll since routing doesn't work with it*/}
            <SnackbarProvider maxSnack={5}>
                <RouterProvider router={router}/>
            </SnackbarProvider>
        </Provider>
    // </React.StrictMode>
);
