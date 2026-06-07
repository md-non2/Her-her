import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { GalleryItem } from "../types";

interface GallerySlideProps {
  galleryItems: GalleryItem[];
  onUpdateGalleryItems: (items: GalleryItem[]) => void;
  onNext: () => void;
}

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  size: number;
  duration: number;
}

export default function GallerySlide({
  galleryItems,
  onNext,
}: GallerySlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCollage, setShowCollage] = useState(false);

  // Typewriter speed and states
  const [displayedText, setDisplayedText] = useState("");
  const [typerFinished, setTyperFinished] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const presetCompliments = [
    "প্রথম দেখাতেই তোমার চোখের মায়ায় হারিয়ে গিয়েছিলাম...",
    "তোমার মিষ্টি হাসি আমার সবচেয়ে প্রিয় দৃশ্য...",
    "তুমি শুধু সুন্দর নও, তুমি আমার সবচেয়ে প্রিয় মানুষ...",
    "তোমার মাঝে এমন কিছু আছে যা তোমাকে সবার থেকে আলাদা করে...",
    "I can find infinite beauty in this world, but mine only seeks yours..."
  ];

  const defaultPlaceholders = [
    "WhatsApp Image 2026-06-07 at 12.57.58 AM (1).jpeg",
    "WhatsApp Image 2026-06-07 at 12.57.58 AM.jpeg",
    "WhatsApp Image 2026-06-07 at 12.57.59 AM (1).jpeg",
    "WhatsApp Image 2026-06-07 at 12.57.59 AM (2).jpeg",
    "https://picsum.photos/seed/sparklingmoment/400/400",
  ];

  // Particle emission setups on collage screen
  useEffect(() => {
    if (showCollage) {
      const generatedHearts = Array.from({ length: 15 }, (_, idx) => ({
        id: idx,
        left: Math.random() * 95, 
        delay: Math.random() * 4,
        size: Math.random() * 10 + 8, // classy small heart particles
        duration: Math.random() * 6 + 5, 
      }));
      setHearts(generatedHearts);
    } else {
      setHearts([]);
    }
  }, [showCollage]);

  // Run Typewriter Effect on currentIndex changes
  useEffect(() => {
    if (showCollage) return;

    setDisplayedText("");
    setTyperFinished(false);

    const targetText = galleryItems[currentIndex]?.compliment || presetCompliments[currentIndex] || "";
    if (!targetText) {
      setTyperFinished(true);
      return;
    }

    let progress = 0;
    const intervalTime = 40; // sleek fast typing
    
    const timer = setInterval(() => {
      progress += 1;
      setDisplayedText(targetText.slice(0, progress));
      if (progress >= targetText.length) {
        clearInterval(timer);
        setTyperFinished(true);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentIndex, showCollage, galleryItems]);

  const handleNextMedia = () => {
    if (currentIndex < 4) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowCollage(true);
    }
  };

  const handlePrevMedia = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetSlideshow = () => {
    setCurrentIndex(0);
    setShowCollage(false);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 h-full flex flex-col justify-between text-white font-sans overflow-hidden z-10 min-h-0">
      
      {/* Background Floating particles & subtle lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#040108]/20">
        <div className="absolute top-12 left-1/4 w-60 h-60 rounded-full bg-pink-500/[0.03] blur-[100px]" />
        <div className="absolute bottom-12 right-1/4 w-72 h-72 rounded-full bg-purple-700/[0.04] blur-[110px]" />
      </div>

      {/* Collage Hearts particles animation */}
      {showCollage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ y: "110vh", opacity: 0, x: `${h.left}vw` }}
              animate={{
                y: "-15vh",
                opacity: [0, 0.6, 0.6, 0],
                x: [`${h.left}vw`, `${h.left + (h.id % 2 === 0 ? 2 : -2)}vw`],
              }}
              transition={{
                duration: h.duration,
                delay: h.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute text-rose-500/10 select-none font-sans drop-shadow-[0_0_8px_rgba(219,39,119,0.2)]"
              style={{ fontSize: h.size }}
            >
              ♥
            </motion.div>
          ))}
        </div>
      )}

      {/* Header controls and toggle with premium luxury look is now elevated with ample spacer padding */}
      <div className="relative z-10 flex flex-row items-center justify-between gap-4 border-b border-pink-500/10 pb-3 mb-4 sm:mb-6 flex-shrink-0">
        <div className="min-w-0 flex-1">
          <span className="whitespace-nowrap text-pink-500 font-display tracking-[0.2em] sm:tracking-[0.22em] text-[clamp(7px,2.1vw,11px)] sm:text-xs font-bold uppercase block mb-1.5 select-none">
            ✦ HIGH-PREMIUM GALLERY • মেঘের আভাস 🌹 ✦
          </span>
          <h2 className="text-sm sm:text-lg md:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-rose-250 to-pink-300 drop-shadow-sm flex items-center gap-1.5 tracking-wide">
            এক ঝলক স্নেহা <Heart className="w-4 h-4 text-pink-400 fill-pink-500 animate-pulse flex-shrink-0" />
          </h2>
        </div>

        {/* Action Toggle buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
        </div>
      </div>

      <div className="relative z-10 flex-grow flex flex-col justify-center min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {showCollage ? (
            <motion.div
              key="collage-board"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto w-full py-1 flex flex-col h-full justify-between overflow-hidden"
            >
              <div className="flex-shrink-0">
                <motion.h3 
                  initial={{ scale: 0.99 }}
                  animate={{ scale: [0.99, 1.01, 0.99] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="font-serif text-lg sm:text-2xl md:text-3xl text-gold-gradient font-bold select-none tracking-medium"
                >
                  তুমি আমার জীবনের সবচেয়ে সুন্দর অধ্যায় ❤️
                </motion.h3>
                <p className="text-slate-400 font-sans text-[10px] sm:text-xs mt-0.5 max-w-md mx-auto font-light hidden sm:block">
                  প্রতিটি পাতায় শুধু তোমার মায়াময় মিষ্টি হাসিকেই পরম যত্নে হৃদয়ের ফ্রেমে আগলে রাখবো।
                </p>
              </div>

              {/* Asymmetric Elegant Collage grid that scales flawlessly */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3.5 px-1 relative my-2 overflow-y-auto custom-scrollbar max-h-[25vh] sm:max-h-[30vh]">
                {galleryItems.map((item, idx) => {
                  const rotationAngle = idx % 2 === 0 ? (idx === 0 ? -2 : -1) : (idx === 1 ? 2 : 1);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15, rotate: rotationAngle }}
                      animate={{ opacity: 1, y: 0, rotate: rotationAngle }}
                      whileHover={{ 
                        y: -5, 
                        scale: 1.05, 
                        rotate: 0, 
                        zIndex: 30,
                        transition: { duration: 0.2 }
                      }}
                      className="bg-[#030008]/50 border border-white/10 p-1.5 sm:p-2.5 rounded-xl shadow-md backdrop-blur-md flex flex-col justify-between group cursor-pointer transition-all hover:bg-[#070014]/75 hover:border-pink-500/50 hover:shadow-[0_10px_20px_rgba(219,39,119,0.15)] relative overflow-hidden h-fit"
                    >
                      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-pink-500/40 via-purple-500/30 to-transparent" />

                      <div className="relative aspect-square overflow-hidden rounded-lg bg-black/40 border border-white/5">
                        <img
                          src={item.url || defaultPlaceholders[idx]}
                          className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-out group-hover:scale-108"
                          alt={`Collage Item ${idx + 1}`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-center pt-1.5 pb-0.5 select-none font-sans text-[8px] sm:text-[9px] text-pink-200/90 font-semibold tracking-wider uppercase truncate">
                        {item.compliment || `স্মৃতি ${idx + 1}`}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Button: একটি গোপন বার্তা ✨ */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center flex-shrink-0"
              >
                <button
                  onClick={onNext}
                  className="bg-gradient-to-r from-pink-650 via-rose-600 to-purple-850 hover:from-pink-500 hover:to-purple-750 text-white font-display text-[9px] sm:text-2xs font-bold tracking-[0.15em] uppercase px-5 py-2 sm:px-6 sm:py-3 rounded-full shadow-md border border-pink-400/25 flex items-center gap-1.5 mx-auto cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                >
                  গোপন চিঠিটি পড়ুন <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                </button>
              </motion.div>
            </motion.div>
          )

          /* CINEMATIC SLIDESHOW MODE */
          : (
            <motion.div
              key="slideshow-panel"
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-md mx-auto w-full text-center flex flex-col h-full justify-between items-center relative z-20 overflow-hidden"
            >
              
              {/* Cinematic Indicator Dots */}
              <div className="flex items-center gap-1.5 mb-2.5 relative z-10 flex-shrink-0">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                    }}
                    className={`transition-all duration-350 rounded-full h-1 sm:h-1.5 ${
                      idx === currentIndex 
                        ? "bg-pink-500 w-5 sm:w-7 shadow-[0_0_8px_rgba(219,39,119,0.7)]" 
                        : "bg-white/15 w-1.5 sm:w-2 hover:bg-white/35"
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Main Photo Polaroid Frame */}
              <div className="w-full relative px-8 flex-grow flex items-center justify-center min-h-0">
                
                {/* Arrow Navigation (Left) */}
                {currentIndex > 0 && (
                  <button
                    onClick={handlePrevMedia}
                    className="absolute left-[2px] top-1/2 -translate-y-1/2 z-20 bg-[#030008]/60 border border-white/10 p-1.5 rounded-full text-pink-300 hover:text-white hover:bg-pink-650/35 transition-all cursor-pointer backdrop-blur-sm shadow-md"
                    title="Previous Photo"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  </button>
                )}

                {/* Arrow Navigation (Right) */}
                {currentIndex < 4 && (
                  <button
                    onClick={handleNextMedia}
                    disabled={!typerFinished}
                    className={`absolute right-[2px] top-1/2 -translate-y-1/2 z-20 bg-[#030008]/60 border border-white/10 p-1.5 rounded-full transition-all backdrop-blur-sm shadow-md ${
                      typerFinished 
                        ? "text-pink-300 hover:text-white hover:bg-pink-650/35 cursor-pointer" 
                        : "text-slate-600 cursor-not-allowed opacity-20"
                    }`}
                    title="Next Photo"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  </button>
                )}

                {/* Polaroid container with romantic shadow */}
                <div className="bg-[#030008]/45 border border-white/12 p-2 pb-5 sm:p-3 sm:pb-6 rounded-2xl shadow-xl relative overflow-hidden backdrop-blur-md w-full max-w-[180px] sm:max-w-[220px] flex flex-col justify-between max-h-[28vh] sm:max-h-[35vh]">
                  
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-pink-500/70 to-transparent" />

                  <div className="aspect-[4/5] rounded-xl overflow-hidden bg-black/40 relative flex items-center justify-center border border-white/8 flex-grow min-h-0">
                    {/* Blur backing fallback */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center blur-md opacity-35 scale-110 pointer-events-none"
                      style={{ backgroundImage: `url(${galleryItems[currentIndex]?.url || defaultPlaceholders[currentIndex]})` }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentIndex}
                        src={galleryItems[currentIndex]?.url || defaultPlaceholders[currentIndex]}
                        initial={{ scale: 1.05, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="relative z-10 w-full h-full object-contain rounded-xl"
                        alt={`Romantic Moment ${currentIndex + 1}`}
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020005]/20 via-transparent to-transparent pointer-events-none z-15" />
                  </div>
                </div>
              </div>

              {/* Typing Compliment Text under the Polaroid / fit view height */}
              <div className="min-h-[48px] sm:min-h-[55px] flex items-center justify-center text-center px-4 mt-2 sm:mt-3 flex-shrink-0">
                <p className="font-sans text-pink-100 text-xs sm:text-sm md:text-base font-light tracking-wide leading-relaxed filter drop-shadow-[0_2px_8px_rgba(219,39,119,0.3)] select-none">
                  {displayedText}
                  {!typerFinished && (
                    <span className="inline-block w-1 h-3.5 ml-1 bg-pink-400 animate-pulse rounded-sm align-middle" />
                  )}
                </p>
              </div>

              {/* Navigation button */}
              <div className="h-10 mt-1 sm:mt-2 flex items-center justify-center flex-shrink-0">
                <AnimatePresence>
                  {typerFinished && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      onClick={handleNextMedia}
                      className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-800 hover:from-pink-500 hover:to-purple-700 active:scale-95 text-white font-display text-[9px] sm:text-2xs font-bold tracking-wider uppercase px-4 py-2 rounded-full border border-pink-400/20 flex items-center gap-1 cursor-pointer transition-all shadow-md"
                    >
                      {currentIndex < 4 ? "Next Chapter" : "কোলাজ দেখুন ❤️"}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
