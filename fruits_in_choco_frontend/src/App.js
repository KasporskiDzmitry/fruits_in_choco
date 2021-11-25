import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Preloader from "./components/common/Preloader/Preloader";
import {init} from "./redux/thunks/app_thunks";
import {togglePopUp} from "./redux/actions/app_actions";
import PopUp from "./components/common/PopUp/PopUp";
import SignInSignUpPopUp from "./components/SignInSignUpPopUp/SignInSignUpPopUp";
import style from './App.scss';
import ScrollToTopButton from "./components/common/ScrollToTopButton/ScrollToTopButton";
import CartLayout from "./components/CartLayout/CartLayout";
import {removeFromCart, toggleIsCartShow, updateProductInCart} from "./redux/actions/shop_actions";

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
            <div className={style.appWrapper}>
                {this.props.isPopUpShow && <PopUp togglePopUp={this.props.togglePopUp}><SignInSignUpPopUp /></PopUp>}
                <CartLayout isCartShow={this.props.isCartShow} toggleIsCartShow={this.props.toggleIsCartShow}
                            products={this.props.productsInCart} removeFromCart={this.props.removeFromCart} updateProduct={this.props.updateProductInCart}/>
                <ScrollToTopButton/>
                <HeaderContainer/>
                <React.Suspense fallback={<Preloader/>}>
                    <Route exact path='/'
                           render={() => <MainContainer/>}/>
                    <Route path='/shop'
                           render={() => <ShopContainer/>}/>
                    <Route path='/product/:id'
                           render={() => <ProductPage/>}/>
                    <Route path='/about'
                           render={() => <AboutContainer/>}/>
                    <Route path='/profile'
                           render={() => <ProfilePage/>}/>
                    <Route path='/cart'
                           render={() => <CartPage/>}/>
                </React.Suspense>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    initialized: state.appReducer.initialized,
    isPopUpShow: state.appReducer.isPopUpShow,
    isCartShow: state.shopReducer.isCartShow,
    productsInCart: state.shopReducer.cart
});

export default compose(
    connect(mapStateToProps, {init, togglePopUp, toggleIsCartShow, removeFromCart, updateProductInCart})(App)
);
