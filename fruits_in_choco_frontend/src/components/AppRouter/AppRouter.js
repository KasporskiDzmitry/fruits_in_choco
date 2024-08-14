import Admin from "../../pages/Admin/Admin";
import App from "../../App";
import {NotFound} from "../../pages/NotFound/NotFound";
import Main from "../../pages/Main/Main";
import Login from "../../pages/Login/Login";
import {ProductType} from "../../pages/ProductType/ProductType";
import {ProtectedRoutes} from "./ProtectedRoutes";
import {createBrowserRouter} from "react-router-dom";
import AdminSlider from "../../pages/Admin/Slider/AdminSlider";
import AdminCategories from "../../pages/Admin/Category/AdminCategories";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFound/>,
        children: [
            {path: '/', element: <Main/>},
            {path: '/login', element: <Login/>},
            {path: '/products/:type', element: <ProductType/>},
            {
                element: <ProtectedRoutes/>,
                children: [
                    {
                        path: '/admin', element: <Admin/>, children: [
                            {
                                path: '/admin/slider',
                                element: <AdminSlider/>,
                            },
                            {
                                path: '/admin/categories',
                                element: <AdminCategories/>,
                            },
                        ]
                    },

                ],
            },
        ],
    },
]);