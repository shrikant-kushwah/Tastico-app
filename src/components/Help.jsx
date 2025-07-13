import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import { ai_prompt, api_key } from "../Utils/constants";

const generateId = () => Date.now().toString();

const Help = () => {
  const [userQuery, setUserQuery] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(generateId());
  const [recentChats, setRecentChats] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("recentChats");
    if (stored) setRecentChats(JSON.parse(stored));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  useEffect(() => {
    if (msgs.length >= 2 && msgs[msgs.length - 1]?.sender === "gemini") {
      const updated = [
        {
          id: chatId,
          title: msgs[0]?.msg.slice(0, 25) + "...",
          messages: msgs,
        },
        ...recentChats.filter((chat) => chat.id !== chatId),
      ].slice(0, 5);

      localStorage.setItem("recentChats", JSON.stringify(updated));
      setRecentChats(updated);
    }
  }, [msgs, chatId, recentChats]);

  const startNewChat = () => {
    setMsgs([]);
    setChatId(generateId());
  };

  const loadChat = (chat) => {
    setChatId(chat.id);
    setMsgs(chat.messages);
  };

  const handleDeleteChat = (id) => {
    const filtered = recentChats.filter((chat) => chat.id !== id);
    setRecentChats(filtered);
    localStorage.setItem("recentChats", JSON.stringify(filtered));

    if (chatId === id) startNewChat();
    toast.success("Chat deleted");
  };

  const btnClickHandler = () => {
    if (userQuery.trim().length === 0) {
      toast.error("👋 Type something so I can reply!");
      return;
    }

    setMsgs((prev) => [...prev, { sender: "user", msg: userQuery }]);
    callGemini(userQuery);
    setUserQuery("");
  };

  const callGemini = async (query) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${api_key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: ai_prompt + query }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const resultText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      setMsgs((prev) => [
        ...prev,
        { sender: "gemini", msg: resultText || "No response" },
      ]);
    } catch (err) {
      console.error("Gemini Error:", err);
      setMsgs((prev) => [
        ...prev,
        { sender: "gemini", msg: "❌ Failed to fetch response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 mt-17 overflow-hidden">
        <div className="w-64 bg-gradient-to-br from-white to-gray-100 border-r p-4 space-y-4 overflow-y-auto shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-700">Recent Chats</h2>
            <button
              onClick={startNewChat}
              className="text-xs px-3 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600"
            >
              + New chat
            </button>
          </div>

          {recentChats.length === 0 ? (
            <p className="text-gray-400 text-xs">No recent chats</p>
          ) : (
            recentChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center justify-between bg-white hover:bg-gray-100 px-3 py-2 rounded-lg shadow-sm"
              >
                <button
                  onClick={() => loadChat(chat)}
                  className="text-sm text-left text-gray-700 flex-1 truncate"
                >
                  {chat.title}
                </button>
                <button
                  onClick={() => handleDeleteChat(chat.id)}
                  className="text-xs text-red-500 ml-2 hover:underline"
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto bg-white mt-6 shadow-xl rounded-xl overflow-hidden">
          <div className="bg-gradient-to-tr from-orange-500 via-pink-500 to-yellow-400 text-white px-4 py-3 font-semibold text-lg">
            🤖 Gemini Assistant
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 bg-gray-50">
            {msgs.map((item, index) => (
              <div
                key={index}
                className={`flex gap-2 ${
                  item.sender === "user"
                    ? "justify-end items-end"
                    : "justify-start items-start"
                }`}
              >
                {item.sender === "gemini" && (
                  <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 via-pink-500 to-yellow-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    G
                  </div>
                )}
                {item.sender === "user" && (
                  <div className="order-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    U
                  </div>
                )}

                <div
                  className={`max-w-[80%] px-4 py-2 text-sm shadow-md rounded-2xl ${
                    item.sender === "user"
                      ? "bg-gradient-to-tr from-orange-500 via-pink-500 to-yellow-400 text-white rounded-br-none order-1"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  {item.msg}
                </div>
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>

          <div className="p-4 border-t bg-white flex items-center gap-3">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && btnClickHandler()}
              placeholder="Ask me anything about food, restaurants, or delivery..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              disabled={loading}
            />
            <button
              onClick={btnClickHandler}
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 text-white rounded-lg hover:opacity-90 disabled:opacity-50 font-semibold"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
