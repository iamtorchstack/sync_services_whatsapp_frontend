import React, { useState } from "react";

const Chats = () => {
  const [activeChat, setActiveChat] = useState(null);

  const chats = [
    {
      id: 1,
      name: "Cindy Love",
      message: "Hi Torch, welcome to Syncsystems Service Support!",
    },
  ];

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/4 bg-gray-100 border-r border-gray-300">
        <h2 className="text-xl font-bold p-4 border-b border-gray-300">
          Chats
        </h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`p-4 cursor-pointer hover:bg-blue-100 ${
                activeChat?.id === chat.id ? "bg-blue-200" : ""
              }`}
            >
              <div className="font-semibold">{chat.name}</div>
              <div className="text-sm text-gray-600 truncate">
                {chat.message}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Page */}
      <div className="flex-1 flex flex-col bg-white">
        {activeChat ? (
          <div className="flex-1">
            <div className="bg-blue-100 p-4 border-b border-gray-300">
              <h3 className="text-lg font-bold">{activeChat.name}</h3>
            </div>
            <div className="p-4">
              <p className="bg-blue-200 p-3 rounded">{activeChat.message}</p>
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

export default Chats;
