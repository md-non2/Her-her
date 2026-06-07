import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ChevronRight, ChevronLeft, Sparkles, AlertCircle } from "lucide-react";
import { LoveJourneyState, StoryDay, GalleryItem } from "./types";
import BackgroundHearts from "./components/BackgroundHearts";
import MusicPlayer from "./components/MusicPlayer";
import IntroSlide from "./components/IntroSlide";
import StorySlide from "./components/StorySlide";
import CounterSlide from "./components/CounterSlide";
import GallerySlide from "./components/GallerySlide";
import MessageSlide from "./components/MessageSlide";
import FinalSlide from "./components/FinalSlide";

// Initial base state representing our default romantic configuration
const DEFAULT_STATE: LoveJourneyState = {
  partnerName: "Sneha (স্নেহা)",
  partnerCompliment: "Our 7-day connection feels like an eternal friendship we have been searching for. রোবলক্সের সেই প্রথম দিনের খেলার মাঠ থেকে শুরু হওয়া হাসি আর খুনসুটি আজ আমার অবুঝ মনে এক জাদুকরী শিহরণ ছড়িয়ে দিয়েছে। You are someone so incredibly special, Sneha; a beautiful star in my sky.",
  startDate: "2026-05-31", // Exactly 7 days before simulated current date (2026-06-07)
  mainPhotoUrl: "/WhatsApp Image 2026-06-07 at 12.57.58 AM.jpeg",
  daysStory: [
    {
      day: 1,
      title: "The Playful Spark • প্রথম দেখা Roblox-এ 🎮",
      story: "ভার্চুয়াল জগতের ব্যস্ত কোলাহলের মাঝে হঠাৎ স্নেহা তোমার সাথে সেই চঞ্চল রোবলক্স গেমে মেতে ওঠা। কে জানত, স্রেফ একটি সাধারণ খেলার হাসি ও খুনসুটি আমাদের জীবনের সবচেয়ে সুন্দর ও মায়াবী বন্ধুত্বের সূচনা করবে? It all started with a simple game, but led to something truly magical.",
      isUnlocked: true,
    },
    {
      day: 2,
      title: "Endless Whispers • অবিরাম গল্পগুজব 💬",
      story: "আমাদের প্রথম চ্যাটিং এবং অফুরন্ত গল্পের মিষ্টি শুরু। লাজুক টেক্সট, ছোট ছোট কৌতুক আর চোখের কোণে জমে থাকা অপার্থিব হাসির রেশ। মাত্র দ্বিতীয় দিনেই মন বুঝতে পারল, প্রতিটি নোটিফিকেশনে শুধু তোমার নামটা দেখার আকুলতা সাধারণ বন্ধুত্বের চেয়েও অনেক গভীর ও নিবিড় কিছু।",
      isUnlocked: false,
    },
    {
      day: 3,
      title: "A Drifting Bond • নিবিড় টান 💕",
      story: "আমাদের এই অনলাইন সংযোগটি যে মোটেও সাধারণ নয়, তা ধীরে ধীরে আরও স্পষ্ট হয়ে উঠল। একসাথে স্ক্রিন শেয়ার করে প্রিয় গান শোনা এবং তোমার প্রতিটি কথার পেছনে লুকিয়ে থাকা লাজুক মৃদু হাসি আমার মলিন দিনকেও উজ্জ্বল করে তুলছিল। Truly, we were growing closer with every heartbeat.",
      isUnlocked: false,
    },
    {
      day: 4,
      title: "Midnight Melodies • মাঝরাতের আলাপন 🎵",
      story: "মাঝরাতে গভীর নিস্তব্ধতায় ঘণ্টার পর ঘণ্টা গল্প করা। দূর থেকে ভেসে আসা আমাদের পছন্দের সুন্দর রোমান্টিক গানের সুর এবং একে অপরের কণ্ঠের মাঝে অন্যরকম এক প্রশান্তি খুঁজে পাওয়া। মাত্র ৪ দিনের মাথায় কখন যে তুমি আমার ভাবনার সবচেয়ে সুন্দর অংশে পরিণত হয়ে গেলে, টেরই পাইনি!",
      isUnlocked: false,
    },
    {
      day: 5,
      title: "The Silent Comfort • মনের গহীনে নীরব স্থান 💌",
      story: "স্নেহা, রোবলক্সের আড্ডা থেকে কখন যে মনের গহীনে এক অদ্ভুত মিষ্টি অধিকার আর নীরব সুখ গড়ে উঠেছে, খেয়ালই করিনি! তোমার প্রতিটি কথায় যে নিষ্পাপ সরলতা আর মায়া জড়ানো থাকে, তা আমার অবুঝ মনকে অন্যরকম শান্তিময় ও নিবিড় স্পর্শ দেয়। This silent bond is a beautiful comfort I cherish deeply everyday.",
      isUnlocked: false,
    },
    {
      day: 6,
      title: "Creating Memories • স্মৃতিময় ষষ্ঠ দিন 💫",
      story: "আমাদের পরিচয়ের ষষ্ঠ দিনটিতে এসে মনে হলো যেন কত যুগের চেনা! রোবলক্সের খেলার ফাঁকে অথবা ছোট্ট টেক্সটগুলোর মাঝে আমরা দুজনে এক সুন্দর আত্মার মেলবন্ধন গড়ে তুলেছি। এই অনুভূতিগুলো স্রেফ এক অলৌকিক উপহার।",
      isUnlocked: false,
    },
    {
      day: 7,
      title: "Beyond Friendship • শুভ সপ্তম দিন ✨",
      story: "আজ আমাদের পরিচয়ের সেই শুভ ৭ম দিন। সময়ের পরিধি মাত্র সাত দিনের হলেও হৃদয়ের মায়াবী টান যেন এক অবিশ্বাস্য জাদুকরী মহাকাব্য! রোবলক্সের কোলাহল থেকে শুরু হওয়া এই সুন্দর পথচলা আমার জীবনের শ্রেষ্ঠ আনন্দ। I cherish you completely, waiting for the day our hearts speak as one.",
      isUnlocked: false,
    },
  ],
  galleryItems: [
    { id: 1, url: "/WhatsApp Image 2026-06-07 at 12.57.58 AM (1).jpeg", compliment: "প্রথম দেখার মায়া" },
    { id: 2, url: "/WhatsApp Image 2026-06-07 at 12.57.59 AM.jpeg", compliment: "তোমার মিষ্টি হাসি" },
    { id: 3, url: "/WhatsApp Image 2026-06-07 at 12.57.59 AM (1).jpeg", compliment: "আমার প্রিয় মানুষ" },
    { id: 4, url: "/WhatsApp Image 2026-06-07 at 12.57.59 AM (2).jpeg", compliment: "সবচেয়ে বিশেষ তুমি" },
    { id: 5, url: "/WhatsApp Image 2026-06-07 at 12.58.00 AM.jpeg", compliment: "শুধু তোমাকেই দেখি" },
  ],
  heartfeltLetter: "আমাদের ৭ দিনের এই সুন্দর সম্পর্কের প্রতিটা মিষ্টি মুহূর্ত আমার মনের গহীনে পরম যত্নে জমা হয়ে গেছে, স্নেহা। রোবলক্সের গল্প থেকে শুরু হওয়া আমাদের সহজ-সরল বন্ধুত্ব আজ আমার ভাবনার পরম শান্তিময় মায়াবী আশ্রয়স্থল।\n\nহৃদয়ের সমস্ত মায়া ও বিশ্বাস নিয়ে সবসময় তোমার পাশে আছি... 🌸\n\nI value and cherish our beautiful friendship deeply.",
  musicUrl: "/background_love_song.mp3",
};

