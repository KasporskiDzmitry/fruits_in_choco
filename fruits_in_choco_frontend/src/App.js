import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import {useDispatch, useSelector} from 'react-redux';
import Preloader from "./components/common/Preloader/Preloader";
import {init} from "./redux/thunks/app_thunks";
import PopUp from "./components/common/PopUp/PopUp";
import SignInSignUpPopUp from "./components/SignInSignUpPopUp/SignInSignUpPopUp";
import ScrollToTopButton from "./components/common/ScrollToTopButton/ScrollToTopButton";
import CartLayout from "./components/CartLayout/CartLayout";
import useNotifier from "./components/hooks/useNotifier";
import {connectStomp, stompClient} from "./components/utils/stomp";
import {NotFound} from "./components/NotFound/NotFound";
import {NOTIFICATION_ORDER, NOTIFICATION_REVIEW, ORDER_STATUS_NOT_CONFIRMED} from "./components/utils/constants";
import {emptyCartRedirect} from "./components/hoc/emptyCartRedirect";
import {loadProducts} from "./redux/thunks/product_thunks";
import {loadAllOrders} from "./redux/thunks/order_thunks";

const Main = React.lazy(() => import('./components/Main/Main'));
const Shop = React.lazy(() => import('./components/Shop/Shop'));
const About = React.lazy(() => import('./components/About/About'));
const ProfilePage = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ProductPage = React.lazy(() => import('./components/Shop/ProductPage/ProductPage'));
const CartPage = React.lazy(() => import('./components/Cart/Cart'));
const OrderPage = React.lazy(() => import('./components/Order/Order'));
const OrderSuccess = React.lazy(() => import('./components/OrderSuccess/OrderSuccess'));
const Order = emptyCartRedirect(OrderPage);

const App = (props) => {
    // catchAllUnhandledErrors = (e) => {
    //     // alert('Some error with: ' + e.reason)
    //     // this.props.setGlobalError(e.reason);
    // };
    //
    // componentDidMount() {
    //     this.props.init();
    //     // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    // }
    //
    // componentWillUnmount() {
    //     // window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    // }

    useNotifier();
    const dispatch = useDispatch();

    const isSignInSignUpPopUpShow = useSelector(state => state.appReducer.isSignInSignUpPopUpShow);
    const initialized = useSelector(state => state.appReducer.initialized);
    const isCartLayoutShow = useSelector(state => state.appReducer.isCartLayoutShow);
    const productsInCart = useSelector(state => state.cartReducer.cart);
    const isLoginFetching = useSelector(state => state.authReducer.isLoginFetching);
    const isRegisterFetching = useSelector(state => state.registrationReducer.isRegisterFetching);
    const newReviews = useSelector(state => state.productReducer.products.length > 0 && state.productReducer.products.map(i => i.ratings).flat().filter(i => !i.approved).length);
    const newOrders = useSelector(state => state.orderReducer.orders.length > 0 && state.orderReducer.orders.filter(i => i.status === ORDER_STATUS_NOT_CONFIRMED).length);

    useEffect(() => {
        dispatch(init());
    }, [])


    return <>
        <PopUp isActive={isSignInSignUpPopUpShow}>
            <SignInSignUpPopUp isLoginFetching={isLoginFetching} isRegisterFetching={isRegisterFetching}/>
        </PopUp>
        <CartLayout isCartShow={isCartLayoutShow} products={productsInCart}/>
        <ScrollToTopButton/>
        <Header newReviews={newReviews} newOrders={newOrders}/>
        <React.Suspense fallback={<Preloader/>}>
            <Switch>
                <Route exact path='/'
                       render={() => <Main/>}/>
                <Route path='/shop'
                       render={() => <Shop/>}/>
                <Route path='/products/:id'
                       render={() => <ProductPage/>}/>
                <Route path='/profile'
                       render={() => <ProfilePage newReviews={newReviews} newOrders={newOrders}/>}/>
                <Route exact path='/cart'
                       render={() => <CartPage/>}/>
                <Route exact path='/order'
                       render={() => <Order />}/>
                <Route exact path='/order/success'
                       render={() => <OrderSuccess/>}/>
                <Route render={() => <NotFound/>}/>
            </Switch>
        </React.Suspense>
        <Footer/>
    </>
}

export default App;