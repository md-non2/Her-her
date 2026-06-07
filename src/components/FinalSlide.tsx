import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, RotateCcw, Stars, Mail, Send, CheckCircle, MessageSquare } from "lucide-react";

interface FinalSlideProps {
  onRestart: () => void;
  partnerName: string;
}

interface MiniHeartParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  color: string;
}

export default function FinalSlide({ onRestart, partnerName }: FinalSlideProps) {
  const [isForeverClicked, setIsForeverClicked] = useState(false);
  const [particles, setParticles] = useState<MiniHeartParticle[]>([]);
  
  // Formspree State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [senderFeeling, setSenderFeeling] = useState("❤️ Loved");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Spawns celebratory heart bursts
  const triggerCelebration = () => {
    setIsForeverClicked(true);
    const colors = ["text-rose-500", "text-pink-400", "text-purple-400", "text-red-500", "text-amber-300"];
    const newParticles = Array.from({ length: 30 }, (_, idx) => ({
      id: Date.now() + idx,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 200,
      scale: Math.random() * 1.1 + 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles((prev) => [...prev, ...newParticles]);
  };

  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles([]);
        setIsForeverClicked(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  // Formspree Submit Handler
  const handleFormspreeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderMessage.trim()) {
      setSubmitError("দয়া করে নাম এবং সঙ্কেত বার্তা সম্পূর্ণ পূরণ করুন।");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://formspree.io/f/xdaveyrz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail || "No-Email-Provided@customer.com",
          message: senderMessage,
          feeling: senderFeeling,
          timestamp: new Date().toLocaleString()
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setSenderName("");
        setSenderEmail("");
        setSenderMessage("");
        setSenderFeeling("❤️ Loved");
      } else {
        setSubmitError("বার্তা পাঠানো ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error("Formspree Submission Error:", err);
      setSubmitError("সংযোগের সমস্যা। অনুগ্রহ করে ইন্টারনেট কানেকশন চেক করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto text-center px-4 relative text-white z-20 overflow-y-auto custom-scrollbar min-h-0">
      {/* Absolute bursts if clicked */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: window.innerHeight, opacity: 1, scale: 0.5 }}
            animate={{
              y: -100,
              x: p.x + (Math.random() * 140 - 70),
              opacity: 0,
              scale: p.scale,
              rotate: Math.random() * 360,
            }}
            transition={{ duration: Math.random() * 2.2 + 1.8, ease: "easeOut" }}
            className={`absolute pointer-events-none z-50 ${p.color}`}
            style={{ width: "16px", height: "16px" }}
          >
            <Heart className="w-full h-full fill-current drop-shadow-[0_0_8px_rgba(219,39,119,0.6)]" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Decorative background stars */}
      <div className="absolute top-0 left-4 text-pink-500/10 animate-pulse-gentle">
        <Stars className="w-16 h-16 sm:w-20 sm:h-20" />
      </div>

      <div className="relative z-25 premium-glass-card p-3.5 sm:p-5 rounded-2xl border border-white/12 shadow-[0_0_60px_rgba(30,10,60,0.45)] w-full max-h-full overflow-y-auto custom-scrollbar flex flex-col justify-center py-3.5 sm:py-5 gap-3.5 min-h-0 flex-grow">
        {/* Delicate golden filigree border inside */}
        <div className="absolute top-2 left-2 right-2 bottom-2 border border-pink-500/10 rounded-xl pointer-events-none" />

        {/* Glow pulsing luxury heart circle */}
        <motion.div
          animate={{
            scale: [1, 1.03, 1],
            boxShadow: [
              "0 0 10px rgba(219, 39, 119, 0.4)",
              "0 0 25px rgba(219, 39, 119, 0.6)",
              "0 0 10px rgba(219, 39, 119, 0.4)",
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-600 via-rose-600 to-purple-850 rounded-full flex items-center justify-center mx-auto border border-pink-400/30 relative shadow-lg flex-shrink-0"
        >
          <Heart className="w-5.5 h-5.5 sm:w-7 sm:h-7 fill-white text-white filter drop-shadow animate-ping absolute opacity-25" />
          <Heart className="w-5.5 h-5.5 sm:w-7 sm:h-7 fill-white text-white filter drop-shadow" />
        </motion.div>

        {/* Message section */}
        <div className="space-y-1.5 sm:space-y-3 flex-grow flex flex-col justify-center items-center">
          <h2 className="text-[10px] sm:text-xs md:text-sm font-serif font-bold text-pink-100 tracking-wide">
            আমাদের গল্পটা এখানেই শেষ না…
          </h2>

          <h3 className="whitespace-nowrap font-display text-xs sm:text-lg md:text-xl text-gold-gradient font-bold tracking-widest uppercase py-0.5">
            THE BEGINNING OF FOREVER ❤️
          </h3>

          <p className="text-slate-300 leading-relaxed text-[9.5px] sm:text-xs md:text-sm font-sans font-light italic px-4 text-center">
            "আমাদের অনন্য এই পথচলা পেরিয়ে যাক শত মাইল, যেখানে প্রতিটি রোবলক্স গেম আর গভীর রাতের গল্প জমিয়ে রাখবে বসন্তের এক রাজকীয় উপহার।"
          </p>
        </div>

        {/* Core action buttons inside an ultra-compact single horizontal row layout for mobile, scaling up nicely */}
        <div className="grid grid-cols-3 gap-1 sm:gap-1.5 w-full pt-1 relative z-40 flex-shrink-0">
          <button
            onClick={triggerCelebration}
            className="w-full bg-gradient-to-r from-pink-650 via-rose-600 to-purple-800 hover:from-pink-500 hover:to-purple-700 hover:scale-[1.02] active:scale-95 text-white font-display text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] font-bold tracking-wider uppercase py-1.5 px-0.5 sm:py-3 rounded-full border border-pink-400/25 flex items-center justify-center gap-0.5 sm:gap-1 cursor-pointer transition-all shadow-md select-none"
          >
            Besties ❤️ <Sparkles className="w-2.5 h-2.5 text-pink-200 fill-current hidden xs:inline" />
          </button>

          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full bg-gradient-to-r from-purple-800 via-pink-700 to-rose-650 hover:from-purple-700 hover:to-rose-550 hover:scale-[1.02] active:scale-95 text-white font-display text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] font-bold tracking-wider uppercase py-1.5 px-0.5 sm:py-3 rounded-full border border-purple-400/25 flex items-center justify-center gap-0.5 sm:gap-1 cursor-pointer transition-all shadow-md select-none"
          >
            চিঠি লিখুন ✉️
          </button>

          <button
            onClick={onRestart}
            className="w-full bg-white/5 hover:bg-white/10 text-pink-300 hover:text-pink-200 hover:scale-[1.02] active:scale-95 border border-pink-500/25 font-display text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] font-bold tracking-wider uppercase py-1.5 px-0.5 sm:py-3 rounded-full transition-all flex items-center justify-center gap-0.5 sm:gap-1 cursor-pointer shadow-md select-none"
          >
            Again <RotateCcw className="w-2.5 h-2.5" />
          </button>
        </div>

        {isForeverClicked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[8.5px] sm:text-[9.5px] text-pink-400 font-sans animate-bounce font-bold tracking-wider pt-1 flex-shrink-0"
          >
            ✨ আমাদের অটুট এই স্নেহের বন্ধন সারাজীবন রঙিন থাকুক! ✨
          </motion.div>
        )}
      </div>

      {/* Exquisite Luxury Letter Popover Form */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md premium-glass-card border border-rose-500/30 p-5 sm:p-6 rounded-2xl shadow-2xl backdrop-blur-xl text-white overflow-hidden"
            >
              {/* Decorative inner golden edge */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-pink-500/10 rounded-xl pointer-events-none" />

              <div className="flex justify-between items-center border-b border-white/10 pb-2.5 mb-3.5 relative z-10 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-pink-400" />
                  <span className="font-serif text-[11px] sm:text-xs tracking-widest text-pink-300 font-bold uppercase">
                    গোপন প্রেমের পত্রী • Formspree 🌸
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setSubmitSuccess(false);
                    setSubmitError("");
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-sm w-6 h-6 flex items-center justify-center bg-white/5 rounded-full border border-white/10 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6 px-4 space-y-4"
                >
                  <div className="w-12 h-12 bg-pink-500/20 border border-pink-500/50 rounded-full flex items-center justify-center mx-auto text-pink-400">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-pink-100">বার্তা সফলভাবে পাঠানো হয়েছে!</h4>
                    <p className="text-[11px] text-slate-300 italic font-light">
                      "Formspree ড্যাশবোর্ডে আপনার গোপন চিঠিটি নিরাপদে সঞ্চিত রইল..."
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsFormOpen(false);
                      setSubmitSuccess(false);
                    }}
                    className="mt-2 bg-gradient-to-r from-pink-600 to-purple-800 text-white font-display text-[9px] sm:text-2xs font-bold tracking-widest uppercase px-4 py-2 rounded-full cursor-pointer hover:shadow-lg transition-all"
                  >
                    বন্ধ করুন
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormspreeSubmit} className="space-y-3.5 relative z-10 text-left">
                  {submitError && (
                    <div className="p-2 sm:p-2.5 bg-red-950/40 border border-red-500/30 text-red-300 text-[10px] rounded animate-shake leading-snug">
                      ⚠️ {submitError}
                    </div>
                  )}

                  {/* Sender Name */}
                  <div className="space-y-1">
                    <label className="text-[9px] sm:text-2xs uppercase tracking-widest text-pink-400 font-semibold block font-display">
                      আপনার নাম / ডাকনাম (Name)*
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="যেমন: স্নেহা বা অভিমানী..."
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-black/30 border border-rose-500/20 hover:border-rose-500/40 focus:border-pink-500 rounded-lg px-3 py-1.5 text-xs text-pink-100 outline-none transition-all placeholder:text-gray-600 font-sans"
                    />
                  </div>

                  {/* Sender Email */}
                  <div className="space-y-1">
                    <label className="text-[9px] sm:text-2xs uppercase tracking-widest text-slate-400 font-semibold block font-display">
                      ইমেইল ঠিকানা (Email - Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="username@example.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 hover:border-white/20 focus:border-pink-500 rounded-lg px-3 py-1.5 text-xs text-pink-100 outline-none transition-all placeholder:text-gray-600 font-sans"
                    />
                  </div>

                  {/* Feeling Selector */}
                  <div className="space-y-1">
                    <label className="text-[9px] sm:text-2xs uppercase tracking-widest text-slate-400 font-semibold block font-display">
                      বর্তমান অনুভূতি (Feelings)
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["❤️ Loved", "🌸 Blissful", "✨ Majestic"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSenderFeeling(opt)}
                          className={`py-1 rounded-lg border text-[10px] font-sans font-medium transition-all cursor-pointer ${
                            senderFeeling === opt
                              ? "bg-pink-600 border-pink-400 text-white shadow-md shadow-pink-600/25"
                              : "bg-black/25 border-white/10 text-slate-300 hover:border-rose-500/20"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sender Message */}
                  <div className="space-y-1">
                    <label className="text-[9px] sm:text-2xs uppercase tracking-widest text-pink-400 font-semibold block font-display">
                      অব্যক্ত মনের মিষ্টি কথা / গোপন চিঠি (Message)*
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={3}
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      placeholder="এখানে আপনার মনের অব্যক্ত অনুভূতি, মিষ্টি কথা বা প্রতিক্রিয়া লিখে পাঠিয়ে দিন..."
                      className="w-full bg-black/30 border border-rose-500/20 hover:border-rose-500/40 focus:border-pink-500 rounded-lg p-2.5 text-xs text-pink-100 outline-none transition-all placeholder:text-gray-600 font-sans resize-none leading-relaxed h-20 custom-scrollbar italic font-light"
                    />
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsFormOpen(false);
                        setSubmitSuccess(false);
                        setSubmitError("");
                      }}
                      className="px-4 py-2 border border-white/10 hover:border-white/20 rounded-full text-[10px] text-slate-300 uppercase tracking-widest font-display transition-colors cursor-pointer"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-800 hover:from-pink-500 hover:to-purple-700 hover:scale-[1.01] text-white font-display text-[10px] font-bold tracking-widest uppercase px-5 py-2 rounded-full border border-pink-400/20 flex items-center gap-1.5 shadow-lg select-none cursor-pointer disabled:opacity-50 transition-all"
                    >
                      {isSubmitting ? (
                        <>পাঠানো হচ্ছে...</>
                      ) : (
                        <>
                          বার্তা পাঠান <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
