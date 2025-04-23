import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => {
        const userData = data.map((user) => ({ id: user.id, username: user.username }));
        setUsers(userData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

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
      <ChatWindow activeChat={activeChat} />
    </div>
  );
};

export default Chat;