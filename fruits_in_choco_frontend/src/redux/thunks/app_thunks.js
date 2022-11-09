import {initializedSuccess} from "../actions/app_actions";
import {fetchRefreshTokenBegin, fetchRefreshTokenFailure, fetchRefreshTokenSuccess} from "../actions/auth_actions";
import RequestService from "../RequestService";
import {loadCategories} from "./category_thunks";
import {loadProducts} from "./product_thunks";
import {loadAllOrders} from "./order_thunks";
import {connectStomp, stompClient} from "../../components/utils/stomp";
import {NOTIFICATION_ORDER, NOTIFICATION_REVIEW} from "../../components/utils/constants";

export const init = () => async dispatch => {
    console.log("INIT")
    if (localStorage.name) {
        try {
            dispatch(fetchRefreshTokenBegin());
            const response = await RequestService.post("/auth/refreshToken");
            dispatch(fetchRefreshTokenSuccess(response.data));
        } catch (e) {
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
            localStorage.removeItem('isLoggedIn');
            console.log(e);
            dispatch(fetchRefreshTokenFailure(e));
        }
    }

    if (localStorage.role === 'ADMIN') {
        dispatch(loadProducts());
        dispatch(loadAllOrders());

        connectStomp(() => {
            stompClient.subscribe('/user/admin/notification', (e) => {
                const notificationType = JSON.parse(e.body).type;
                console.log(`${notificationType} notification received`)
                switch (notificationType) {
                    case NOTIFICATION_ORDER: {
                        dispatch(loadAllOrders());
                        break;
                    }
                    case NOTIFICATION_REVIEW: {
                        dispatch(loadProducts());
                        break;
                    }
                    default: {
                        console.log('Unknown notification type: ' + notificationType);
                        break;
                    }
                }
            });
        });
    }

    await Promise.all([dispatch(loadCategories())]);
    dispatch(initializedSuccess());
};

