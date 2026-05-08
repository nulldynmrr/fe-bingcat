"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  MessageSquare,
  BookOpen,
  EyeOff,
  Eye,
  PlayCircle,
  Square,
  Volume2,
  Lightbulb,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import request from "@/utils/request";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { chapterId, questionIndex } = params;
  const currentIndexUrl = parseInt(questionIndex) || 1;

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [meta, setMeta] = useState({ total_questions: 0, has_next: false });
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);

  const [hint, setHint] = useState("");
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [answers, setAnswers] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(`quiz_${chapterId}_answers`);
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      try {
        const res = await request.get(
          `/user/chapters/${chapterId}/questions/${currentIndexUrl}`,
        );
        if (res.data.status === "success") {
          setCurrentQuestion(res.data.data.question);
          setMeta(res.data.data.meta);

          if (answers[currentIndexUrl])
            setSelectedOption(answers[currentIndexUrl].choice);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestion();
  }, [chapterId, currentIndexUrl, answers]);

  useEffect(() => {
    setHint("");
    setShowHint(false);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [currentIndexUrl]);

  const playAudio = async () => {
    if (!window.speechSynthesis) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const voices = window.speechSynthesis.getVoices();
    const maleVoice =
      voices.find(
        (v) => v.name.includes("Male") || v.toLowerCase().includes("male"),
      ) || voices[0];
    const femaleVoice =
      voices.find(
        (v) => v.name.includes("Female") || v.toLowerCase().includes("female"),
      ) || voices[1];

    const contextData =
      currentQuestion.context?.script ||
      currentQuestion.context?.content ||
      currentQuestion.context ||
      "";
    const rawText = contextData.toString().replaceAll("\\n", "\n");
    const lines = rawText.split("\n");

    for (let line of lines) {
      if (!window.speechSynthesis.speaking && isPlaying === false) break;
      const cleanText = line.replace(/Man:|Woman:|Narrator:/gi, "").trim();
      if (!cleanText) continue;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.voice = line.toLowerCase().startsWith("man:")
        ? maleVoice
        : femaleVoice;
      utterance.pitch = line.toLowerCase().startsWith("man:")
        ? 0.8
        : line.toLowerCase().startsWith("woman:")
          ? 1.2
          : 1.0;
      utterance.lang = "en-US";

      await new Promise((res) => {
        utterance.onend = res;
        window.speechSynthesis.speak(utterance);
      });
    }
    setIsPlaying(false);
  };

  const getHint = async () => {
    if (hint) {
      setShowHint(!showHint);
      return;
    }
    setIsHintLoading(true);
    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
              {
                role: "system",
                content: "Beri 1 hint singkat bahasa Indonesia.",
              },
              {
                role: "user",
                content: `Soal: ${currentQuestion.question_text}`,
              },
            ],
          }),
        },
      );
      const data = await res.json();
      setHint(data.choices[0].message.content);
      setShowHint(true);
    } catch (e) {
      setHint("Gunakan logika, Meow!");
      setShowHint(true);
    } finally {
      setIsHintLoading(false);
    }
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    try {
      const resCheck = await request.post(
        `/user/questions/${currentQuestion.id}/check`,
        { user_answer: selectedOption },
      );
      const isCorrect = resCheck.data.data.is_correct;

      const updatedAnswers = {
        ...answers,
        [currentIndexUrl]: { choice: selectedOption, isCorrect },
      };
      setAnswers(updatedAnswers);
      sessionStorage.setItem(
        `quiz_${chapterId}_answers`,
        JSON.stringify(updatedAnswers),
      );

      if (meta.has_next) {
        router.push(`/learn/quiz/${chapterId}/${currentIndexUrl + 1}`);
      } else {
        const correctCount = Object.values(updatedAnswers).filter(
          (a) => a.isCorrect,
        ).length;
        const incorrectCount = Object.values(updatedAnswers).filter(
          (a) => !a.isCorrect,
        ).length;

        await request.post("/user/progress", {
          chapter_id: chapterId,
          correct: correctCount,
          incorrect: incorrectCount,
        });
        sessionStorage.removeItem(`quiz_${chapterId}_answers`);
        router.push(
          `/learn/quiz/${chapterId}/result?c=${correctCount}&i=${incorrectCount}`,
        );
      }
    } catch (err) {
      alert("Masalah koneksi.");
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#f4f7fa]">
        <Loader2 className="animate-spin text-violet-500 w-12 h-12" />
      </div>
    );

  return (
    <div className="h-screen w-full flex flex-col bg-[#f4f7fa] overflow-hidden text-slate-800">
      <header className="p-6 flex items-center gap-4 bg-white/50 backdrop-blur-md z-40 shrink-0">
        <Link
          href="/home"
          className="bg-white p-2.5 rounded-2xl border border-slate-100"
        >
          <X className="w-5 h-5 text-slate-400" />
        </Link>
        <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <motion.div
            animate={{
              width: `${(currentIndexUrl / meta.total_questions) * 100}%`,
            }}
            className="h-full bg-violet-500"
          />
        </div>
        <div className="flex items-center gap-2 font-black text-rose-500 bg-white px-4 py-2.5 rounded-2xl border border-slate-100">
          <Heart className="w-5 h-5 fill-rose-500" /> 5
        </div>
      </header>

      <main className="flex-1 overflow-hidden px-6 pb-32 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 lg:w-1/2 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {isTranscriptVisible && currentQuestion.context && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[2.5rem] p-8 border border-slate-100 h-full flex flex-col shadow-sm relative"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest">
                    {currentQuestion.type || "CONTEXT"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={playAudio}
                      className={`text-[10px] font-black px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${isPlaying ? "bg-rose-100 text-rose-600" : "bg-violet-100 text-violet-600 hover:bg-violet-200"}`}
                    >
                      {isPlaying ? (
                        <Square className="w-3 h-3 fill-current" />
                      ) : (
                        <PlayCircle className="w-3 h-3 fill-current" />
                      )}{" "}
                      AUDIO
                    </button>
                    <button
                      onClick={() => setIsTranscriptVisible(false)}
                      className="p-2 text-slate-300 hover:text-slate-600"
                    >
                      <EyeOff className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar italic leading-loose text-slate-600 whitespace-pre-line text-[15px]">
                  {(
                    currentQuestion.context?.script ||
                    currentQuestion.context?.content ||
                    currentQuestion.context ||
                    ""
                  )
                    .toString()
                    .replaceAll("\\n", "\n")}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-10">
          {!isTranscriptVisible && (
            <div className="flex justify-between mb-4">
              <button
                onClick={() => setIsTranscriptVisible(true)}
                className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase hover:text-violet-500"
              >
                <Eye className="w-4 h-4" /> SHOW TRANSCRIPT
              </button>
              <button
                onClick={playAudio}
                className="text-[10px] font-black px-4 py-2 rounded-xl bg-violet-100 text-violet-600 flex items-center gap-2 uppercase tracking-widest hover:bg-violet-200 transition-all"
              >
                {isPlaying ? (
                  <Square className="w-3 h-3 fill-current" />
                ) : (
                  <PlayCircle className="w-3 h-3 fill-current" />
                )}{" "}
                LISTEN AUDIO
              </button>
            </div>
          )}
          <h1 className="text-2xl font-black mb-8 leading-snug">
            {currentQuestion.question_text}
          </h1>

          {showHint && hint && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-5 bg-amber-50 border-2 border-amber-100 rounded-[2rem] flex items-start gap-4 shadow-sm"
            >
              <Lightbulb className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
              <p className="text-sm font-bold text-amber-800 leading-relaxed italic">
                {hint}
              </p>
            </motion.div>
          )}

          <div className="space-y-4">
            {currentQuestion.options.map((opt, idx) => {
              const id = String.fromCharCode(65 + idx);
              const active = selectedOption === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedOption(id)}
                  className={`w-full p-5 rounded-2xl border-2 text-left font-bold transition-all flex items-center gap-5 ${active ? "bg-violet-50 border-violet-500 text-violet-700 shadow-md shadow-violet-100" : "bg-white border-slate-100 hover:border-slate-300 shadow-sm"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black border-2 transition-all shrink-0 ${active ? "bg-white border-violet-500 text-violet-600" : "bg-slate-50 border-slate-100 text-slate-400"}`}
                  >
                    {id}
                  </div>
                  <span className="text-[15px] leading-tight">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0  right-0 p-6 bg-white border-t border-slate-100 flex items-center justify-between gap-4 z-[9999] shadow-2xl">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <button
            onClick={getHint}
            disabled={isHintLoading}
            className="px-6 py-4 rounded-2xl font-black text-amber-600 bg-amber-100 border-b-[6px] border-amber-300 hover:bg-amber-200 transition-all flex items-center gap-2 uppercase tracking-widest text-[10px]"
          >
            {isHintLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Lightbulb className="w-5 h-5" />
            )}{" "}
            HINT
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`px-12 py-4 rounded-2xl font-black uppercase tracking-widest transition-all min-w-[200px] ${!selectedOption ? "bg-slate-200 text-slate-400 border-b-[6px] border-slate-300 cursor-not-allowed" : "bg-violet-600 text-white border-b-[6px] border-violet-800 shadow-lg active:translate-y-1 active:border-b-0"}`}
          >
            {meta.has_next ? "Lanjutkan" : "Selesai"}
          </button>
        </div>
      </footer>
    </div>
  );
}
