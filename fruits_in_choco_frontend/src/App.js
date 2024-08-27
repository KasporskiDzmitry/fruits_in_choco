import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useDispatch } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { init } from './redux/thunks/app_thunks';
import useNotifier from './components/hooks/useNotifier';

// const Main = React.lazy(() => import('./pages/Main/Main'));
// const LoginPage = React.lazy(() => import('./pages/Login/Login'));
// const AdminPage = React.lazy(() => import('./pages/Admin/Admin'));

const App = () => {
    useNotifier();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(init());
    }, []);

    return (
        <>
            <React.Suspense fallback={<Preloader />}>
                {/*<ScrollToTopButton />*/}
                <Header />
                <Outlet />
                <Footer />
            </React.Suspense>
        </>
    );
};

export default App;
