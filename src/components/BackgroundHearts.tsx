import React, { useEffect, useState } from "react";

interface DecorativeElement {
  id: number;
  left: number; // percentage width
  top?: number; // percentage height for stars
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface InteractiveSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  color: string;
}

export default function BackgroundHearts() {
  const [stars, setStars] = useState<DecorativeElement[]>([]);
  const [bokehs, setBokehs] = useState<DecorativeElement[]>([]);
  const [hearts, setHearts] = useState<DecorativeElement[]>([]);
  const [clickSparkles, setClickSparkles] = useState<InteractiveSparkle[]>([]);

  useEffect(() => {
    // Elegant Twinkling Stars (Dainty cross/dots scattered in background)
    const generatedStars = Array.from({ length: 40 }, (_, idx) => ({
      id: idx,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1, // very delicate
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setStars(generatedStars);

    // Warm Romantic Slow Bokeh lights (large blurry atmospheric circles)
    const generatedBokehs = Array.from({ length: 12 }, (_, idx) => ({
      id: idx,
      left: Math.random() * 100,
      size: Math.random() * 120 + 80, // big and soft
      delay: Math.random() * 10,
      duration: Math.random() * 25 + 20, // super slow drifting
      opacity: Math.random() * 0.12 + 0.04,
    }));
    setBokehs(generatedBokehs);

    // Sophisticated Floating Heart Outlines
    const generatedHearts = Array.from({ length: 15 }, (_, idx) => ({
      id: idx,
      left: Math.random() * 100,
      size: Math.random() * 16 + 10, // classy size
      delay: Math.random() * 12,
      duration: Math.random() * 18 + 14, // slow
      opacity: Math.random() * 0.25 + 0.1,
    }));
    setHearts(generatedHearts);
  }, []);

  // Handle romantic interaction sparkle shower on global click
  const handleGlobalClick = (e: MouseEvent) => {
    const colors = [
      "rgba(219,39,119,0.75)", // luxury rose
      "rgba(192,132,252,0.75)", // violet light
      "rgba(244,114,182,0.75)", // soft pink
      "rgba(251,191,36,0.65)", // gold light
    ];

    // Spawn 5 dainty elements surrounding the click coordinate for maximum celebration
    const sparklesToSpawn = Array.from({ length: 5 }, (_, idx) => {
      const angle = (Math.random() * 360 * Math.PI) / 180;
      const distance = Math.random() * 30 + 15;
      return {
        id: Date.now() + idx + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 12 + 8,
        duration: Math.random() * 1.8 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    setClickSparkles((prev) => [...prev, ...sparklesToSpawn]);
  };

  useEffect(() => {
    window.addEventListener("click", handleGlobalClick);
    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  // Cleanup interaction elements to optimize render cycles
  useEffect(() => {
    if (clickSparkles.length > 60) {
      setClickSparkles((prev) => prev.slice(prev.length - 40));
    }
  }, [clickSparkles]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#040108]">
      {/* Cinematic animated aurora lights in background */}
      <div className="absolute top-[-10%] left-[-15%] w-[75vw] h-[75vw] rounded-full bg-gradient-to-tr from-purple-950/20 via-pink-950/10 to-indigo-950/25 blur-[120px] pointer-events-none aurora-blur-1" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-indigo-950/20 via-rose-950/15 to-purple-900/10 blur-[150px] pointer-events-none aurora-blur-2" />

      {/* Subtle diagonal warm light streak across the display */}
      <div className="absolute top-[20%] right-[-20%] w-[60%] h-[35px] bg-gradient-to-r from-pink-500/0 via-pink-400/5 to-purple-500/0 blur-lg rotate-[-35deg]" />
      <div className="absolute bottom-[25%] left-[-20%] w-[60%] h-[35px] bg-gradient-to-r from-purple-500/0 via-violet-400/5 to-pink-500/0 blur-lg rotate-[-35deg]" />

      {/* Sparkling Twinking Stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white animate-premium-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}

      {/* Slow-moving Bokeh Lights */}
      {bokehs.map((bokeh) => (
        <div
          key={`bokeh-${bokeh.id}`}
          className="absolute rounded-full bg-gradient-to-br from-purple-600/10 to-rose-600/10 blur-[50px] animate-drifting-bokeh"
          style={{
            left: `${bokeh.left}%`,
            bottom: "-150px",
            width: `${bokeh.size}px`,
            height: `${bokeh.size}px`,
            animationDelay: `${bokeh.delay}s`,
            animationDuration: `${bokeh.duration}s`,
            opacity: bokeh.opacity,
          }}
        />
      ))}

      {/* Floating Outlined Magical Hearts */}
      {hearts.map((heart) => (
        <svg
          key={`heart-${heart.id}`}
          className="absolute text-rose-300 animate-float-luxury"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity,
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ))}

      {/* Interactive Sparkle Click Particles  */}
      {clickSparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            animation: `sparkleFade ${sparkle.duration}s forwards cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        >
          {/* Shimmering plus cross shape */}
          <div
            className="relative flex items-center justify-center animate-spin"
            style={{
              animationDuration: `${sparkle.duration * 3}s`,
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                backgroundColor: sparkle.color,
                filter: `blur(${sparkle.size / 3}px)`,
                opacity: 0.8,
              }}
            />
            {/* Elegant cross sparkles */}
            <div
              className="absolute bg-white"
              style={{
                width: "2px",
                height: `${sparkle.size * 1.5}px`,
                opacity: 0.9,
              }}
            />
            <div
              className="absolute bg-white"
              style={{
                width: `${sparkle.size * 1.5}px`,
                height: "2px",
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes sparkleFade {
          0% {
            transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.6) translateY(-90px) rotate(140deg);
            opacity: 0;
          }
        }

        @keyframes drifting-bokeh-anim {
          0% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(-80vh) translateX(50px) scale(1.2);
          }
          100% {
            transform: translateY(-110vh) translateX(-20px) scale(0.8);
            opacity: 0;
          }
        }

        .animate-drifting-bokeh {
          animation: drifting-bokeh-anim infinite linear;
        }

        @keyframes float-luxury-anim {
          0% {
            transform: translateY(110vh) translateX(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-20vh) translateX(40px) scale(0.85) rotate(15deg);
            opacity: 0;
          }
        }

        .animate-float-luxury {
          animation: float-luxury-anim infinite linear;
        }

        @keyframes premium-twinkle {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.7);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  );
}
