import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import {
//   Avatar_02,
//   Avatar_05,
//   Avatar_09,
//   Avatar_10,
// } from "../../Routes/ImagePath";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from Flask backend
    // fetch("http://localhost:5000/api/users")
    fetch("https://syncserviceswhatsappbackend-production.up.railway.app/api/users")
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array of user objects with id and username
        const userData = data.map((user) => ({
          id: user.id,
          username: user.username,
        }));
        setUsers(userData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r border-gray-300">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <nav className="greedy">
              <ul className="link-item">
                {/* <li>
                  <Link to="/admin-dashboard">
                    <i className="la la-home" /> <span>Back to Home</span>
                  </Link>
                </li> */}
                <li className="menu-title">
                  Direct Chat{" "}
                  <Link to="#" data-bs-toggle="modal" data-bs-target="#add_chat_user">
                    <i className="fa-solid fa-plus" />
                  </Link>
                </li>
                <div
                  className="chat-list-container"
                  style={{ maxHeight: "600px", overflowY: "auto" }}
                >
                  {users.map((user) => (
                    <li key={user.id} className={activeChat?.id === user.id ? "active" : ""}>
                      <Link to="#" onClick={() => setActiveChat(user)}>
                        <span className="chat-avatar-sm user-img">
                          <img
                            className="rounded-circle"
                            // src={Avatar_02}
                            alt="User"
                          />
                          <span className="status online" />
                        </span>
                        <span className="chat-user">{user.username}</span>
                        <span className="badge rounded-pill bg-danger">1</span>
                      </Link>
                    </li>
                  ))}
                </div>
                {/* Hardcoded additional chats */}
                {/* <li>
                  <Link to="/call/chat">
                    <span className="chat-avatar-sm user-img">
                      <img
                        className="rounded-circle"
                        // src={Avatar_02}
                        alt="User"
                      />
                      <span className="status online" />
                    </span>
                    <span className="chat-user">John Doe</span>
                    <span className="badge rounded-pill bg-danger">1</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="/call/chat">
                    <span className="chat-avatar-sm user-img">
                      <img
                        className="rounded-circle"
                        // src={Avatar_09}
                        alt="User"
                      />
                      <span className="status offline" />
                    </span>
                    <span className="chat-user">Richard Miles</span>
                    <span className="badge rounded-pill bg-danger">7</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link to="/call/chat">
                    <span className="chat-avatar-sm user-img">
                      <img
                        className="rounded-circle"
                        // src={Avatar_10}
                        alt="User"
                      />
                      <span className="status away" />
                    </span>
                    <span className="chat-user">John Smith</span>
                  </Link>
                </li> */}
                {/* <li className="active">
                  <Link to="/call/chat">
                    <span className="chat-avatar-sm user-img">
                      <img
                        className="rounded-circle"
                        // src={Avatar_05}
                        alt="User"
                      />
                      <span className="status online" />
                    </span>
                    <span className="chat-user">Mike Litorus</span>
                    <span className="badge rounded-pill bg-danger">2</span>
                  </Link>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {activeChat ? (
          <div className="flex-1">
            <div className="bg-blue-100 p-4 border-b border-gray-300">
              <h3 className="text-lg font-bold">{activeChat.username}</h3>
            </div>
            <div className="p-4">
              <p className="bg-blue-200 p-3 rounded">Chat message goes here.</p>
              <p className="text-sm text-gray-500 mt-2">
                Please reply with the corresponding number to proceed.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to view details.
          </div>
        )}
        <div className="p-4 border-t border-gray-300">
          <input
            type="text"
            placeholder="Enter your message..."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;