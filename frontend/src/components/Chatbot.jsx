import { useState, useRef, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import PageTitle from "../components/PageTitle.jsx";

import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";

const suggestions = [
  {
    icon: <LocalShippingRoundedIcon fontSize="small" />,
    text: "Track my order",
  },
  {
    icon: <ShoppingBagRoundedIcon fontSize="small" />,
    text: "Best products under ₹3000",
  },
  {
    icon: <PaymentsRoundedIcon fontSize="small" />,
    text: "Payment issue",
  },
  {
    icon: <SupportAgentRoundedIcon fontSize="small" />,
    text: "Account help",
  },
];

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat, loading]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/chat",
        {
          message: currentMessage,
        }
      );

      const botMessage = {
        role: "assistant",
        text:
          res.data.reply ||
          "Sorry, I could not understand that.",
      };

      setTimeout(() => {
        setChat((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 900);
    } catch (error) {
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          {
            role: "assistant",
            text:
              "Something went wrong. Please try again.",
          },
        ]);

        setLoading(false);
      }, 900);
    }
  };

  const handleSuggestion = (text) => {
    setMessage(text);
  };

  return (
    <>
      <PageTitle title="QuickShop AI" />

      <Navbar />

      <div className="min-h-screen bg-[#0a0a0a] text-white pt-20">

        {/* Background Glow */}
        <div className="fixed top-[-200px] left-[-100px] w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="fixed bottom-[-200px] right-[-100px] w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Main Layout */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">

          {/* Sidebar */}
          <div className="hidden lg:flex w-[300px] min-h-[calc(100vh-80px)] border-r border-white/10 flex-col sticky top-20">

            {/* Logo */}
            <div className="p-6 border-b border-white/10">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.35)]">

                  <SmartToyRoundedIcon
                    sx={{
                      fontSize: 28,
                      color: "white",
                    }}
                  />
                </div>

                <div>

                  <h1 className="text-xl font-bold">
                    QuickShop AI
                  </h1>

                  <p className="text-gray-400 text-sm mt-1">
                    Smart Shopping Assistant
                  </p>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="p-5 flex-1 overflow-y-auto">

              <h2 className="text-sm text-gray-500 uppercase tracking-widest mb-4">
                Quick Actions
              </h2>

              <div className="space-y-3">

                {suggestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleSuggestion(item.text)
                    }
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500 hover:bg-indigo-600/10 transition-all duration-300 text-left"
                  >
                    <div className="text-indigo-400">
                      {item.icon}
                    </div>

                    <span className="text-gray-300 text-sm">
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>

              {/* AI Card */}
              <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 p-5">

                <div className="flex items-center gap-3">

                  <AutoAwesomeRoundedIcon className="text-indigo-400" />

                  <h3 className="font-semibold">
                    AI Features
                  </h3>
                </div>

                <ul className="mt-5 space-y-3 text-sm text-gray-400">

                  <li>✨ Smart Recommendations</li>

                  <li>📦 Instant Order Tracking</li>

                  <li>💳 Payment Assistance</li>

                  <li>🤖 AI Shopping Help</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex-1 flex flex-col min-h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="sticky top-20 z-20 backdrop-blur-xl bg-black/30 border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="relative">

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.35)]">

                    <SmartToyRoundedIcon
                      sx={{
                        fontSize: 24,
                        color: "white",
                      }}
                    />
                  </div>

                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0a0a0a] animate-pulse"></span>
                </div>

                <div>

                  <h1 className="font-semibold text-lg sm:text-xl">
                    QuickShop Assistant
                  </h1>

                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Online • Ask anything
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full">

                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

                <span className="text-green-400 text-sm">
                  Active
                </span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 space-y-7">

              {/* Welcome Screen */}
              {chat.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center text-center min-h-[70vh]">

                  <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.4)]">

                    <SmartToyRoundedIcon
                      sx={{
                        fontSize: 50,
                        color: "white",
                      }}
                    />
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-bold mt-8">
                    How can I help?
                  </h1>

                  <p className="text-gray-400 mt-5 max-w-2xl leading-8 text-sm sm:text-lg">
                    Ask me anything about products, orders,
                    payments, recommendations, returns,
                    shipping, or support.
                  </p>

                  {/* Suggestions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 w-full max-w-3xl">

                    {suggestions.map((item, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleSuggestion(item.text)
                        }
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 hover:border-indigo-500 hover:bg-indigo-600/10 transition-all duration-300 text-left"
                      >
                        <div className="text-indigo-400">
                          {item.icon}
                        </div>

                        <span className="text-gray-300">
                          {item.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {chat.map((c, index) => (
                <div
                  key={index}
                  className={`flex ${
                    c.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] sm:max-w-[80%] px-5 py-4 rounded-[28px] shadow-xl ${
                      c.role === "user"
                        ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-md shadow-[0_0_30px_rgba(99,102,241,0.35)]"
                        : "bg-white/[0.04] border border-white/10 text-gray-200 rounded-bl-md backdrop-blur-xl"
                    }`}
                  >
                    <div className="flex gap-4">

                      {c.role === "assistant" && (
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">

                          <SmartToyRoundedIcon
                            sx={{
                              fontSize: 20,
                              color: "white",
                            }}
                          />
                        </div>
                      )}

                      <div>

                        <p className="font-semibold mb-2 text-sm">
                          {c.role === "user"
                            ? "You"
                            : "QuickShop AI"}
                        </p>

                        <p className="leading-8 text-[15px] break-words">
                          {c.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading */}
              {loading && (
                <div className="flex justify-start">

                  <div className="bg-white/[0.04] border border-white/10 rounded-[28px] rounded-bl-md px-5 py-4">

                    <div className="flex gap-4">

                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">

                        <SmartToyRoundedIcon
                          sx={{
                            fontSize: 20,
                            color: "white",
                          }}
                        />
                      </div>

                      <div>

                        <p className="text-gray-300 mb-3 text-sm">
                          AI is thinking...
                        </p>

                        <div className="flex gap-1">

                          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></span>

                          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-100"></span>

                          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-200"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef}></div>
            </div>

            {/* Input Area */}
            <div className="sticky bottom-0 border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-2xl p-4 sm:p-6">

              <div className="max-w-4xl mx-auto">

                <div className="flex items-end gap-3 rounded-[30px] border border-white/10 bg-white/[0.04] px-3 sm:px-4 py-3 focus-within:border-indigo-500 transition-all duration-300">

                  <textarea
                    rows={1}
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !e.shiftKey
                      ) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Message QuickShop AI..."
                    className="flex-1 resize-none bg-transparent text-white placeholder:text-gray-500 outline-none px-2 py-2 text-[15px] max-h-40"
                  />

                  <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    <SendRoundedIcon />
                  </button>
                </div>

                <p className="text-gray-500 text-xs mt-3 px-2 text-center">
                  QuickShop AI can make mistakes. Verify important information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Chatbot;