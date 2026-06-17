import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { getBotResponse } from "../utils/botLogic";

export default function ChatBox({ onClose }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { role: "ai", text: "Initializing Bikrant_AI_Agent v1.0..." },
    { role: "ai", text: "I am Bikrant's AI Assistant. I have read his entire 2-page resume. Ask me about his experience, projects, or skills!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setHistory(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(userMsg);
      
      setIsTyping(false);
      setHistory(prev => [...prev, { role: "ai", text: response }]);
    }, 800 + Math.random() * 1000);
  };

  return (
    <div className="w-full h-[450px] md:h-[500px] flex flex-col overflow-hidden relative theme-ignore rounded-2xl"
         style={{ background: "linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%)", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }}>
      {/* Sleek Header */}
      <div className="h-14 shrink-0 bg-white/5 border-b border-green-500/10 flex items-center px-5 justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">🤖</span>
          <div>
            <h3 className="text-green-400 font-bold text-xs tracking-wide">Bikrant_AI</h3>
            <p className="text-gray-400 text-[9px] font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]"></span> Online
            </p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-all text-gray-400"
            title="Close Chat"
          >
            <span className="text-lg leading-none">&times;</span>
          </button>
        )}
      </div>

      {/* Chat History */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs hide-scroll scroll-smooth">
        {history.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3 py-2.5 rounded-xl leading-relaxed ${
                msg.role === "user"
                  ? "bg-green-500/10 text-green-300 border border-green-500/20 rounded-tr-sm"
                  : "bg-white/5 text-gray-300 border border-white/5 rounded-tl-sm shadow-inner"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/5 rounded-xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1 h-1 rounded-full bg-green-500/60" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 rounded-full bg-green-500/60" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 rounded-full bg-green-500/60" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 bg-white/5 border-t border-green-500/10">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-green-500/50 font-mono text-base">›</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Bikrant_AI..."
            className="w-full bg-black/40 border border-green-500/20 rounded-lg outline-none pl-8 pr-10 py-2.5 text-green-400 font-sans text-xs placeholder-gray-600 focus:border-green-500/50 transition-colors shadow-inner"
            autoComplete="off"
          />
          <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-green-500/20 text-green-400 rounded-md hover:bg-green-500 hover:text-black transition-colors">
            ↵
          </button>
        </div>
      </form>
    </div>
  );
}
