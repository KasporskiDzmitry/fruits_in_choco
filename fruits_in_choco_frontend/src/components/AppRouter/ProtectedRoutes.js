import {Outlet} from "react-router-dom";
import Login from "../../pages/Login/Login";
import {useVerifyToken} from "./useVerifyToken";

export const ProtectedRoutes = () => {
    const token = localStorage.getItem("token");
    const tokenVerified = useVerifyToken(token);

    if (!token) {
        return <Login/>
    }

    if (!tokenVerified){
        // clear all data
        return <Login />
    }

    return <Outlet/>;
};
