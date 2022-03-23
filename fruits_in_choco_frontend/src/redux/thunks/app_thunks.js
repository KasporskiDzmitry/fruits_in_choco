import {initializedSuccess} from "../actions/app_actions";
import {refreshTokenSuccess} from "../actions/auth_actions";
import RequestService from "../RequestService";
import {loadCategories} from "./category_thunks";

// export let stompClient = null;

export const init = () => async dispatch => {
    if (localStorage.name) {
        try {
            const response = await RequestService.post("/auth/refreshToken");
            dispatch(refreshTokenSuccess(response.data));
        } catch (e) {
            localStorage.removeItem('email');
            localStorage.removeItem('name');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
            localStorage.removeItem('isLoggedIn');
        }
    }

    // connectWebSocket();

    await Promise.all([dispatch(loadCategories())]);
    dispatch(initializedSuccess());
};

export const connectWebSocket = () => {
    // const dispatch = useDispatch();
    // const onMessageReceived = (notification) => {
    //     dispatch(addNotification(notification))
    // }
    // const onConnected = () => {
    //     stompClient.subscribe('/topic/test', onMessageReceived);
    // }
    //
    // if (localStorage.role === 'ADMIN') {
    //     let Sock = new SockJS(`${API_BASE_URL}/ws`);
    //     stompClient = over(Sock);
    //     stompClient.connect({}, onConnected, (err) => console.log(err));
    // }
}
