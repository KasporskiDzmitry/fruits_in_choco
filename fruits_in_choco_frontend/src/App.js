import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import Navbar from './components/Navbar/Navbar';
import {Route, Switch} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Preloader from "./components/common/Preloader/Preloader";
// import {initializeApp, setGlobalError} from "./redux/app-reducer";
// import Preloader from "./components/common/Preloader/Preloader";

const MainContainer = React.lazy(() => import('./components/Main/MainContainer'));
const ShopContainer = React.lazy(() => import('./components/Shop/ShopContainer'));
const AboutContainer = React.lazy(() => import('./components/About/AboutContainer'));
const ProfilePage = React.lazy(() => import('./components/Profile/ProfileContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));
// const RegistrationPage = React.lazy(() => import('./components/Registration/Registration'));


class App extends React.Component {

    catchAllUnhandledErrors = (e) => {
        // alert('Some error with: ' + e.reason)
        // this.props.setGlobalError(e.reason);
    };


    componentDidMount() {
        // this.props.initializeApp();
        // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        // window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        // if (!this.props.initialized) {
        //   return <Preloader/>
        // }
        //
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <React.Suspense fallback={<Preloader/>}>
                    <Route exact path='/'
                           render={() => <MainContainer/>}/>
                    <Route path='/shop'
                           render={() => <ShopContainer/>}/>
                    <Route path='/about'
                           render={() => <AboutContainer/>}/>
                    <Route path='/profile'
                           render={() => <ProfilePage/>}/>
                    <Route path='/login'
                           render={() => <LoginPage/>}/>
                    {/*<Route path='/registration'*/}
                    {/*       render={() => <RegistrationPage/>}/>*/}
                </React.Suspense>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    initialized: null,
});

export default compose(
    connect(mapStateToProps, {})(App)
);
