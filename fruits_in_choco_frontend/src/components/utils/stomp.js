import SockJS from "sockjs-client";
import {API_BASE_URL} from "./constants";
import {over} from "stompjs";

export let stompClient = null;

export const connectStomp = (onConnected) => {
    let Sock = new SockJS(`http://localhost:8080/ws`);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, err => console.log(err))
}

