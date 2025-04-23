import React from "react";

const ChatWindow = ({ activeChat }) => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {activeChat ? (
        <>
          <div className="bg-blue-500 text-white p-4 font-semibold text-lg flex items-center">
            {activeChat.username}
          </div>
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            <div className="bg-gray-100 p-3 rounded-lg max-w-sm mb-2">Chat message goes here.</div>
            <p className="text-sm text-gray-500">Please reply with the corresponding number.</p>
          </div>
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
      </div>
    </div>
  );
};

export default ChatWindow;