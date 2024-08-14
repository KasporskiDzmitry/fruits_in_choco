import {Outlet} from "react-router-dom";
import Login from "../../pages/Login/Login";
import store from '../../redux/redux-store';

export const ProtectedRoutes = () => {
    const state = store.getState();

    const token = state.authReducer.token;
    console.log(token + '    In protected')
    if (!token){
        return <Login />
    }

    return <Outlet />;
};
