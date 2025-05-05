import React, { useEffect, useRef } from "react";
const ChatContent = ({ messages }) => {
  const messagesEndRef = useRef(null); // Reference to the end of the messages

  // Scroll to the bottom every time messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Runs every time messages change


  // return (
  //   <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
  //     {messages.map((message, index) => (
  //       <div
  //         key={index}
  //         className={`p-3 rounded-lg max-w-sm mb-2 ${
  //           message.is_bot ? "ml-auto bg-blue-500 text-white" : "bg-gray-100"
  //         }`}
  //       >
  //         {message.text}
  //         <div className="text-xs text-gray-300 mt-1">{message.timestamp}</div>
  //       </div>
  //     ))}
  //     {/* Scroll to the bottom marker */}
  //     <div ref={messagesEndRef} />
  //   </div>
  // );
  return (
    <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg max-w-sm mb-2 ${
            message.is_bot ? "ml-auto bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
  
          {/* Conditionally render image if image_id is present */}
          {message.image_id && (
            <div className="mt-2">
              <img
                // src={`http://localhost:5000/image/${message.image_id}`}  // Replace with actual image URL
                src={`syncserviceswhatsappbackend-production.up.railway.app/image/${message.image_id}.jpg`}  // Replace with actual image URL
                alt="Message"
                className="max-w-full rounded-lg"
              />
            </div>
          )}
  
          {/* Conditionally render video if video_id is present */}
          {message.video_id && (
            <div className="mt-2">
              <video
                controls
                className="max-w-full rounded-lg"
              >
                <source
                  // src={`http://localhost:5000/video/${message.video_id}`}  // Replace with actual video URL
                  src={`syncserviceswhatsappbackend-production.up.railway.app/video/${message.video_id}.mp4`}  // Replace with actual video URL
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Display text message */}
          <div>{message.text}</div>
  
          {/* Display timestamp */}
          <div className="text-xs text-gray-300 mt-1">{message.timestamp}</div>
        </div>
      ))}
  
      {/* Scroll to the bottom marker */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContent;