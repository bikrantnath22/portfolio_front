import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { getBotResponse } from "../utils/botLogic";

const EXPLORE_CHIPS = [
  "Best AI project?",
  "Full-stack work?",
  "Education",
  "How to contact?",
];

const RECRUITER_CHIPS = [
  "⚡ 60s AI Pitch",
  "🛠️ Architecture & Tech",
  "📊 Benchmark Numbers",
  "📄 Resume & Contact",
];

// Helper to render text with markdown bold, bullet points, and clickable links
function formatMessageContent(text) {
  if (!text) return "";

  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  // Split lines
  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    // Check for bullet list
    const trimmed = line.trim();
    const isBullet = trimmed.startsWith("* ") || trimmed.startsWith("• ");
    const content = isBullet ? trimmed.replace(/^(\*|•)\s+/, "") : line;

    // Process parts for URLs, emails, and bold text (**bold**)
    const parts = content.split(urlRegex);

    const formattedContent = parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline hover:text-cyan-300 font-mono text-[11px] break-all transition-colors cursor-pointer select-text"
            onClick={(e) => e.stopPropagation()}
          >
            {part.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        );
      }

      // Check for email
      const subparts = part.split(emailRegex);
      return subparts.map((sub, j) => {
        if (sub.match(emailRegex)) {
          return (
            <a
              key={j}
              href={`mailto:${sub}`}
              className="text-cyan-400 underline hover:text-cyan-300 font-mono text-[11px] transition-colors cursor-pointer select-text"
              onClick={(e) => e.stopPropagation()}
            >
              {sub}
            </a>
          );
        }

        // Parse **bold** formatting
        const boldParts = sub.split(/(\*\*[^*]+\*\*)/g);
        return boldParts.map((bPart, k) => {
          if (bPart.startsWith("**") && bPart.endsWith("**")) {
            return (
              <strong key={k} className="text-white font-semibold">
                {bPart.slice(2, -2)}
              </strong>
            );
          }
          return bPart;
        });
      });
    });

    return (
      <span
        key={lineIdx}
        className={`block min-h-[1.25em] ${isBullet ? "pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-cyan-400" : ""}`}
      >
        {formattedContent}
      </span>
    );
  });
}

