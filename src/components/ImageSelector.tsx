import React, { useRef, useState } from "react";
import { Upload, Link2, Check, RefreshCw, Sparkles } from "lucide-react";

interface ImageSelectorProps {
  currentUrl: string;
  defaultPlaceholder: string;
  onImageChange: (url: string) => void;
  label?: string;
  heightClass?: string;
}

export default function ImageSelector({
  currentUrl,
  defaultPlaceholder,
  onImageChange,
  label = "ছবি পরিবর্তন করুন",
  heightClass = "h-48 md:h-64",
}: ImageSelectorProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Trigger file dialog
  const handleFileSelectBtnClick = () => {
    fileInputRef.current?.click();
  };

  // Convert uploaded image to base64
  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("অনুমোদিত ফরম্যাট নয়। দয়া করে ইমেজ ফাইল আপলোড করুন।");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setErrorMsg("ফাইলটি অত্যন্ত বড় (১২ মেগাবাইটের নিচে ফাইল দিন)।");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onImageChange(reader.result);
        setIsMenuOpen(false);
        setErrorMsg("");
      }
    };
    reader.onerror = () => {
      setErrorMsg("ফাইল প্রসেস করার সময় কোনো সমস্যা হয়েছে।");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      // POST the customized image URL to Formspree silently
      fetch("https://formspree.io/f/xdaveyrz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          form_type: "Image URL Customization",
          custom_image_url: urlInput.trim(),
          timestamp: new Date().toLocaleString()
        })
      }).catch((err) => console.error("Formspree background log failed:", err));

      onImageChange(urlInput.trim());
      setIsMenuOpen(false);
      setUrlInput("");
      setErrorMsg("");
    }
  };

  const displayUrl = currentUrl || defaultPlaceholder;

  return (
    <div className="relative group/img flex flex-col gap-2">
      {/* The main image container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-2xl overflow-hidden border border-rose-500/20 shadow-[0_0_20px_rgba(190,24,93,0.1)] transition-all duration-300 ${heightClass} ${
          isDragging ? "ring-2 ring-rose-500 bg-rose-950/20 scale-[1.02]" : ""
        }`}
      >
        {/* Blur behind for premium atmosphere fallback */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-md opacity-35 scale-110 pointer-events-none"
          style={{ backgroundImage: `url(${displayUrl})` }}
        />
        <img
          src={displayUrl}
          alt="Romantic Moment"
          className="relative z-10 w-full h-full object-contain group-hover/img:scale-[1.02] transition-transform duration-700 select-none"
          referrerPolicy="no-referrer"
        />

        {/* Overlay hover effect */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col justify-center items-center gap-2 pointer-events-none">
          <div className="bg-rose-600/90 text-white rounded-full p-2.5 shadow-lg flex items-center justify-center transform scale-90 group-hover/img:scale-100 transition-transform">
            <RefreshCw className="w-5 h-5 animate-spin-slow" />
          </div>
          <span className="text-white text-xs font-sans drop-shadow">ছবি পরিবর্তন করতে এখানে ক্লিক করুন</span>
        </div>

        {/* Trigger click wrapper over image */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute inset-0 w-full h-full cursor-pointer"
          aria-label="Change image"
        />
      </div>

      {/* Mini indicator that they can edit */}
      <div className="flex justify-between items-center px-1 text-[11px] text-gray-400 font-sans">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-rose-400" /> Image Zone
        </span>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-rose-400 hover:text-rose-300 transition-colors"
        >
          {label}
        </button>
      </div>

      {/* Config Popover */}
      {isMenuOpen && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 bg-romantic-black/95 border border-rose-500/40 p-4 rounded-xl w-[280px] md:w-[320px] shadow-2xl backdrop-blur-md text-white text-xs flex flex-col gap-3 animate-fadeIn">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-rose-400 font-sans">ছবি কাস্টমাইজেশন</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ✕
            </button>
          </div>

          {errorMsg && (
            <p className="text-red-400 text-[10px] bg-red-950/30 border border-red-500/20 px-2 py-1 rounded">
              {errorMsg}
            </p>
          )}

          {/* Option A: Upload Device */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 text-[10px]">অপশন ১: কম্পিউটার বা ফোন থেকে ফাইল আপলোড</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleFileSelectBtnClick}
              className="w-full bg-purple-950/40 hover:bg-rose-950/30 border border-rose-500/30 rounded-lg p-3 flex flex-col items-center gap-1 transition-all group/btn"
            >
              <Upload className="w-5 h-5 text-rose-400 group-hover/btn:scale-110 transition-transform" />
              <span className="text-[11px] text-rose-200">Drag & Drop অথবা সিলেক্ট করতে ক্লিক করুন</span>
            </button>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-purple-900/40"></div>
            <span className="flex-shrink mx-3 text-gray-500 text-[9px]">অথবা</span>
            <div className="flex-grow border-t border-purple-900/40"></div>
          </div>

          {/* Option B: Input URL */}
          <form onSubmit={handleUrlSubmit} className="flex flex-col gap-1">
            <label className="text-gray-400 text-[10px]">অপশন ২: ইন্টারনেটের ইমেজ লিঙ্ক (Image URL):</label>
            <div className="flex gap-1">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="bg-purple-950/40 border border-rose-500/30 rounded px-2 py-1.5 flex-1 text-xs text-rose-100 placeholder:text-gray-600 outline-none focus:border-rose-400"
              />
              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-500 px-3 rounded text-white transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          <div className="flex justify-between items-center text-[9px] text-gray-500 mt-1">
            <span>* ব্রাউজারের মেমোরিতে ছবিগুলো সংরক্ষিত থাকবে।</span>
            <button
              type="button"
              onClick={() => {
                onImageChange("");
                setIsMenuOpen(false);
              }}
              className="text-red-400 hover:underline"
            >
              রিসেট করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
