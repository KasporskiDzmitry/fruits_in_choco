import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useDispatch } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { init } from './redux/thunks/app_thunks';
import ScrollToTopButton from './components/common/ScrollToTopButton/ScrollToTopButton';
import useNotifier from './components/hooks/useNotifier';
import { NotFound } from './pages/NotFound/NotFound';
import { ProductType } from './pages/ProductType/ProductType';

const Main = React.lazy(() => import('./pages/Main/Main'));
const LoginPage = React.lazy(() => import('./pages/Login/Login'));
const AdminPage = React.lazy(() => import('./pages/Admin/Admin'));

const App = () => {
    useNotifier();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(init());
    }, []);

    return (
        <>
            <ScrollToTopButton />
            <Header />
            <React.Suspense fallback={<Preloader />}>
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    <Route path='/admin/*'
                           element={<AdminPage />}/>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route element={<NotFound />} />
                    <Route
                        exact
                        path="/products/:type"
                        element={<ProductType />}
                    />
                </Routes>
            </React.Suspense>
            <Footer />
        </>
    );
};

export default App;