export default function ChatBox({ onClose }) {
  const [input, setInput] = useState("");
  const [chipMode, setChipMode] = useState("explore");
  const [history, setHistory] = useState([
    {
      role: "assistant",
      text: "Hi! I'm Bikrant's AI portfolio assistant. Ask me anything about his AI/ML research, full-stack systems, education, or contact details.",
    },
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

  const sendMessage = async (messageText) => {
    const userMsg = messageText.trim();
    if (!userMsg || isTyping) return;

    // Append user message immediately
    const updatedHistory = [...history, { role: "user", text: userMsg }];
    setHistory(updatedHistory);
    setInput("");
    setIsTyping(true);

    // Prepare payload for netlify function (capped at last 6 messages)
    const payloadMessages = updatedHistory.slice(-6).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.text,
    }));

    try {
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data && data.reply) {
        setHistory((prev) => [...prev, { role: "assistant", text: data.reply }]);
        setIsTyping(false);
        return;
      }

      throw new Error("No reply in response");
    } catch {
      // Graceful offline fallback using grounded botLogic.js (derived from chatContext.json)
      const fallbackReply = getBotResponse(userMsg);
      setHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          text: fallbackReply,
        },
      ]);
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    sendMessage(input);
  };

  const handleChipClick = (chipText) => {
    sendMessage(chipText);
  };

  const handleResetChat = () => {
    setHistory([
      {
        role: "assistant",
        text: "Conversation reset. What would you like to know about Bikrant's projects or background?",
      },
    ]);
  };

  return (
    <div
      data-chatbox="true"
      data-lenis-prevent="true"
      onClick={(e) => e.stopPropagation()}
      className="chat-box-active w-full h-full flex flex-col overflow-hidden relative rounded-2xl bg-[#030712]/95 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_50px_rgba(0,0,0,0.85),0_0_20px_rgba(34,211,238,0.15)] pointer-events-auto select-auto"
    >
      {/* Header */}
      <div className="h-14 shrink-0 bg-white/[0.03] border-b border-cyan-500/20 flex items-center px-4 md:px-5 justify-between select-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-400/40 flex items-center justify-center text-sm shadow-[0_0_12px_rgba(34,211,238,0.25)]">
            🤖
          </div>
          <div>
            <h3 className="text-white font-bold text-xs font-heading tracking-tight flex items-center gap-2">
              <span>Ask about Bikrant&apos;s work</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            </h3>
            <p className="text-gray-400 text-[10px] font-mono leading-none mt-0.5">
              AI answers based on this portfolio&apos;s content
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Reset button */}
          <button
            type="button"
            onClick={handleResetChat}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-300 flex items-center justify-center transition-all cursor-pointer text-xs"
            title="Reset conversation"
          >
            ↻
          </button>

          {/* Close button */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-300 flex items-center justify-center transition-all cursor-pointer text-base"
              title="Close Chat"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages Container with isolated scrolling & visible scrollbar */}
      <div
        ref={containerRef}
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-sans overscroll-contain"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(34, 211, 238, 0.35) rgba(0, 0, 0, 0.4)",
        }}
      >
        {history.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed text-[12px] select-text ${
                msg.role === "user"
                  ? "bg-cyan-500/20 text-cyan-100 border border-cyan-400/40 rounded-tr-sm shadow-[0_2px_12px_rgba(34,211,238,0.12)]"
                  : "bg-white/[0.05] text-gray-200 border border-white/10 rounded-tl-sm shadow-inner"
              }`}
            >
              {formatMessageContent(msg.text)}
            </div>
          </motion.div>
        ))}

        {/* Real Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center gap-1.5 shadow-inner">
              <span className="text-[11px] font-mono text-gray-400 mr-1">Thinking</span>
              <motion.span
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
              <motion.span
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
              <motion.span
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips with Mode Toggle */}
      <div
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="px-3 pt-2 pb-1.5 border-t border-white/5 bg-black/60 select-none"
      >
        <div className="flex items-center justify-between gap-2 mb-1 px-0.5">
          <span className="text-[10px] font-mono tracking-wider text-gray-400">
            {chipMode === "recruiter" ? "⚡ Recruiter Fast-Track" : "💡 Quick Prompts"}
          </span>
          <div className="flex items-center gap-1 bg-white/[0.04] p-0.5 rounded-full border border-white/10 text-[9px] font-mono">
            <button
              type="button"
              onClick={() => setChipMode("explore")}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                chipMode === "explore"
                  ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Explore
            </button>
            <button
              type="button"
              onClick={() => setChipMode("recruiter")}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                chipMode === "recruiter"
                  ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Recruiter ⚡
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1" style={{ scrollbarWidth: "none" }}>
          {(chipMode === "recruiter" ? RECRUITER_CHIPS : EXPLORE_CHIPS).map((chip, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isTyping}
              onClick={(e) => {
                e.stopPropagation();
                handleChipClick(chip);
              }}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono shrink-0 bg-white/[0.04] hover:bg-cyan-500/25 text-gray-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="p-3 bg-white/[0.02] border-t border-cyan-500/15"
      >
        <div className="relative flex items-center">
          <span className="absolute left-3 text-cyan-400/60 font-mono text-sm pointer-events-none select-none">›</span>
          <input
            type="text"
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about AI, full-stack, education..."
            className="w-full bg-black/60 border border-white/10 rounded-xl outline-none pl-7 pr-10 py-2.5 text-cyan-100 font-sans text-xs placeholder-gray-500 focus:border-cyan-400/60 transition-colors shadow-inner disabled:opacity-50 select-text"
            autoComplete="off"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-cyan-400/20 hover:bg-cyan-400 text-cyan-300 hover:text-black rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            title="Send"
          >
            ↵
          </button>
        </div>
      </form>
    </div>
  );
}
