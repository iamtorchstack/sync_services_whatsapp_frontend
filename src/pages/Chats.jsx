import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import ChatContent from "../components/ChatContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [socketInstance, setSocketInstance] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  useEffect(() => {
    // Fetch all users
    // axios.get("http://localhost:5000/api/users")
    axios.get("https://syncserviceswhatsappbackend-production.up.railway.app/api/users")
      .then((response) => {
        const userData = response.data.map(user => ({
          id: user.id,
          username: user.username
        }));
        setUsers(userData);
      })
      .catch((error) => console.error("Error fetching users:", error));

    // Initialize WebSocket connection
    // const socket = io("http://localhost:5000", { transports: ["websocket"] });
    const socket = io("https://syncserviceswhatsappbackend-production.up.railway.app", { transports: ["websocket"] });

    setSocketInstance(socket);

    socket.on("connect", () => console.log("Connected to server"));

    socket.on("disconnect", () => console.log("Disconnected from server"));

    socket.on("get_messages", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("send_messages", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => socket.disconnect();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchMessages = (userId) => {
    // axios.get(`http://localhost:5000/api/get_messages_by_user/${userId}`)
    axios.get(`https://syncserviceswhatsappbackend-production.up.railway.app/api/get_messages_by_user/${userId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  };

  const handleSelectChat = (user) => {
    setActiveChat(user);
    fetchMessages(user.id);
  };

  const handleSendMessage = async () => {
    if (!messageBody.trim()) return;
    
    try {
      const payload = {
        to: activeChat.id,
        body: messageBody,
        isTyped: "True"
      };

      // const response = await axios.post("http://localhost:5000/send_message", payload, {
      const response = await axios.post("https://syncserviceswhatsappbackend-production.up.railway.app/send_message", payload, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 200) {
        const newMessage = {
          text: messageBody,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSender: true
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessageBody("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
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
        {/* Search bar below Direct Chats */}
        {/* <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ margin: "10px 0" }}
                  />
        </div> */}

        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              margin: "10px 0",
              width: "100%",  // Increase the width to take up more space
              borderRadius: "20px",  // Make the corners rounded
              padding: "10px",  // Add some padding for better UX
              border: "1px solid #ddd",  // Light border by default
              transition: "border 0.3s ease", // Smooth transition for border color
            }}
            onFocus={(e) => e.target.style.border = "2px solid #007bff"} // Change border to blue on focus
            onBlur={(e) => e.target.style.border = "1px solid #ddd"} // Reset border when focus is lost
          />
        </div>

        <div className="h-[90vh] overflow-y-auto space-y-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 transition-all duration-300 ${
                activeChat?.id === user.id ? "bg-blue-500 text-white" : "hover:bg-gray-300"
              }`}
              onClick={() => handleSelectChat(user)}
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
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-lg">
            Select a chat to view details.
          </div>
        )}
        
        {/* Message Input */}
        {activeChat && (
          <div className="p-4 border-t border-gray-300 flex">
            <input
              type="text"
              placeholder="Enter your message..."
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ml-2"
              onClick={handleSendMessage}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;