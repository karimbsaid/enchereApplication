import { Client } from "@stomp/stompjs";
const API_URL = import.meta.env.VITE_API_URL;

const createStompClient = () => {
  return new Client({
    brokerURL: `${API_URL}/ws`,
    reconnectDelay: 5000,
    onStompError: (frame) => {
      console.error("STOMP Error:", frame.headers.message);
    },
  });
};
export default createStompClient;
