import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import {connect} from 'react-redux';
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

const MainContainer = React.lazy(() => import('./components/Main/MainContainer'));
const ShopContainer = React.lazy(() => import('./components/Shop/ShopContainer'));
const AboutContainer = React.lazy(() => import('./components/About/AboutContainer'));
const ProfilePage = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ProductPage = React.lazy(() => import('./components/Shop/ProductPage/ProductPageContainer'));
const CartPage = React.lazy(() => import('./components/Cart/CartContainer'));


class App extends React.Component {
    catchAllUnhandledErrors = (e) => {
        // alert('Some error with: ' + e.reason)
        // this.props.setGlobalError(e.reason);
    };

    componentDidMount() {
        this.props.init();
        // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        // window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        return (
            <>
                <PopUp isActive={this.props.isSignInSignUpPopUpShow} togglePopUp={this.props.toggleSignInSignUpPopUp}>
                    <SignInSignUpPopUp login={this.props.login} registration={this.props.registration}
                                       togglePopUp={this.props.toggleSignInSignUpPopUp} isLoginFetching={this.props.isLoginFetching} isRegisterFetching={this.props.isRegisterFetching}/>
                </PopUp>
                <CartLayout isCartShow={this.props.isCartLayoutShow} toggleIsCartShow={this.props.toggleCartLayout}
                            products={this.props.productsInCart} removeFromCart={this.props.removeFromCart}
                            updateProduct={this.props.updateProductInCart}/>
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
                    <Route path='/cart'
                           render={() => <CartPage/>}/>
                </React.Suspense>
                <Footer/>
            </>
        )
    }
}

const mapStateToProps = state => ({
    initialized: state.appReducer.initialized,
    isSignInSignUpPopUpShow: state.appReducer.isSignInSignUpPopUpShow,
    isCartLayoutShow: state.appReducer.isCartLayoutShow,
    productsInCart: state.shopReducer.cart,
    isLoginFetching: state.authReducer.isFetching,
    isRegisterFetching: state.registrationReducer.isFetching
});

export default compose(
    connect(mapStateToProps, {
        init,
        login,
        registration,
        toggleCartLayout,
        toggleSignInSignUpPopUp,
        removeFromCart,
        updateProductInCart
    })(App)
);
