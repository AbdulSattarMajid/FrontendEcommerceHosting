import { useEffect, useRef, useState } from "react";

const Chatbot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return; // Prevent multiple sends during loading

    const updatedMessages = [...messages, { sender: "user", text: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true); // ✅ Start loading

    try {
      const res = await fetch("https://chatbotecommerce-07l5.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      setMessages([
        ...updatedMessages,
        { sender: "bot", text: data.answer || "No response." },
      ]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="w-96 max-w-full h-[500px] backdrop-blur-md bg-white/80 border border-gray-200 shadow-xl rounded-2xl flex flex-col overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b bg-white/60">
          <h2 className="text-lg font-bold text-gray-800">🤖 AI Assistant</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold transition"
          >
            &times;
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 custom-scrollbar">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-2 rounded-xl text-sm shadow-sm ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-600 text-white rounded-br-none"
                  : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Bot typing indicator */}
          {loading && (
            <div className="mr-auto bg-gray-200 text-gray-800 rounded-bl-none max-w-[80%] px-4 py-2 rounded-xl text-sm shadow-sm italic">
              Bot is typing...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t bg-white/60">
          <div className="flex items-center gap-2">
            <input
              className="flex-1 p-2 px-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading} // ✅ Disable input while loading
            />
            <button
              onClick={sendMessage}
              disabled={loading} // ✅ Disable button while loading
              className={`px-4 py-2 rounded-full text-sm font-semibold shadow transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
