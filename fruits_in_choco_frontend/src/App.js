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
import {PopUp} from "./components/common/PopUp/PopUp";
import {SignInSignUpPopUp} from "./components/SignInSignUpPopUp/SignInSignUpPopUp";

const MainContainer = React.lazy(() => import('./components/Main/MainContainer'));
const ShopContainer = React.lazy(() => import('./components/Shop/ShopContainer'));
const AboutContainer = React.lazy(() => import('./components/About/AboutContainer'));
const ProfilePage = React.lazy(() => import('./components/Profile/ProfileContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));
const RegistrationPage = React.lazy(() => import('./components/Registration/Registration'));
const ProductPage = React.lazy(() => import('./components/Shop/ProductPage/ProductPageContainer'));


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
            <div className='app-wrapper'>
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
                </React.Suspense>
                <Footer/>
                {
                    this.props.isPopUpShow && <PopUp togglePopUp={this.props.togglePopUp}><SignInSignUpPopUp/></PopUp>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    initialized: state.appReducer.initialized,
    isPopUpShow: state.appReducer.isPopUpShow
});

export default compose(
    connect(mapStateToProps, {init, togglePopUp})(App)
);
