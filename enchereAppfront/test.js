import { Client } from "@stomp/stompjs";

const client = new Client({
  brokerURL: "ws://localhost:8080/ws",
  onConnect: () => {
    client.subscribe("/topic/auctions/24/bids", (message) =>
      console.log(`Received: ${message.body}`)
    );
    // client.publish({ destination: "/topic/test01", body: "First Message" });
  },
});

client.activate();
