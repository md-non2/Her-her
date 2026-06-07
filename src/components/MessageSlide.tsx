import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, RotateCcw, Sparkles } from "lucide-react";

interface MessageSlideProps {
  letterText: string;
  onNext: () => void;
  onTypingStateChange: (isTyping: boolean) => void;
}

export default function MessageSlide({
  letterText,
  onNext,
  onTypingStateChange,
}: MessageSlideProps) {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [restartCount, setRestartCount] = useState(0);

  const textContainerRef = useRef<HTMLDivElement>(null);

  // Typewriter speed control configured for smooth high-end animation pacing
  const typingSpeedMs = 25; // slightly faster typing for smooth viewport experience

  // Track and run typing animation
  useEffect(() => {
    let active = true;
    let currentIndex = 0;
    setTypedText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      if (!active) return;
      if (currentIndex < letterText.length) {
        setTypedText((prev) => prev + letterText.charAt(currentIndex));
        currentIndex++;
        
        // Auto scroll to bottom during typing
        if (textContainerRef.current) {
          textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, typingSpeedMs);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [letterText, restartCount]);

  // Lock scrolling, swiping, touch gestures, and keyboard navigation while typing (mandatory)
  useEffect(() => {
    onTypingStateChange(isTyping);

    if (isTyping) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        // Only prevent navigation keys to keep standard typing scroll working
        if (["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(e.code)) {
          e.preventDefault();
        }
      };

      const handleScrollTouchWheel = (e: Event) => {
        // Let it scroll inside the textContainerRef if needed
        const target = e.target as HTMLElement;
        if (textContainerRef.current?.contains(target)) {
          return;
        }
        e.preventDefault();
      };

      window.addEventListener("keydown", handleKeyDown, { capture: true });
      window.addEventListener("wheel", handleScrollTouchWheel, { passive: false, capture: true });
      window.addEventListener("touchmove", handleScrollTouchWheel, { passive: false, capture: true });
      window.addEventListener("scroll", handleScrollTouchWheel, { passive: false, capture: true });

      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown, { capture: true });
        window.removeEventListener("wheel", handleScrollTouchWheel, { capture: true });
        window.removeEventListener("touchmove", handleScrollTouchWheel, { capture: true });
        window.removeEventListener("scroll", handleScrollTouchWheel, { capture: true });
      };
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [isTyping, onTypingStateChange]);

  const handleRestartTyping = () => {
    setRestartCount((prev) => prev + 1);
  };

  return (
    <div className="relative w-full max-w-2xl sm:max-w-3xl mx-auto px-4 h-full flex flex-col justify-between text-white font-sans z-25 overflow-hidden min-h-0">
      <div className="text-center mb-1.5 sm:mb-3 flex-shrink-0 flex flex-col items-center justify-center">
        <span className="whitespace-nowrap text-pink-500 font-display tracking-[0.2em] sm:tracking-[0.22em] text-[9px] sm:text-xs font-bold uppercase block px-4 py-0.5 border-b border-pink-500/10 mb-1.5 sm:mb-2 select-none">
          ✦ PRIVATE CORRESPONDENCE • অব্যক্ত কথার পত্রী ✉️ ✦
        </span>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-250 to-pink-300 drop-shadow-sm tracking-wide mt-0.5">
          মনের গহীন কোণ থেকে...
        </h2>
      </div>

      <div className="relative flex-grow min-h-0 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative premium-glass-card p-3.5 sm:p-5 rounded-2xl shadow-xl overflow-hidden border border-white/12 flex flex-col justify-between h-full max-h-full min-h-0"
          >
            {/* Elegant inner gold-gilted borders */}
            <div className="absolute top-2 left-2 right-2 bottom-2 border border-pink-500/10 rounded-xl pointer-events-none" />

            {/* Decorative envelope seal design */}
            <div className="absolute right-0 bottom-0 top-0 left-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-1.5 sm:space-y-3 flex flex-col h-full min-h-0">
              {/* Header of the letter */}
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping" />
                  <span className="font-serif text-[9px] sm:text-xs tracking-widest text-pink-300 select-none uppercase font-semibold">To Sneha • Dear Sneha</span>
                </div>
                <div className="flex gap-1.5">
                </div>
              </div>

              {/* Body of the letter: viewport-fitted & internal vertical scroll is active */}
              <div
                ref={textContainerRef}
                className="overflow-y-auto custom-scrollbar flex-grow min-h-0 pr-1.5 font-sans text-[10px] sm:text-[12px] md:text-[13.5px] text-pink-100/95 leading-relaxed whitespace-pre-wrap select-text selection:bg-pink-600 selection:text-white italic font-normal tracking-wide py-0.5"
              >
                {typedText}
                {isTyping && (
                  <span className="w-1.5 h-3 bg-pink-500 ml-0.5 inline-block animate-pulse align-middle" />
                )}
              </div>

              {/* Footer seal */}
              <div className="flex justify-between items-center pt-1.5 border-t border-white/10 text-[8.5px] sm:text-[9.5px] text-slate-400 font-display tracking-wider uppercase font-semibold flex-shrink-0">
                <span>শুভাকাঙ্ক্ষী...</span>
                <div className="flex items-center gap-1 text-pink-400">
                  <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-pink-500 text-pink-500 animate-pulse-gentle" /> Always Beside You ✨
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mandatory Navigation button (only displays when typing completes) */}
      <div className="h-8 mt-1.5 sm:mt-2.5 flex items-center justify-center relative z-40 flex-shrink-0">
        <AnimatePresence>
          {!isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={onNext}
                className="bg-gradient-to-r from-pink-650 via-[#db2777] to-[#800735] hover:from-pink-555 hover:to-purple-900 text-white font-display text-[9px] sm:text-2xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1 mx-auto cursor-pointer border border-pink-400/25"
              >
                শেষ বার্তা • See Final Message <Sparkles className="w-3 h-3 text-pink-300 animate-pulse" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
