import { useEffect, useRef } from "react";
import createStompClient from "../service/stompClient";

const useWebSocket = ({ auctionId, onMessage }) => {
  const stompRef = useRef(null);

  useEffect(() => {
    const stompClient = createStompClient();
    stompRef.current = stompClient;

    stompClient.onConnect = () => {
      stompClient.subscribe(`/topic/auctions/${auctionId}/bids`, (message) => {
        onMessage && onMessage(JSON.parse(message.body));
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [auctionId, onMessage]);

  return stompRef;
};

export default useWebSocket;
