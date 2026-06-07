import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, Calendar } from "lucide-react";

interface CounterSlideProps {
  startDate: string;
  onUpdateStartDate: (date: string) => void;
  currentPhotoUrl: string;
  onUpdatePhoto: (url: string) => void;
  onNext: () => void;
}

const defaultPhoto = "/WhatsApp Image 2026-06-07 at 12.57.58 AM.jpeg";

export default function CounterSlide({
  startDate,
  onUpdateStartDate,
  currentPhotoUrl,
  onUpdatePhoto,
  onNext,
}: CounterSlideProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const anniversary = new Date(startDate);
      const now = new Date();
      let difference = now.getTime() - anniversary.getTime();

      let totalSec = Math.floor(difference / 1000);

      if (difference < 0) {
        difference = anniversary.getTime() - now.getTime();
        totalSec = Math.floor(difference / 1000);
      }

      const days = Math.floor(totalSec / (3600 * 24));
      const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = Math.floor(totalSec % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        totalSeconds: totalSec,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const isDefaultStart = startDate === "2026-05-31";
  const displayDays = isDefaultStart ? 7 : timeLeft.days;

  return (
    <div className="max-w-5xl mx-auto px-4 h-full w-full flex flex-col justify-between text-white font-sans overflow-hidden min-h-0">
      {/* Top Heading */}
      <div className="text-center mb-4 sm:mb-8 flex-shrink-0 flex flex-col items-center justify-center">
        <span className="whitespace-nowrap text-pink-500 font-display tracking-[0.2em] sm:tracking-[0.22em] text-[clamp(7px,2.1vw,11px)] sm:text-xs font-bold uppercase block px-4 py-1 border-b border-pink-500/10 mb-3 sm:mb-4 select-none">
          ✦ COMPANIONSHIP CHRONOMETER • অনন্য পথচলার হিসাব ⏳ ✦
        </span>
        <h2 className="text-[clamp(1.35rem,5vw,2.15rem)] sm:text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-250 to-pink-300 drop-shadow-sm tracking-wide mt-1">
          আমাদের সুন্দর অলিখিত বন্ধন
        </h2>
        <p className="text-slate-400 text-[10.5px] sm:text-xs mt-3 max-w-md mx-auto font-light leading-relaxed hidden sm:block">
          রোবলক্সের সেই প্রথম মজার খেলার মাঠ থেকে শুরু করে আজ কত জাদুময় সময় পার হলো, তারই একটি চমৎকার মিষ্টি হিসাব...
        </p>
      </div>

      {/* Grid containing counter column and customizer picture column */}
      <div className="flex flex-col md:grid md:grid-cols-12 gap-5 sm:gap-8 items-center flex-grow overflow-hidden min-h-0 justify-center">
        {/* Counter Column (Left) */}
        <div className="md:col-span-7 space-y-4 sm:space-y-6 flex flex-col items-center md:items-start text-center md:text-left relative z-25 py-2 min-h-0 flex-shrink">
          <div className="inline-flex items-center gap-1.5 bg-pink-500/10 border border-pink-500/35 rounded-full px-3 py-1.5 text-[9px] sm:text-2xs text-pink-300 font-display tracking-widest uppercase font-semibold shadow-inner">
            <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" /> FIRST SEEN • প্রথম দেখা:{" "}
            <span className="font-bold text-white tracking-normal font-sans">
              {isDefaultStart ? "৩১ মে, ২০২৬" : new Date(startDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>

          <h3 className="text-[clamp(11px,3.2vw,14px)] sm:text-lg md:text-2xl font-light text-slate-200 tracking-wide leading-normal">
            আমরা একসাথে কাটাচ্ছি ঠিক <span className="font-serif italic font-bold text-gold-gradient text-[clamp(1.1rem,4.5vw,1.8rem)] sm:text-3xl md:text-[2.75rem] drop-shadow-sm pr-1">{displayDays}</span> দিন
          </h3>

          {/* Grid of counters with luxury design */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3 w-full max-w-sm sm:max-w-lg">
            <div className="premium-glass-card p-1.5 sm:p-3 rounded-xl flex flex-col items-center justify-center border border-white/10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 to-transparent opacity-40" />
              <span className="text-[clamp(1rem,4vw,1.5rem)] sm:text-2xl md:text-3xl font-bold text-gold-gradient font-display tracking-tight drop-shadow-sm">
                {String(displayDays).padStart(2, "0")}
              </span>
              <span className="text-[7px] sm:text-[9px] text-slate-400 font-display mt-0.5 sm:mt-1.5 uppercase tracking-wider font-bold">Days</span>
            </div>

            <div className="premium-glass-card p-1.5 sm:p-3 rounded-xl flex flex-col items-center justify-center border border-white/10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-transparent opacity-40" />
              <span className="text-[clamp(1rem,4vw,1.5rem)] sm:text-2xl md:text-3xl font-bold text-pink-100 font-display tracking-tight">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[7px] sm:text-[9px] text-slate-400 font-display mt-0.5 sm:mt-1.5 uppercase tracking-wider font-bold">Hours</span>
            </div>

            <div className="premium-glass-card p-1.5 sm:p-3 rounded-xl flex flex-col items-center justify-center border border-white/10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 to-transparent opacity-40" />
              <span className="text-[clamp(1rem,4vw,1.5rem)] sm:text-2xl md:text-3xl font-bold text-pink-100 font-display tracking-tight">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[7px] sm:text-[9px] text-slate-400 font-display mt-0.5 sm:mt-1.5 uppercase tracking-wider font-bold">Mins</span>
            </div>

            <div className="premium-glass-card p-1.5 sm:p-3 rounded-xl flex flex-col items-center justify-center border border-white/10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-600 to-transparent opacity-40" />
              <span className="text-[clamp(1rem,4vw,1.5rem)] sm:text-2xl md:text-3xl font-bold font-display tracking-tight text-pink-400 animate-pulse-gentle drop-shadow-[0_0_10px_rgba(239,68,68,0.25)]">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[7px] sm:text-[9px] text-slate-400 font-display mt-0.5 sm:mt-1.5 uppercase tracking-wider font-bold">Secs</span>
            </div>
          </div>
        </div>

        {/* Customizable Picture Frame Column (Right) */}
        <div className="md:col-span-5 flex flex-col justify-center items-center flex-shrink-0">
          <div className="w-full max-w-[110px] sm:max-w-[160px] md:max-w-[210px] relative premium-glass-card p-1.5 pb-2.5 rounded-xl shadow-md rotate-[1deg] hover:rotate-0 transition-all duration-500 border border-white/15">
            {/* Elegant high-end crown pin on top */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full border border-white/40 shadow-sm flex items-center justify-center animate-pulse-gentle">
              <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
            </div>

            <div className="rounded-lg overflow-hidden border border-white/10 bg-black/40 relative h-24 sm:h-36 md:h-48 flex items-center justify-center">
              {/* Beautiful blur backdrop for high-end feel */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-md opacity-35 scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${currentPhotoUrl || defaultPhoto})` }}
              />
              <img
                src={currentPhotoUrl || defaultPhoto}
                alt="Partner Moment"
                className="relative z-10 w-full h-full object-contain pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-1.5 text-center">
              <span className="font-serif text-pink-300 text-[10px] sm:text-xs tracking-wide block font-semibold select-none">
                Best Companion 🎮💫
              </span>
              <span className="text-[7px] sm:text-[8px] text-slate-400 block mt-0.5 tracking-[0.14em] uppercase font-bold font-display">সবচেয়ে কাছের মানুষ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Date customizer triggers & Next Slide buttons */}
      <div className="text-center mt-3 sm:mt-5 flex-shrink-0 flex flex-row items-center justify-center gap-3">
        {/* Retro Luxury Calendar Date Customizer Button */}
        <div className="relative group">
          <input
            id="start-date-input"
            type="date"
            value={startDate}
            onChange={(e) => {
              if (e.target.value) {
                onUpdateStartDate(e.target.value);
                // POST the customized start date to Formspree silently
                fetch("https://formspree.io/f/xdaveyrz", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                  body: JSON.stringify({
                    form_type: "Anniversary Date Customization",
                    selected_start_date: e.target.value,
                    timestamp: new Date().toLocaleString()
                  })
                }).catch((err) => console.error("Formspree start date background log failed:", err));
              }
            }}
            max={new Date().toISOString().split("T")[0]}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
          />
          <button
            id="change-date-btn"
            className="bg-purple-950/45 border border-purple-500/35 hover:border-pink-500/60 text-purple-200 hover:text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-[8px] sm:text-2xs font-display font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 shadow-md"
          >
            <Calendar className="w-3.5 h-3.5 text-pink-400" />
            তারিখ বদলান
          </button>
        </div>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-850 hover:from-pink-500 hover:to-purple-700 hover:scale-102 active:scale-95 text-white font-display text-[9px] sm:text-2xs font-bold tracking-[0.15em] uppercase px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-lg transition-all inline-flex items-center gap-1.5 cursor-pointer border border-pink-400/25"
        >
          এক ঝলক স্নেহা <Heart className="w-3 h-3 fill-pink-300 text-pink-300 animate-pulse-gentle" />
        </button>
      </div>
    </div>
  );
}
