import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Unlock, Calendar, ArrowRight, Sparkles, CheckCircle2, Heart } from "lucide-react";
import { StoryDay } from "../types";

interface StorySlideProps {
  days: StoryDay[];
  onCompleteStory: () => void;
  onNext: () => void;
}

export default function StorySlide({ days, onCompleteStory, onNext }: StorySlideProps) {
  // Local state for tracking unlocks in this specific session.
  // We force reset it to [true, false, false, false, false, false, false] on mount.
  const [unlockedDays, setUnlockedDays] = useState<boolean[]>([
    true,   // Day 1
    false,  // Day 2
    false,  // Day 3
    false,  // Day 4
    false,  // Day 5
    false,  // Day 6
    false   // Day 7
  ]);

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [showCelebratoryOverlay, setShowCelebratoryOverlay] = useState<boolean>(false);

  // High performance text chunk list & completion state
  const [sentences, setSentences] = useState<string[]>([]);
  const [isDayCompleted, setIsDayCompleted] = useState<boolean>(false);

  // Parse story text into sentences cleanly
  const getSentences = (text: string) => {
    const punctuation = /[।?!.\n]/;
    const parts: string[] = [];
    let current = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      current += char;
      if (punctuation.test(char)) {
        if (current.trim()) {
          parts.push(current.trim());
        }
        current = "";
      }
    }
    if (current.trim()) {
      parts.push(current.trim());
    }
    return parts;
  };

  const handleDaySelect = (index: number) => {
    if (unlockedDays[index]) {
      setSelectedDayIndex(index);
    }
  };

  // Re-build text segments instantly when selecting a different day
  useEffect(() => {
    const storyText = days[selectedDayIndex]?.story || "";
    const parsedSentences = getSentences(storyText);
    setSentences(parsedSentences);
    setIsDayCompleted(true);
  }, [selectedDayIndex, days]);

  // Unlock next day in local progression and switch to it
  const handleUnlockAndGoToNext = () => {
    const nextIndex = selectedDayIndex + 1;
    if (nextIndex < days.length) {
      setUnlockedDays((prev) => {
        const next = [...prev];
        next[nextIndex] = true;
        return next;
      });
      setSelectedDayIndex(nextIndex);
    }
  };

  const activeDay = days[selectedDayIndex];
  const allCompleted = unlockedDays[6] && isDayCompleted && selectedDayIndex === 6;

  return (
    <div className="max-w-5xl mx-auto px-4 h-full w-full flex flex-col justify-between text-white font-sans overflow-hidden min-h-0">
      {/* Top Title Section with Premium Layout & Compact Margin */}
      <div className="text-center mb-1.5 sm:mb-3 flex-shrink-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="whitespace-nowrap text-pink-500 font-display tracking-[0.2em] sm:tracking-[0.22em] text-[9px] sm:text-xs font-bold uppercase block px-4 py-0.5 border-b border-pink-500/10 mb-1.5 sm:mb-2 select-none"
        >
          ✦ OUR EXQUISITE CHRONICLE • আমাদের অনন্য অধ্যায়সমূহ ✦
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-250 to-pink-300 drop-shadow-sm tracking-wide"
        >
          আমাদের প্রথম ৭ দিনের কাহিনীর মালা
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 items-stretch flex-grow overflow-hidden min-h-0">
        {/* Days Left Sidebar list */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-1 sm:gap-1.5 overflow-x-auto lg:overflow-y-auto lg:overflow-x-visible pb-1 lg:pb-0 scrollbar-none snap-x flex-shrink-0 lg:max-h-full justify-center items-center lg:items-stretch py-0.5">
          {days.map((d, idx) => {
            // Only render the currently active day button!
            if (idx !== selectedDayIndex) {
              return null;
            }
            const isCurrentlySelected = selectedDayIndex === idx;

            return (
              <button
                key={d.day}
                onClick={() => handleDaySelect(idx)}
                className="snap-center shrink-0 w-full max-w-[280px] lg:w-full flex items-center justify-between px-3.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl border border-pink-500 text-pink-200 bg-gradient-to-r from-[#210c42]/85 to-[#0e031e]/95 shadow-[0_0_12px_rgba(219,39,119,0.25)] scale-[1.01] text-left group relative overflow-hidden select-none"
              >
                {/* Visual side marker */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500" />

                <div className="flex items-center gap-2.5 sm:gap-3 w-full">
                  <span className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-[0_0_6px_rgba(219,39,119,0.3)] scale-110">
                    {d.day}
                  </span>
                  <div className="flex-grow min-w-0">
                    <div className="text-[8.5px] sm:text-[10px] font-bold leading-tight uppercase tracking-wider font-display flex items-center gap-1 text-pink-400">
                      Active Chapter <span className="animate-pulse">✨</span>
                    </div>
                    <div className="text-[8px] sm:text-[9.5px] text-slate-300 truncate w-32 sm:w-44 font-light mt-0.5">
                      Day {d.day}: {d.title}
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block ml-1.5">
                  <Unlock className="w-3.5 h-3.5 text-pink-400 opacity-80 group-hover:opacity-100 transition-opacity animate-pulse-gentle" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Story Focus Panel on the right */}
        <div className="lg:col-span-8 flex flex-col min-h-0 h-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDayIndex}
              initial={{ opacity: 0, scale: 0.98, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -5 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="premium-glass-card p-3.5 sm:p-5 rounded-2xl shadow-xl relative flex flex-col justify-between border border-white/10 overflow-hidden h-full min-h-0 flex-grow"
            >
              {/* Subtle background golden filigree line */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-pink-500/5 rounded-xl pointer-events-none" />

              {/* Background watermark */}
              <div className="absolute right-3 top-3 text-pink-500/2 select-none pointer-events-none">
                <Calendar className="w-16 h-16 sm:w-24 sm:h-24" />
              </div>

              <div className="relative z-10 flex-grow flex flex-col min-h-0 justify-center">
                <div className="flex items-center justify-between mb-1">
                  <span className="bg-pink-500/10 border border-pink-500/25 text-pink-300 rounded-full px-2.5 py-0.5 text-[7.5px] sm:text-[9px] font-display flex items-center gap-1 font-semibold tracking-widest uppercase">
                    <Sparkles className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-pink-400 animate-pulse" /> Day {activeDay.day} • {activeDay.day === 7 ? "Sublime Destination" : "Sweet Chapter"}
                  </span>
                </div>

                <h3 className="text-xs sm:text-base md:text-lg font-serif font-bold text-pink-300 mb-1 sm:mb-2 tracking-wide leading-snug drop-shadow-sm">
                  {activeDay.title}
                </h3>

                {/* Custom list of sentences rendering area with fast beautiful staggered animation */}
                <div className="overflow-y-auto custom-scrollbar flex-grow min-h-0 pr-1 max-h-[42vh] sm:max-h-[48vh] lg:max-h-[52vh]">
                  <div className="space-y-1.5 sm:space-y-2">
                    {sentences.map((s, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.04 }}
                        className="text-slate-200 font-sans font-normal text-[10px] sm:text-[12.5px] md:text-[14px] leading-relaxed whitespace-pre-line"
                      >
                        {s}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="border-t border-white/10 pt-2.5 mt-2.5 flex flex-row justify-between items-center gap-2 relative z-20 flex-shrink-0">
                <div className="text-[8px] sm:text-[10px] text-slate-400 flex items-center gap-1 uppercase tracking-wide">
                  {allCompleted ? (
                    <span className="text-pink-300 flex items-center gap-1 font-bold font-display animate-bounce">
                      <Sparkles className="w-3 h-3 text-pink-400" /> শুভ সমাপ্তি! মহাযাত্রার দ্বারে দাঁড়িয়ে...
                    </span>
                  ) : isDayCompleted ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-bold font-display">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> অধ্যায়টি সম্পূর্ণ পঠিত
                    </span>
                  ) : (
                    <span className="text-pink-400 flex items-center gap-1 font-bold font-display animate-pulse-gentle">
                      ✍️ পাঠোদ্ধার চলছে... অপেক্ষা করুন
                    </span>
                  )}
                </div>

                <div className="flex gap-1.5">
                  {isDayCompleted && selectedDayIndex < 6 && (
                    <button
                      onClick={handleUnlockAndGoToNext}
                      className="bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 text-white font-display text-[8.5px] sm:text-[10px] font-bold tracking-[0.05em] px-3.5 py-1.5 sm:px-4.5 sm:py-2 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1 cursor-pointer border border-pink-400/20"
                    >
                      Continue to Day {selectedDayIndex + 2} <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  {allCompleted && (
                    <button
                      onClick={() => setShowCelebratoryOverlay(true)}
                      className="bg-gradient-to-r from-emerald-600 via-rose-600 to-purple-800 hover:from-emerald-500 hover:to-purple-700 text-white font-display text-[9px] sm:text-xs font-bold tracking-[0.1em] px-4.5 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.8)] hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer border border-pink-400/25 animate-pulse-gentle"
                    >
                      Continue Journey <Heart className="w-3.5 h-3.5 text-emerald-300 fill-emerald-300 animate-pulse" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Cinematic Overlay celebration when Day 7 completes */}
          <AnimatePresence>
            {showCelebratoryOverlay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#06010ff0] z-30 rounded-2xl flex flex-col justify-center items-center p-6 text-center border border-pink-500/30"
              >
                {/* Embedded floating hearts/visual fireworks for high-end luxury feel */}
                <div className="absolute top-10 left-10 text-pink-500/20 animate-bounce duration-1000">
                  <Heart className="w-12 h-12 fill-pink-500" />
                </div>
                <div className="absolute bottom-10 right-10 text-purple-500/25 animate-pulse">
                  <Heart className="w-16 h-16 fill-purple-600" />
                </div>
                <div className="absolute top-1/4 right-1/4 text-rose-500/15 animate-bounce delay-300">
                  <Sparkles className="w-8 h-8" />
                </div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                  className="space-y-4 max-w-md relative z-10"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(219,39,119,0.5)]">
                    <Sparkles className="w-7 h-7 text-white animate-spin" style={{ animationDuration: "12s" }} />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200">
                    আমাদের গল্প সম্পূর্ণ হয়েছে ✨
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                    আমরা অলিখিত ৭ দিনের প্রতিটি সরণি সফলভাবে অতিক্রম করেছি। রোবলক্সের চঞ্চল আড্ডা থেকে শুরু করে আজ হৃদয়ের এক মায়াবী কুঠিরে আমাদের এই ৭ দিন এক রূপকথার মতো।
                  </p>
                  <p className="text-pink-400 font-display uppercase tracking-widest text-[9px] sm:text-2xs font-bold bg-pink-500/10 border border-pink-500/30 rounded-full px-3 py-1 inline-block">
                    💞 অনন্ত বন্ধনে স্বাগত স্নেহা 💞
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onCompleteStory}
                      className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-800 hover:from-pink-500 hover:to-purple-700 text-white font-display text-[11px] sm:text-xs font-bold tracking-[0.15em] uppercase px-8 py-3 rounded-full shadow-[0_0_25px_rgba(219,39,119,0.55)] hover:shadow-[0_0_40px_rgba(219,39,119,0.85)] hover:scale-[1.03] active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer border border-pink-400/30"
                    >
                      Continue Journey <Heart className="w-4 h-4 text-pink-300 fill-pink-300 animate-pulse" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
