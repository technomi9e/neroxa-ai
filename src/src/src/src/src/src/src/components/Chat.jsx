import { useState } from "react";
import Message from "./Message";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      role: "user",
      content: input,
    };
    setMessages([...messages, newMessage, { role: "ai", content: "Thinking..." }]);
    setInput("");

    // Simulate API response
    setTimeout(() => {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          content: "This is a mock AI response to: " + newMessage.content,
        };
        return updated;
      });
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
      </div>
      <div className="p-4 border-t bg-white">
        <textarea
          className="w-full p-2 border rounded resize-none"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Neroxa..."
        />
        <button
          onClick={handleSend}
          className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}
