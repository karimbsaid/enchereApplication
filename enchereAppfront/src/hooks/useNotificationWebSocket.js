import { useEffect, useRef } from "react";
import createStompClient from "../service/stompClient";

const useNotificationWebSocket = (usernameOrEmail, onNotification) => {
  const stompRef = useRef(null);

  useEffect(() => {
    if (!usernameOrEmail) return;

    const stompClient = createStompClient();
    stompRef.current = stompClient;

    stompClient.onConnect = () => {
      console.log("connecter");
      stompClient.subscribe(
        `/topic/notifications/${usernameOrEmail}`,
        (message) => {
          onNotification && onNotification(JSON.parse(message.body));
        }
      );
    };

    stompClient.onStompError = (frame) => {
      console.error(" STOMP error:", frame.headers["message"]);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [usernameOrEmail, onNotification]);

  return stompRef;
};

export default useNotificationWebSocket;