const STORAGE_KEY = "romantic-love-journey-state-v3";

export default function App() {
  const [state, setState] = useState<LoveJourneyState>(DEFAULT_STATE);
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [maxUnlockedSlide, setMaxUnlockedSlide] = useState<number>(1);
  const [isSlide5Typing, setIsSlide5Typing] = useState<boolean>(false);
  const [isDay7Completed, setIsDay7Completed] = useState<boolean>(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If the parsed state has the old placeholder name or stories, reset/migrate to new Sneha defaults
        if (parsed.partnerName === "অনন্যা" || !parsed.partnerName) {
          setState(DEFAULT_STATE);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
        } else {
          // Auto-upgrade startDate to May 31, 2026 (7 days before June 7, 2026)
          if (parsed.startDate === "2026-01-01" || parsed.startDate === "2026-06-01" || !parsed.startDate) {
            parsed.startDate = "2026-05-31";
          }

          // Auto-upgrade music to our local high-quality uploaded background MP3 file
          if (
            !parsed.musicUrl ||
            parsed.musicUrl !== "/background_love_song.mp3"
          ) {
            parsed.musicUrl = "/background_love_song.mp3";
          }

          // Auto-upgrade empty/placeholder images to our beautiful newly uploaded WhatsApp images
          if (!parsed.mainPhotoUrl || parsed.mainPhotoUrl.includes("picsum.photos")) {
            parsed.mainPhotoUrl = DEFAULT_STATE.mainPhotoUrl;
          }
          if (parsed.galleryItems) {
            if (parsed.galleryItems.length < 5) {
              const extended = [...parsed.galleryItems];
              for (let i = parsed.galleryItems.length; i < DEFAULT_STATE.galleryItems.length; i++) {
                extended.push(DEFAULT_STATE.galleryItems[i]);
              }
              parsed.galleryItems = extended;
            } else {
              parsed.galleryItems = parsed.galleryItems.map((item: any, idx: number) => {
                if ((!item.url || item.url.includes("picsum.photos")) && DEFAULT_STATE.galleryItems[idx]) {
                  return { ...item, url: DEFAULT_STATE.galleryItems[idx].url };
                }
                return item;
              });
            }

            // Map old labels to the newly requested beautiful Bengali ones dynamically
            const oldToNewCompliments: Record<string, string> = {
              "Sweet Sneha": "প্রথম দেখার মায়া",
              "Beautiful Smile": "তোমার মিষ্টি হাসি",
              "Roblox Partner 🎮": "আমার প্রিয় মানুষ",
              "Most Special": "সবচেয়ে বিশেষ তুমি",
              "এক ঝলক তোমাকে 💖": "শুধু তোমাকেই দেখি",
              "এক ঝলক তোমাকে": "শুধু তোমাকেই দেখি"
            };

            parsed.galleryItems = parsed.galleryItems.map((item: any) => {
              if (item.compliment && oldToNewCompliments[item.compliment]) {
                return { ...item, compliment: oldToNewCompliments[item.compliment] };
              }
              return item;
            });
          }

          // Normalize/correct the salutation and content inside heartfeltLetter
          if (parsed.heartfeltLetter) {
            const originalLetter = parsed.heartfeltLetter;
            // Upgrade if it contains the old cheesy bangla text
            if (originalLetter.includes("উৎসর্গ করেছি") || originalLetter.includes("নীল আকাশ, আমার ধূসর দুপুরের মিষ্টি রোদ")) {
              parsed.heartfeltLetter = DEFAULT_STATE.heartfeltLetter;
            } else {
              // Strip out any "Dear Sneha," or bengali equivalent from the typewriter content start
              let corrected = originalLetter.replace(/^(Dear Sneha|পরিয়\s*স্নেহা|পরীয়\s*স্নেহা|প্রিয়\s*স্নেহা|পরিয়ই\s*স্নেহা)\s*,?\s*(\n+)?/gi, "");
              if (corrected !== originalLetter) {
                parsed.heartfeltLetter = corrected;
              }
            }
          }

          // Auto-upgrade daysStory if it is outdated, missing days, or has old 6-day structures
          if (!parsed.daysStory || parsed.daysStory.length < 7) {
            parsed.daysStory = DEFAULT_STATE.daysStory;
          } else {
            // Ensure any outdated 6-day texts are updated to 7-day versions
            if (parsed.partnerCompliment && parsed.partnerCompliment.includes("6-day")) {
              parsed.partnerCompliment = parsed.partnerCompliment.replace("6-day", "7-day");
            }
            if (parsed.heartfeltLetter && parsed.heartfeltLetter.includes("৬ দিন")) {
              parsed.heartfeltLetter = parsed.heartfeltLetter.replace("৬ দিন", "৭ দিন");
            }
            // Auto update Day 5, Day 6 and Day 7 to keep them in perfect compact sync
            parsed.daysStory[4] = DEFAULT_STATE.daysStory[4];
            parsed.daysStory[5] = DEFAULT_STATE.daysStory[5];
            parsed.daysStory[6] = DEFAULT_STATE.daysStory[6];
          }

          // Force update heartfeltLetter to compact version if they have the legacy long text
          if (
            !parsed.heartfeltLetter ||
            parsed.heartfeltLetter.includes("আমাদের পরিচয়ের বয়স মাত্র ৭ দিন হতে পারে") ||
            parsed.heartfeltLetter.includes("কোনো জোরাজুরি বা কঠিন বাঁধনে") ||
            parsed.heartfeltLetter.includes("খেলার মাঠ") ||
            parsed.heartfeltLetter.includes("আমি আমাদের এই শুদ্ধ বন্ধনকে")
          ) {
            parsed.heartfeltLetter = DEFAULT_STATE.heartfeltLetter;
          }

          // Force reset Day 2-7 unlocks on load to guarantee pristine sequential storytelling every session
          if (parsed.daysStory) {
            parsed.daysStory = parsed.daysStory.map((day: any) => ({
              ...day,
              isUnlocked: day.day === 1,
            }));
          }

          // Save migrated state to storage
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          } catch (se) {
            console.error("Storage save failed:", se);
          }

          setState({
            ...DEFAULT_STATE,
            ...parsed,
          });
        }
      } catch (e) {
        console.error("Failed to load custom romantic state:", e);
      }
    }
  }, []);

  // Save to local storage on state changes
  const saveState = (newState: LoveJourneyState) => {
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  };

  // Move directly to next slide
  const handleNextSlide = () => {
    const next = activeSlide + 1;
    if (next <= 6) {
      if (next >= 3 && !isDay7Completed) {
        // Strict guard: Cannot access Slide 3+ unless Day 7 is completed in this session!
        return;
      }
      setActiveSlide(next);
      if (next > maxUnlockedSlide) {
        setMaxUnlockedSlide(next);
      }
    }
  };

  const handlePrevSlide = () => {
    if (activeSlide > 1) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const handleRestartJourney = () => {
    // Reset progression parameters fully on restart
    setIsDay7Completed(false);
    setMaxUnlockedSlide(1);
    setActiveSlide(1);
  };

  // Navigation handlers
  const handleGoToSlide = (slideNum: number) => {
    if (slideNum >= 3 && !isDay7Completed) {
      // Guarded!
      return;
    }
    if (slideNum <= maxUnlockedSlide) {
      setActiveSlide(slideNum);
    }
  };

  return (
    <div className="relative h-screen h-[100dvh] bg-romantic-black text-slate-200 overflow-hidden font-sans flex flex-col justify-between selection:bg-rose-600 selection:text-white">
      {/* Background Glow Effects from Geometric Balance */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Background floating hearts */}
      <BackgroundHearts />

      {/* Floating Music player controller */}
      <MusicPlayer
        musicUrl={state.musicUrl}
        onMusicUrlChange={(url) => saveState({ ...state, musicUrl: url })}
      />

      {/* Modern Floating Header with progress indicators from Geometric Balance theme */}
      <header className="relative z-30 pt-3 sm:pt-4 px-4 flex flex-col items-center text-center gap-1.5 w-full flex-shrink-0">
        <div className="flex flex-col items-center">
          <h1 className="text-base sm:text-xl md:text-2xl font-serif italic text-pink-200 tracking-wide flex items-center justify-center gap-1.5">
            Our Story: {state.partnerName}
          </h1>
          <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-pink-500/60 font-semibold mt-0.5">
            Chapter {activeSlide} of 6 • The Journey Together
          </p>
        </div>

        {/* Global Progress Steps */}
        {!(activeSlide === 5 && isSlide5Typing) ? (
          <div className="flex items-center justify-between max-w-[240px] sm:max-w-xs w-full gap-1 relative bg-white/5 border border-white/10 px-2 py-1 rounded-full backdrop-blur-md shadow-lg mt-0.5 sm:mt-1">
            {Array.from({ length: 6 }, (_, idx) => {
                const num = idx + 1;
                const isCompleted = num < activeSlide;
                const isActive = num === activeSlide;
                const isAccessible = num <= maxUnlockedSlide && (num < 3 || isDay7Completed);

              return (
                <React.Fragment key={num}>
                  <button
                    onClick={() => handleGoToSlide(num)}
                    disabled={!isAccessible}
                    className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[8px] sm:text-[10px] font-bold transition-all ${
                      isActive
                        ? "bg-rose-500 text-white shadow-[0_0_8px_rgba(219,39,119,0.5)] scale-110"
                        : isCompleted
                        ? "bg-rose-950/40 border border-rose-500/60 text-pink-200"
                        : isAccessible
                        ? "bg-white/5 border border-white/10 text-rose-300 hover:border-pink-500/40"
                        : "bg-black/40 border border-white/5 text-gray-700 cursor-not-allowed"
                    }`}
                    title={`Slide ${num}`}
                  >
                    {num}
                  </button>
                  {num < 6 && (
                    <div
                      className={`flex-1 h-[2px] transition-all ${
                        num < maxUnlockedSlide ? "bg-rose-500/50" : "bg-white/5"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div className="text-pink-400 font-sans text-xs flex items-center gap-2 animate-pulse select-none py-2 font-medium">
            ✉️ গোপন বার্তাটি টাইপ হচ্ছে, দয়া করে অপেক্ষা করুন...
          </div>
        )}
      </header>

      {/* Primary Slide display with transitions */}
      <main className="relative z-10 flex-grow flex items-center justify-center py-2 sm:py-4 w-full min-h-0 overflow-hidden">
        <div className="w-full max-w-5xl mx-auto px-4 h-full flex flex-col justify-center min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="h-full w-full min-h-0 flex flex-col justify-center items-center overflow-hidden"
            >
              {activeSlide === 1 && (
                <IntroSlide
                  partnerName={state.partnerName}
                  partnerCompliment={state.partnerCompliment}
                  onUpdateNameAndCompliment={(name, comp) =>
                    saveState({ ...state, partnerName: name, partnerCompliment: comp })
                  }
                  onNext={handleNextSlide}
                />
              )}

              {activeSlide === 2 && (
                <StorySlide
                  days={state.daysStory}
                  onCompleteStory={() => {
                    setIsDay7Completed(true);
                    setMaxUnlockedSlide(3); // Unlock Slide 3 explicitly
                    setActiveSlide(3); // Go to Slide 3 immediately
                  }}
                  onNext={handleNextSlide}
                />
              )}

              {activeSlide === 3 && (
                <CounterSlide
                  startDate={state.startDate}
                  onUpdateStartDate={(date) => saveState({ ...state, startDate: date })}
                  currentPhotoUrl={state.mainPhotoUrl}
                  onUpdatePhoto={(url) => saveState({ ...state, mainPhotoUrl: url })}
                  onNext={handleNextSlide}
                />
              )}

              {activeSlide === 4 && (
                <GallerySlide
                  galleryItems={state.galleryItems}
                  onUpdateGalleryItems={(items) => saveState({ ...state, galleryItems: items })}
                  onNext={handleNextSlide}
                />
              )}

              {activeSlide === 5 && (
                <MessageSlide
                  letterText={state.heartfeltLetter}
                  onNext={handleNextSlide}
                  onTypingStateChange={setIsSlide5Typing}
                />
              )}

              {activeSlide === 6 && (
                <FinalSlide
                  onRestart={handleRestartJourney}
                  partnerName={state.partnerName}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Manual Slide Controls at the bottom */}
      <footer className="relative z-30 pb-3 sm:pb-5 px-4 flex flex-col items-center gap-1 flex-shrink-0">
        {!(activeSlide === 5 && isSlide5Typing) && (
          <div className="flex gap-3">
            {activeSlide > 1 && (
              <button
                onClick={handlePrevSlide}
                className="bg-white/5 border border-white/10 hover:border-pink-500/40 text-pink-200 hover:text-white rounded-full p-2 transition-colors cursor-pointer backdrop-blur-md"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4.5 h-4.5 sm:w-5 h-5" />
              </button>
            )}

            {activeSlide < maxUnlockedSlide && (
              <button
                onClick={handleNextSlide}
                className="bg-white/5 border border-white/10 hover:border-pink-500/40 text-pink-200 hover:text-white rounded-full p-2 transition-colors cursor-pointer backdrop-blur-md"
                title="Forward Slide"
              >
                <ChevronRight className="w-4.5 h-4.5 sm:w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <p className="text-[8px] sm:text-[9px] text-gray-500 font-sans mt-1 tracking-widest uppercase font-semibold text-center select-none">
          * মন ছুঁয়ে যাওয়া আবেগ নিয়ে তিলতিল করে জমানো প্রেমের চিত্রলিপি *
        </p>
      </footer>
    </div>
  );
}
