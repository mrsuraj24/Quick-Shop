import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chat history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { data } = await axios.get("/api/chat/history");
        if (data.success && Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Failed to load history", err);
      }
    };
    loadHistory();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };

    // Show user message instantly
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/chat/send", { message: input });

      const botMessage = {
        role: "assistant",
        content: data.reply || "Sorry, I could not understand that.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Panel */}
            <div className="lg:col-span-1 bg-gray-900 border border-gray-800 rounded-2xl p-5 h-fit">
              <h2 className="text-lg font-semibold mb-4 text-indigo-400">
                🤖 AI Assistant
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Ask about your orders, get product suggestions, or any help you
                need while shopping.
              </p>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-gray-800 text-gray-300">
                  <NavLink>📦 Track my order</NavLink>
                </div>
                <div className="p-3 rounded-lg bg-gray-800 text-gray-300">
                  <NavLink> 🛒 Suggest products</NavLink>
                </div>    
                <div className="p-3 rounded-lg bg-gray-800 text-gray-300">
                  <NavLink>💳 Payment & returns</NavLink>
                </div>
                <div className="p-3 rounded-lg bg-gray-800 text-gray-300">
                  <NavLink>⚙️ Account help</NavLink>
                </div>
              </div>
            </div>

            {/* Chat Panel */}
            <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-2xl flex flex-col h-[70vh]">
              {/* Header */}
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h1 className="text-lg font-semibold">
                  💬 Chat with AI Shopping Assistant
                </h1>
                <span className="text-sm text-gray-400">Online</span>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-10">
                    👋 Hi! Ask me about your order or products.
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[75%] px-4 py-2 rounded-xl text-sm leading-relaxed ${msg.role === "user"
                        ? "ml-auto bg-indigo-600 text-white"
                        : "mr-auto bg-gray-800 text-gray-200"
                      }`}
                  >
                    {msg.content}
                  </div>
                ))}

                {loading && (
                  <div className="text-gray-400 text-sm">AI is typing...</div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-800 flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message... (e.g. Track my last order)"
                  className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-medium disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
