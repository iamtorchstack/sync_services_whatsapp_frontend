const ChatContent = ({ messages }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.is_bot ? "justify-start" : "justify-end"} mb-2`}
        >
          <div
            className={`p-3 rounded-lg max-w-sm shadow-md ${
              message.is_bot ? "bg-blue-200 text-gray-800" : "bg-green-500 text-white"
            }`}
          >
            <p className="text-sm">{message.text}</p>
            <div className="text-xs text-gray-600 mt-1 text-right">
              {message.timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatContent;
