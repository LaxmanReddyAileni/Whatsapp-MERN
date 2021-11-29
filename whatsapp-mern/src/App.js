import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Pusher from "pusher-js"; //this is for fornt end pusher-js
import axios from "./axios";
function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    // This UseEffect runs only once

    const pusher = new Pusher("41f42ebccea18b27f244", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("messages"); // messages is the channel and we get this from the backend pusher trigger
    channel.bind("inserted", (newMessage) => {
      // Same case with inserted as an event
      setMessages([...messages, newMessage]); //Keep all the old messages and add the new messages to that
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;

// Summary
/**
 * Front end REACT JS
 * Back end Node JS
 * Middleware Pusher
 * Database MongoDB
 */
