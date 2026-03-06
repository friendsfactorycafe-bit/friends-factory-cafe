'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

// Generate random time between min and max hours
const getRandomTime = () => {
  // Random hours between 2-6
  const hours = Math.floor(Math.random() * 5) + 2; // 2-6 hours
  // Random minutes between 0-59
  const minutes = Math.floor(Math.random() * 60);
  // Random seconds between 0-59
  const seconds = Math.floor(Math.random() * 60);
  
  return { hours, minutes, seconds };
};

// Get stored time or generate new one
const getInitialTime = () => {
  if (typeof window === 'undefined') return getRandomTime();
  
  const stored = localStorage.getItem('ffc_offer_timer');
  if (stored) {
    const { timestamp, initialTime } = JSON.parse(stored);
    const elapsed = Math.floor((Date.now() - timestamp) / 1000);
    const totalSeconds = initialTime.hours * 3600 + initialTime.minutes * 60 + initialTime.seconds - elapsed;
    
    if (totalSeconds > 0) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return { hours, minutes, seconds };
    }
  }
  
  // Generate new time and store it
  const newTime = getRandomTime();
  localStorage.setItem('ffc_offer_timer', JSON.stringify({
    timestamp: Date.now(),
    initialTime: newTime
  }));
  return newTime;
};

export function EvergreenCountdownTimer() {
  const [time, setTime] = useState({ hours: 4, minutes: 32, seconds: 15 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getInitialTime());
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Timer finished - reset with new random time
          const newTime = getRandomTime();
          localStorage.setItem('ffc_offer_timer', JSON.stringify({
            timestamp: Date.now(),
            initialTime: newTime
          }));
          return newTime;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) return null;

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="fixed top-20 right-3 z-50 animate-slide-in-right">
      {/* Liquid purple background effect - subtle glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-purple-400/20 via-purple-500/15 to-purple-400/20 rounded-2xl blur-xl animate-pulse" />
      
      <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-2.5 max-w-[180px]">
        {/* Animated background sparkles */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-white/40 rounded-full animate-twinkle" />
          <div className="absolute top-2 right-4 w-1 h-1 bg-white/30 rounded-full animate-twinkle delay-300" />
          <div className="absolute bottom-1 left-8 w-0.5 h-0.5 bg-white/50 rounded-full animate-twinkle delay-700" />
        </div>

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
            </div>
            <div>
              <p className="text-white font-bold text-[10px] leading-tight">🎉 Limited Offer!</p>
              <p className="text-white/80 text-[8px]">Extra 10% OFF</p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center gap-1 bg-white/10 rounded-lg p-1.5 backdrop-blur-sm">
            <Clock className="w-3 h-3 text-yellow-300 animate-pulse" />
            
            <div className="flex items-center gap-0.5">
              {/* Hours */}
              <div className="bg-white text-purple-700 px-1.5 py-0.5 rounded font-bold text-xs min-w-[22px] text-center shadow-inner">
                {formatNumber(time.hours)}
              </div>
              <span className="text-white font-bold text-xs">:</span>
              {/* Minutes */}
              <div className="bg-white text-purple-700 px-1.5 py-0.5 rounded font-bold text-xs min-w-[22px] text-center shadow-inner">
                {formatNumber(time.minutes)}
              </div>
              <span className="text-white font-bold text-xs">:</span>
              {/* Seconds */}
              <div className="bg-white text-purple-700 px-1.5 py-0.5 rounded font-bold text-xs min-w-[22px] text-center animate-pulse-fast shadow-inner">
                {formatNumber(time.seconds)}
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/917487888730?text=Hi!%20I%20want%20to%20avail%20the%20special%20offer%20on%20Friends%20Factory%20Cafe%20packages."
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 bg-yellow-400 hover:bg-yellow-300 text-purple-800 font-bold text-[10px] py-1.5 px-2 rounded-lg text-center transition-all hover:scale-105 shadow-md"
          >
            🔥 Claim Now
          </a>
        </div>
      </div>
    </div>
  );
}
