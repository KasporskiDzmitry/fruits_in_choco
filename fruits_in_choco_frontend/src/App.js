import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import {connect, useDispatch, useSelector} from 'react-redux';
import {compose} from 'redux';
import Preloader from "./components/common/Preloader/Preloader";
import {init} from "./redux/thunks/app_thunks";
import {toggleCartLayout, togglePopUp, toggleSignInSignUpPopUp} from "./redux/actions/app_actions";
import PopUp from "./components/common/PopUp/PopUp";
import SignInSignUpPopUp from "./components/SignInSignUpPopUp/SignInSignUpPopUp";
import style from './App.scss';
import ScrollToTopButton from "./components/common/ScrollToTopButton/ScrollToTopButton";
import CartLayout from "./components/CartLayout/CartLayout";
import {removeFromCart, toggleIsCartShow, updateProductInCart} from "./redux/actions/shop_actions";
import {registration} from "./redux/thunks/registration_thunks";
import {login} from "./redux/thunks/auth_thunks";
import useNotifier from "./components/hooks/useNotifier";

const MainContainer = React.lazy(() => import('./components/Main/MainContainer'));
const ShopContainer = React.lazy(() => import('./components/Shop/ShopContainer'));
const AboutContainer = React.lazy(() => import('./components/About/AboutContainer'));
const ProfilePage = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ProductPage = React.lazy(() => import('./components/Shop/ProductPage/ProductPageContainer'));
const CartPage = React.lazy(() => import('./components/Cart/CartContainer'));
const OrderPage = React.lazy(() => import('./components/Order/OrderContainer'));
const OrderSuccess = React.lazy(() => import('./components/OrderSuccess/OrderSuccessContainer'));
const CakeConstructor = React.lazy(() => import('./components/CakeConstructor/CakeConstructor'));


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
    const productsInCart = useSelector(state => state.shopReducer.cart);
    const isLoginFetching = useSelector(state => state.authReducer.isLoginFetching);
    const isRegisterFetching = useSelector(state => state.registrationReducer.isRegisterFetching);

    useEffect(() => {
        dispatch(init());
    }, [])

    return <>
        <PopUp isActive={isSignInSignUpPopUpShow}>
            <SignInSignUpPopUp isLoginFetching={isLoginFetching} isRegisterFetching={isRegisterFetching}/>
        </PopUp>
        <CartLayout isCartShow={isCartLayoutShow} products={productsInCart}/>
        <ScrollToTopButton/>
        <HeaderContainer/>
        <React.Suspense fallback={<Preloader/>}>
            <Route exact path='/'
                   render={() => <MainContainer/>}/>
            <Route path='/shop'
                   render={() => <ShopContainer/>}/>
            <Route path='/products/:id'
                   render={() => <ProductPage/>}/>
            <Route path='/about'
                   render={() => <AboutContainer/>}/>
            <Route path='/profile'
                   render={() => <ProfilePage/>}/>
            <Route exact path='/cart'
                   render={() => <CartPage/>}/>
            <Route exact path='/order'
                   render={() => <OrderPage/>}/>
            <Route exact path='/order/success'
                   render={() => <OrderSuccess/>}/>
            <Route exact path={'/cake/constructor'}
                   render={() => <CakeConstructor/>}/>
        </React.Suspense>
        <Footer/>
    </>
}

// const mapStateToProps = state => ({
//     initialized: state.appReducer.initialized,
//     isSignInSignUpPopUpShow: state.appReducer.isSignInSignUpPopUpShow,
//     isCartLayoutShow: state.appReducer.isCartLayoutShow,
//     productsInCart: state.shopReducer.cart,
//     isLoginFetching: state.authReducer.isFetching,
//     isRegisterFetching: state.registrationReducer.isFetching
// });
//
// export default compose(
//     connect(mapStateToProps, {
//         init,
//         login,
//         registration,
//         toggleCartLayout,
//         toggleSignInSignUpPopUp,
//         removeFromCart,
//         updateProductInCart
//     })
// )(App)

export default App;