"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  Check,
  XCircle,
  BookOpen,
  MessageSquare,
  EyeOff,
  Eye,
  PlayCircle,
  Square,
  Volume2,
  Lightbulb,
  Loader2,
} from "lucide-react";
import Link from "next/link";

const quizData = [
  {
    id: 1,
    type: "communicative",
    contextType: "dialogue",
    context: [
      {
        speaker: "Man",
        text: "Excuse me, Professor. Could you tell me who my lab partner is? My name is Mike Wheeler.",
      },
      {
        speaker: "Woman",
        text: "Of course, Mike. Your lab partner is Parvati Sharma.",
      },
      { speaker: "Narrator", text: "Why does the man see the woman?" },
    ],
    question: "Select the correct answer based on the dialogue above.",
    options: [
      { id: "A", text: "To ask about his lab partner" },
      { id: "B", text: "To change his lab partner" },
      { id: "C", text: "To leave the lab early" },
      { id: "D", text: "To submit his lab work" },
    ],
    correctAnswer: "A",
  },
  {
    id: 2,
    type: "reading",
    contextType: "text",
    contextTitle: "Reading Comprehension",
    context:
      "Glass fibers are extremely strong; for their weight, they are stronger than steel. They are made by forcing molten glass through tiny holes called spinnerets. As many as four hundred spinnerets are placed together, and threads of glass much thinner than human hairs are drawn off at great speed-miles of thread per minute.",
    question: "What was the author's main purpose in writing the article?",
    options: [
      {
        id: "A",
        text: "To persuade you to investigate the many uses of glass",
      },
      {
        id: "B",
        text: "To inform you how special kinds of glass are made and used",
      },
      { id: "C", text: "To inform you about the strength of glass fibers" },
      {
        id: "D",
        text: "To inform you that glue is used to hold strands of glass",
      },
    ],
    correctAnswer: "B",
  },
];

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState("idle");
  const [lives, setLives] = useState(5);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hint, setHint] = useState("");
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  const currentQuestion = quizData[currentIndex];
  const progress = (currentIndex / quizData.length) * 100;

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const handleSelect = (id) => {
    if (status !== "idle") return;
    setSelectedOption(id);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsPlaying(false);

    if (selectedOption === currentQuestion.correctAnswer) {
      setStatus("correct");
    } else {
      setStatus("wrong");
      setLives((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsPlaying(false);

    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setStatus("idle");
      setIsTranscriptVisible(true);
      setHint("");
      setShowHint(false);
    } else {
      alert("Kuis Selesai! XP didapatkan!");
    }
  };

  const playAudio = async () => {
    if (!window.speechSynthesis) {
      alert("Browser kamu tidak mendukung fitur suara.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    let voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    }

    const getVoice = (gender) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

      if (gender === "male") {
        return (
          voices.find((v) => v.name === "Google UK English Male") ||
          voices.find((v) => v.name === "Google US English") ||
          voices.find(
            (v) => v.name === "Microsoft David - English (United States)",
          ) ||
          voices.find((v) => v.name === "Alex" && isMac) ||
          voices.find((v) => v.name === "Daniel" && isMac) ||
          voices.find((v) => v.name.toLowerCase().includes("male")) ||
          voices[0]
        );
      } else {
        return (
          voices.find((v) => v.name === "Google UK English Female") ||
          voices.find(
            (v) => v.name === "Microsoft Zira - English (United States)",
          ) ||
          voices.find((v) => v.name === "Samantha" && isMac) ||
          voices.find((v) => v.name === "Karen" && isMac) ||
          voices.find((v) => v.name === "Tessa" && isMac) ||
          voices.find((v) => v.name.toLowerCase().includes("female")) ||
          voices.find((v) => v.name.toLowerCase().includes("zira")) ||
          voices[1] ||
          voices[0]
        );
      }
    };

    const maleVoice = getVoice("male");
    const femaleVoice = getVoice("female");

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    if (Array.isArray(currentQuestion.context)) {
      for (let i = 0; i < currentQuestion.context.length; i++) {
        if (!isPlaying && !window.speechSynthesis.speaking && i > 0) break;

        const line = currentQuestion.context[i];
        const textToSpeak = `${line.speaker}. ${line.text}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);

        utterance.lang = "en-US";

        if (line.speaker === "Man") {
          utterance.voice = maleVoice;
          utterance.pitch = 0.9;
          utterance.rate = 0.95;
        } else if (line.speaker === "Woman") {
          utterance.voice = femaleVoice;
          utterance.pitch = 1.1;
          utterance.rate = 0.95;
        } else {
          utterance.voice = maleVoice;
          utterance.pitch = 1.0;
          utterance.rate = 0.9;
        }

        await new Promise((resolve) => {
          utterance.onend = resolve;
          utterance.onerror = resolve;
          window.speechSynthesis.speak(utterance);
        });

        await delay(400);
      }
    } else {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.context);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      utterance.voice = maleVoice;
      await new Promise((resolve) => {
        utterance.onend = resolve;
        utterance.onerror = resolve;
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
      const response = await fetch(
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
                content:
                  "Kamu adalah asisten guru bahasa Inggris. Berikan satu petunjuk singkat dalam bahasa Indonesia untuk membantu siswa menjawab soal tanpa memberikan jawaban langsung.",
              },
              {
                role: "user",
                content: `Soal: ${currentQuestion.question}\nKonteks: ${JSON.stringify(currentQuestion.context)}`,
              },
            ],
          }),
        },
      );

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setHint(data.choices[0].message.content);
        setShowHint(true);
      }
    } catch (error) {
      setHint("Gagal memuat petunjuk. Periksa API Key Groq Anda.");
      setShowHint(true);
    } finally {
      setIsHintLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f4f7fa] font-sans relative flex-1">
      <div className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center gap-4 z-20 shrink-0">
        <Link
          href="/home"
          className="text-slate-400 hover:text-slate-600 transition-colors bg-white p-2.5 rounded-2xl shadow-sm border border-slate-100"
        >
          <X className="w-5 h-5" strokeWidth={3} />
        </Link>

        <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-slate-300 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          ></motion.div>
        </div>

        <div className="flex items-center gap-2 font-black text-rose-500 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100">
          <Heart className="w-5 h-5 fill-rose-500" />
          <span className="text-base">{lives}</span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto overflow-y-auto no-scrollbar px-6 pb-12">
        <div
          className={`flex flex-col lg:flex-row gap-8 w-full transition-all duration-500 ${!isTranscriptVisible ? "justify-center" : ""}`}
        >
          <AnimatePresence>
            {currentQuestion.context && isTranscriptVisible && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "50%" }}
                exit={{
                  opacity: 0,
                  width: 0,
                  padding: 0,
                  margin: 0,
                  overflow: "hidden",
                }}
                className="w-full lg:w-1/2 flex flex-col bg-white rounded-[2rem] shadow-sm border border-slate-100 h-fit"
              >
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white rounded-t-[2rem]">
                  <div className="flex items-center gap-2">
                    {currentQuestion.contextType === "dialogue" ? (
                      <MessageSquare className="w-5 h-5 text-violet-500" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-violet-500" />
                    )}
                    <h2 className="font-extrabold text-slate-500 text-xs uppercase tracking-widest">
                      {currentQuestion.contextType === "dialogue"
                        ? "Transcript"
                        : currentQuestion.contextTitle}
                    </h2>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={playAudio}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${isPlaying ? "bg-rose-100 text-rose-600" : "bg-violet-100 text-violet-600 hover:bg-violet-200"}`}
                    >
                      {isPlaying ? (
                        <Square className="w-4 h-4 fill-current" />
                      ) : (
                        <PlayCircle className="w-4 h-4 fill-current" />
                      )}
                      {isPlaying ? "Stop" : "Play Audio"}
                    </button>
                    <button
                      onClick={() => setIsTranscriptVisible(false)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      <EyeOff className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-slate-50/30 rounded-b-[2rem]">
                  {currentQuestion.contextType === "dialogue" ? (
                    <div className="space-y-6">
                      {currentQuestion.context.map((line, i) => (
                        <div key={i} className="flex flex-col">
                          <span
                            className={`text-[10px] font-black uppercase tracking-widest mb-1 ${line.speaker === "Narrator" ? "text-violet-600" : "text-slate-400"}`}
                          >
                            {line.speaker}
                          </span>
                          <p
                            className={`text-[15px] font-medium leading-relaxed ${line.speaker === "Narrator" ? "text-slate-800 font-bold" : "text-slate-600"}`}
                          >
                            "{line.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-700 leading-loose text-base font-medium whitespace-pre-wrap">
                      {currentQuestion.context}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className={`flex flex-col pt-2 ${currentQuestion.context && isTranscriptVisible ? "w-full lg:w-1/2" : "w-full max-w-3xl"}`}
          >
            <AnimatePresence>
              {!isTranscriptVisible &&
                currentQuestion.contextType === "dialogue" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 flex flex-col items-center"
                  >
                    <button
                      onClick={playAudio}
                      className={`p-6 rounded-[2rem] shadow-lg border-b-[6px] transition-all active:translate-y-1 active:border-b-0 flex flex-col items-center gap-3 w-48
                      ${isPlaying ? "bg-rose-500 border-rose-600 text-white" : "bg-violet-500 border-violet-600 text-white hover:brightness-110"}`}
                    >
                      {isPlaying ? (
                        <Volume2 className="w-12 h-12 animate-pulse" />
                      ) : (
                        <PlayCircle className="w-12 h-12" />
                      )}
                      <span className="font-black tracking-widest text-sm">
                        {isPlaying ? "MENDENGARKAN..." : "PUTAR AUDIO"}
                      </span>
                    </button>
                    <button
                      onClick={() => setIsTranscriptVisible(true)}
                      className="mt-4 flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-sm"
                    >
                      <Eye className="w-4 h-4" /> Tampilkan Transkrip
                    </button>
                  </motion.div>
                )}
            </AnimatePresence>

            <h1 className="text-2xl font-extrabold text-slate-800 leading-snug mb-8">
              {currentQuestion.question}
            </h1>

            {showHint && hint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-800"
              >
                <Lightbulb className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">{hint}</p>
              </motion.div>
            )}

            <div className="flex flex-col gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.id;

                let btnStyle =
                  "bg-white border-slate-200 border-b-[6px] text-slate-600 hover:bg-slate-50 hover:border-slate-300";
                let iconStyle = "border-slate-200 text-slate-400 bg-slate-50";

                if (isSelected && status === "idle") {
                  btnStyle =
                    "bg-emerald-50 border-emerald-500 border-b-[6px] text-emerald-700";
                  iconStyle = "border-emerald-500 text-emerald-600 bg-white";
                } else if (isSelected && status === "correct") {
                  btnStyle =
                    "bg-emerald-100 border-emerald-500 border-b-[6px] text-emerald-700";
                  iconStyle = "border-emerald-500 text-emerald-600 bg-white";
                } else if (isSelected && status === "wrong") {
                  btnStyle =
                    "bg-rose-100 border-rose-500 border-b-[6px] text-rose-700";
                  iconStyle = "border-rose-500 text-rose-600 bg-white";
                } else if (!isSelected && status !== "idle") {
                  btnStyle =
                    "bg-white border-slate-200 border-2 text-slate-400 opacity-50";
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    disabled={status !== "idle"}
                    className={`relative w-full p-4 rounded-2xl border-2 flex items-center gap-5 text-left transition-all outline-none ${status === "idle" ? "active:translate-y-1 active:border-b-2" : ""} ${btnStyle}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-black border-2 transition-colors shrink-0 ${iconStyle}`}
                    >
                      {option.id}
                    </div>
                    <span className="font-extrabold text-[15px] leading-tight flex-1">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>

      <div
        className={`w-full border-t-2 z-50 sticky bottom-0 shrink-0 transition-colors duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]
        ${status === "correct" ? "bg-emerald-50 border-emerald-200" : status === "wrong" ? "bg-rose-50 border-rose-200" : "bg-white border-slate-100"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full sm:w-auto">
            <AnimatePresence mode="wait">
              {status === "correct" && (
                <motion.div
                  key="correct"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center gap-4 text-emerald-600"
                >
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-md shadow-emerald-200">
                    <Check className="w-7 h-7" strokeWidth={4} />
                  </div>
                  <div>
                    <h3 className="font-black text-2xl">Luar Biasa!</h3>
                  </div>
                </motion.div>
              )}

              {status === "wrong" && (
                <motion.div
                  key="wrong"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center gap-4 text-rose-500"
                >
                  <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-md shadow-rose-200">
                    <XCircle className="w-7 h-7" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">Jawaban Benar:</h3>
                    <p className="text-sm font-bold opacity-80 mt-0.5">
                      {
                        currentQuestion.options.find(
                          (o) => o.id === currentQuestion.correctAnswer,
                        )?.text
                      }
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
            {status === "idle" && (
              <>
                <button
                  onClick={getHint}
                  disabled={isHintLoading}
                  className="w-[calc(50%-0.375rem)] sm:w-32 py-3.5 rounded-2xl font-black text-[15px] uppercase tracking-widest transition-all outline-none bg-amber-100 text-amber-600 border-b-[4px] border-amber-300 hover:bg-amber-200 active:translate-y-1 active:border-b-0 flex items-center justify-center gap-2"
                >
                  {isHintLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Lightbulb className="w-5 h-5" />
                  )}
                  HINT
                </button>
                <button
                  onClick={handleNext}
                  className="w-[calc(50%-0.375rem)] sm:w-32 py-3.5 rounded-2xl font-black text-[15px] uppercase tracking-widest transition-all outline-none bg-slate-200 text-slate-500 border-b-[4px] border-slate-300 hover:bg-slate-300 active:translate-y-1 active:border-b-0"
                >
                  LEWATI
                </button>
              </>
            )}

            {status === "idle" ? (
              <button
                onClick={handleCheck}
                disabled={!selectedOption}
                className={`w-full sm:w-48 py-3.5 rounded-2xl font-black text-[15px] uppercase tracking-widest transition-all outline-none
                  ${
                    selectedOption
                      ? "bg-emerald-500 text-white border-b-[4px] border-emerald-700 hover:bg-emerald-400 active:translate-y-1 active:border-b-0"
                      : "bg-slate-200 text-slate-400 border-b-[4px] border-slate-300 cursor-not-allowed"
                  }`}
              >
                PERIKSA
              </button>
            ) : (
              <button
                onClick={handleNext}
                className={`w-full sm:w-48 py-3.5 rounded-2xl font-black text-[15px] uppercase tracking-widest transition-all outline-none active:translate-y-1 active:border-b-0
                  ${
                    status === "correct"
                      ? "bg-emerald-500 text-white border-b-[4px] border-emerald-700 hover:bg-emerald-400"
                      : "bg-rose-500 text-white border-b-[4px] border-rose-700 hover:bg-rose-400"
                  }`}
              >
                LANJUTKAN
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
