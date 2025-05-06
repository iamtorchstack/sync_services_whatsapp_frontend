import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { io } from "socket.io-client";
import ChatContent from "../components/ChatContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  // const [recipient, setRecipient] = useState("27639204659");
  // const [recipient, setRecipient] = useState("0b00e8ff-d0ea-4539-a84b-61607f803165");
  const [recipient, setRecipient] = useState([]);
  // 0b00e8ff-d0ea-4539-a84b-61607f803165
  const [messageBody, setMessageBody] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [socketInstance, setSocketInstance] = useState("");

  useEffect(() => {
    // fetch("http://localhost:5000/api/users")
    fetch("https://syncserviceswhatsappbackend-production.up.railway.app/api/users")
      .then((response) => response.json())
      .then((data) => {
        const userData = data.map((user) => ({ id: user.id, username: user.username }));
        setUsers(userData);
        setRecipient(userData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    // const socket = io("http://localhost:5000", {
    const socket = io("https://syncserviceswhatsappbackend-production.up.railway.app", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000",
      },
    });
  
    setSocketInstance(socket);
  
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  
    // Handle incoming messages from the WebSocket
    socket.on("get_messages", (data) => {
      console.log("Received event:", data);
  
      // Use a callback function to get the latest state
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, data];
  
        // Log the updated messages array
        console.log("Updated messages:", updatedMessages);
  
        // Return the updated messages array
        return updatedMessages;
      });
    });

    // Handle incoming messages from the WebSocket
    socket.on("send_messages", (data) => {
      console.log("Received event:", data);
  
      // Use a callback function to get the latest state
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, data];
  
        // Log the updated messages array
        console.log("Updated messages:", updatedMessages);
  
        // Return the updated messages array
        return updatedMessages;
      });
    });
  
    // Clean up WebSocket connection on component unmount
    return () => {
      socket.disconnect(); // Close the connection
      console.log("WebSocket connection closed");
    };
  }, []);


  const handleSendMessage = async () => {
    try {
      // Prepare the payload
      const payload = {
        to: recipient,
        body: messageBody,
        isTyped: "True"
      };
  
      // Make the POST request to Flask API to send a message
      // const response = await axios.post('http://localhost:5000/send_message', payload, {
      const response = await axios.post('https://syncserviceswhatsappbackend-production.up.railway.app/send_message', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        console.log("response status is 200");
        console.log("messageBody", messageBody);
  
        const newMessage = {
          text: messageBody,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Fixed toLocaleTimeString
          isSender: true,
        };
  
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, newMessage]; // Fixed typo
          console.log("Updated messages:", updatedMessages);
          return updatedMessages;
        });
  
        setMessageBody(""); // Clear input field
        setResponseMessage(response.data.message);
        setTimestamp(response.data.timestamp);
      } else {
        setResponseMessage('Failed to send message');
      }
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data.error || 'Failed to send message');
      } else {
        setResponseMessage('Error: Network error');
      }
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 border-r border-gray-300 p-4">
        <div className="text-xl font-semibold mb-4 flex justify-between items-center">
          Direct Chat
          <Link to="#" className="text-blue-500 hover:text-blue-700 text-lg">+</Link>
        </div>
        <div className="h-[90vh] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {users.map((user) => (
            <div
              key={user.id}
              className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-all duration-300 ${
                activeChat?.id === user.id ? "bg-blue-500 text-white" : "hover:bg-gray-300"
              }`}
              onClick={() => setActiveChat(user)}
            >
              <div className="w-10 h-10 bg-gray-800 rounded-full" />
              <span className="font-medium">{user.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {activeChat ? (
          <>
            <div className="bg-blue-500 text-white p-4 font-semibold text-lg flex items-center">
              {activeChat.username}
            </div>
            <ChatContent messages={messages} />
             {/* <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"> */}
              {/* <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2 ml-auto">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
              <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div> */}
              {/* <p className="text-sm text-gray-500">Please reply with the corresponding number.</p> */}
            {/* </div> */}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">
            Select a chat to view details.
          </div>
        )}
        <div className="p-4 border-t border-gray-300 flex">
          <input
            type="text"
            placeholder="Enter your message..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        <Link
          to="#"
          className="flex  gap-2 items-center justify-center p-2 rounded-lg hover:bg-gray-200 transition-all duration-300"
          data-bs-toggle="modal"
          data-bs-target="#drag_files"
        >
          {/* <i className="fa-solid fa-paper-plane" /> */}
          <FontAwesomeIcon icon={faPaperclip} className="w-5 h-5 text-gray-600" />
        </Link>
          {/* <textarea
            className="form-control"
            placeholder="Enter your message..."
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            /> */}
            {/* <span className="input-group-append">
                <button className="btn btn-custom" type="button" onClick={handleSendMessage}>
                <i className="fa-solid fa-paper-plane" />
                </button>
            </span> */}

            <span className="ml-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                type="button"
                onClick={handleSendMessage}
              >
                <i className="fa-solid fa-paper-plane" />
              </button>
            </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;