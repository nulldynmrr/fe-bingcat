"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Sparkles,
  ChevronLeft,
  MessageCircle,
  Zap,
  Volume2,
  VolumeX,
  Rabbit,
  Snail,
} from "lucide-react";
import Link from "next/link";
import request from "@/utils/request";

export default function TanyaAIPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Meow! Halo! Aku binCat, tutor bahasa Inggris pribadimu. Ada yang bisa aku bantu hari ini? Kamu bisa tanya soal grammar, kosakata, atau tips EPrT!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSlowMode, setIsSlowMode] = useState(false);
  const chatEndRef = useRef(null);

  const speakText = (text) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const cleanText = text.replace(/"/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const availableVoices = window.speechSynthesis.getVoices();

    const enVoice =
      availableVoices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Female") ||
            v.name.includes("Google US English") ||
            v.name.includes("Samantha") ||
            v.name.includes("Zira")),
      ) || availableVoices.find((v) => v.lang.startsWith("en"));

    if (enVoice) {
      utterance.voice = enVoice;
    }

    utterance.lang = "en-US";
    utterance.rate = isSlowMode ? 0.5 : 0.9;
    utterance.pitch = 1.1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const formatMessage = (content) => {
    const parts = content.split(/("[^"]*")/g);
    return parts.map((part, i) => {
      if (part.startsWith('"') && part.endsWith('"')) {
        return (
          <span
            key={i}
            className="inline-flex items-center gap-1 group align-middle"
          >
            <motion.span
              whileTap={{ scale: 0.95 }}
              onClick={() => speakText(part)}
              className="bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded-lg border-b-2 border-violet-300 font-black cursor-pointer hover:bg-violet-200 transition-colors leading-relaxed"
            >
              {part}
            </motion.span>
            <button
              onClick={() => speakText(part)}
              className="p-1.5 rounded-xl bg-white border border-slate-100 shadow-sm text-violet-400 hover:text-violet-600 hover:border-violet-200 transition-all flex-shrink-0"
              title="Dengarkan pengucapan"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </span>
        );
      }
      return part;
    });
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    window.speechSynthesis.getVoices();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await request.post("/user/ai-tutor", {
        question: userMessage,
      });

      if (response.data.status === "success") {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: response.data.data.answer },
        ]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Maaf, koneksiku sedang terganggu. Coba tanya lagi nanti ya, Meow!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-[#f4f7fa] relative overflow-hidden text-slate-800">
      <div className="absolute inset-0 z-0 pointer-events-none text-slate-800">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-violet-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl"></div>
      </div>

      <header className="mt-24 relative z-10 px-8 py-6 flex items-center justify-between border-b border-white bg-white/60 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/home">
            <button className="p-3 rounded-2xl bg-white border-2 border-slate-100 hover:border-violet-500 hover:text-violet-600 transition-all shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight text-slate-800">
                Tanya binCat
              </h2>
              <div className="px-2 py-0.5 bg-violet-100 text-violet-600 text-[10px] font-black uppercase rounded-lg border border-violet-200 text-slate-800">
                AI Tutor
              </div>
            </div>
            <p className="text-xs font-bold text-slate-400">
              Tekan teks ungu untuk audio ✨
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSlowMode(!isSlowMode)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all font-bold text-xs ${
              isSlowMode
                ? "bg-amber-100 border-amber-400 text-amber-700 shadow-[0_3px_0_#d97706]"
                : "bg-white border-slate-100 text-slate-500 shadow-[0_3px_0_#e2e8f0]"
            } active:translate-y-[3px] active:shadow-none`}
          >
            {isSlowMode ? (
              <Snail className="w-4 h-4" />
            ) : (
              <Rabbit className="w-4 h-4" />
            )}
            {isSlowMode ? "Slower" : "Normal"}
          </button>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border-2 border-slate-100 shadow-sm ml-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-black text-slate-700 font-mono">
              PRO
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar relative z-10 p-8 space-y-6">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[88%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md border-b-4 ${
                    msg.role === "ai"
                      ? "bg-violet-500 border-violet-700 text-white"
                      : "bg-emerald-500 border-emerald-700 text-white"
                  }`}
                >
                  {msg.role === "ai" ? (
                    <Bot className="w-6 h-6" />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div
                    className={`p-5 rounded-3xl text-[13px] font-bold leading-relaxed shadow-sm border-2 ${
                      msg.role === "ai"
                        ? "bg-white border-slate-100 rounded-tl-none text-slate-700 shadow-violet-100/50"
                        : "bg-emerald-50 border-emerald-100 rounded-tr-none text-emerald-900"
                    }`}
                  >
                    {formatMessage(msg.content)}
                  </div>

                  {isSpeaking && msg.role === "ai" && (
                    <button
                      onClick={stopSpeaking}
                      className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-full shadow-sm text-rose-500 transition-all w-fit ml-1"
                    >
                      <VolumeX className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-black uppercase">
                        Berhenti
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-2xl bg-violet-500 border-b-4 border-violet-700 flex items-center justify-center text-white shadow-md">
                  <Bot className="w-6 h-6 animate-bounce" />
                </div>
                <div className="px-4 py-2 bg-white rounded-2xl border-2 border-slate-100 font-bold text-slate-400 text-xs italic">
                  binCat sedang berpikir...
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </main>

      <footer className="relative z-20 px-8 pb-2 pt-4">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSendMessage}
            className="relative flex items-center gap-3 bg-white p-2 rounded-[2rem] border-2 border-slate-100 shadow-xl shadow-violet-200/20 focus-within:border-violet-500 transition-all"
          >
            <div className="pl-4 text-slate-300">
              <MessageCircle className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya apapun (e.g. Jelaskan tentang Noun)"
              className="flex-1 bg-transparent py-4 text-sm font-bold outline-none text-slate-700 placeholder:text-slate-300"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-4 rounded-2xl transition-all shadow-lg flex items-center justify-center ${
                input.trim() && !isLoading
                  ? "bg-violet-500 text-white border-b-4 border-violet-700 hover:bg-violet-400 active:border-b-0 active:translate-y-1"
                  : "bg-slate-100 text-slate-300 border-b-4 border-slate-200 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
