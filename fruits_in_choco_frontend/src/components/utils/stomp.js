import SockJS from "sockjs-client";
import {API_BASE_URL} from "./constants/url";
import {over} from "stompjs";

export let stompClient = null;

export const connectStomp = (onConnected) => {
    let Sock = new SockJS(`${API_BASE_URL}/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, err => console.log(err))
}

