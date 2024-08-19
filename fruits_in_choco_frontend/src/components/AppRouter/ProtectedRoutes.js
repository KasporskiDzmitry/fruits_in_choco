import {Outlet} from "react-router-dom";
import Login from "../../pages/Login/Login";

export const ProtectedRoutes = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Login/>
    }

    return <Outlet/>;
};
