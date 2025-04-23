const ChatContent = ({ messages }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`bg-gray-100 p-3 rounded-lg max-w-sm mb-2 ${
            message.isSender ? "ml-auto" : ""
          }`}
        >
          {message.text}
          <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
        </div>
      ))}
    </div>
  );
};


export default ChatContent;