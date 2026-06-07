import React from "react";
import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";

interface IntroSlideProps {
  partnerName: string;
  partnerCompliment: string;
  onUpdateNameAndCompliment: (name: string, compliment: string) => void;
  onNext: () => void;
}

export default function IntroSlide({
  partnerName,
  partnerCompliment,
  onNext,
}: IntroSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto text-center px-3 sm:px-6 relative overflow-y-auto custom-scrollbar min-h-0">
      {/* Absolute decorative floating hearts on the sides that are guaranteed not to be covered */}
      <div className="absolute left-[-2rem] top-1/4 text-pink-500/20 z-10 animate-bounce duration-[8s] pointer-events-none hidden md:block">
        <Heart className="w-16 h-16 fill-pink-500/10 text-pink-500/20" />
      </div>
      <div className="absolute right-[-2.5rem] bottom-1/3 text-purple-500/20 z-10 animate-pulse duration-[10s] pointer-events-none hidden md:block">
        <Heart className="w-20 h-20 fill-purple-600/10 text-purple-500/20" />
      </div>

      {/* Main Luxury Presentation Area with integrated elements */}
      <div className="premium-glass-card p-3.5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl w-full border border-white/10 relative z-20 shadow-[0_0_40px_rgba(30,10,60,0.25)] flex flex-col justify-center max-h-full overflow-y-auto custom-scrollbar min-h-0">
        {/* Soft, rich ambient radial lighting overlay inside card */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-44 sm:h-44 bg-gradient-to-br from-pink-500/10 to-purple-500/0 rounded-full blur-[40px] sm:blur-[60px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-44 sm:h-44 bg-gradient-to-tr from-violet-500/10 to-transparent rounded-full blur-[40px] sm:blur-[60px] pointer-events-none" />

        {/* Delicate Golden Filigree borders to convey the luxury theme */}
        <div className="absolute top-2 left-2 right-2 bottom-2 sm:top-3 sm:left-3 sm:right-3 sm:bottom-3 border border-pink-500/12 rounded-[14px] sm:rounded-[18px] pointer-events-none" />
        <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 sm:top-4 sm:left-4 sm:right-4 sm:bottom-4 border border-purple-500/5 rounded-[12px] sm:rounded-[16px] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-center items-center py-2.5 sm:py-4 gap-2.5 sm:gap-5 min-h-0">
          {/* Decorative Floating Luxury Aura Element integrated inside card to prevent overflow on mobile devices */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-pink-500/80 drop-shadow-[0_0_12px_rgba(219,39,119,0.35)] relative z-10 flex-shrink-0 animate-pulse-gentle mb-0.5"
          >
            <Heart className="w-4.5 h-4.5 sm:w-7 sm:h-7 fill-pink-500/90 text-pink-400" />
          </motion.div>
          {/* Beautifully framed welcome avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full mx-auto p-0.5 bg-gradient-to-tr from-pink-500 via-rose-500/20 to-purple-600 shadow-[0_0_20px_rgba(219,39,119,0.3)] group overflow-hidden flex-shrink-0"
          >
            <div className="w-full h-full rounded-full overflow-hidden border border-white/15 bg-[#030008]">
              <img
                src="/WhatsApp Image 2026-06-07 at 12.58.00 AM.jpeg"
                alt="Sneha Welcome Picture"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2 px-2 select-none text-center"
          >
            <span className="whitespace-normal px-2 text-[10px] sm:text-2xs tracking-[0.1em] sm:tracking-[0.22em] text-gold-gradient font-display uppercase block font-semibold leading-relaxed">
              ❤️ A Beautiful Story Rediscovered • অনন্ত বন্ধন ❤️
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-250 to-pink-300 font-bold tracking-wide drop-shadow-[0_2px_12px_rgba(219,39,119,0.3)] leading-tight">
              {partnerName || "Sneha"}
            </h1>
          </motion.div>

          {/* Premium elegant calligraphy-style text paragraph */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="max-w-md mx-auto relative px-6 py-1 w-full"
          >
            <span className="absolute top-[-8px] left-0 text-2xl sm:text-3xl text-pink-500/25 font-serif select-none">❝</span>
            <p className="text-slate-350 leading-relaxed text-xs sm:text-sm font-sans font-light tracking-wide italic select-text px-4 text-center">
              {partnerCompliment || "Our connection is a beautiful star in the sky."}
            </p>
            <span className="absolute bottom-[-8px] right-0 text-2xl sm:text-3xl text-pink-500/25 font-serif select-none">❞</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="pt-2"
          >
            <button
              id="enter-world-btn"
              onClick={onNext}
              className="relative group inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3.5 text-[10px] sm:text-2xs font-bold tracking-[0.2em] text-white uppercase transition-all duration-500 rounded-full overflow-hidden bg-gradient-to-r from-pink-600 via-rose-600 to-purple-800 shadow-[0_0_15px_rgba(219,39,119,0.3)] hover:shadow-[0_0_30px_rgba(219,39,119,0.6)] hover:scale-[1.03] active:scale-95 cursor-pointer border border-pink-400/25"
            >
              {/* Premium cinematic white light beam swipe on hover */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 -translate-x-full group-hover:translate-x-full ease-out" />
              <span className="relative flex items-center gap-1.5 font-display">
                Enter Our Story Room <Sparkles className="w-3 h-3 text-pink-300 animate-pulse" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
