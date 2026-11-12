import React from 'react';
import { ArrowUp, Heart, Compass } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-zinc-800/80 bg-[#080B0A] text-zinc-400 py-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Status Indicator */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39FF14]" />
            </span>
            <span className="text-xs font-mono-tech text-white font-medium">
              AVAILABLE FOR LEARNING & COLLABORATION
            </span>
          </div>
          <span className="hidden sm:inline text-zinc-700">&bull;</span>
          <span className="text-xs font-mono-tech text-zinc-500">
            {PERSONAL_INFO.college}
          </span>
        </div>

        {/* Center: Main Required Statement */}
        <div className="text-center space-y-1">
          <p className="text-xs font-mono-tech uppercase tracking-widest text-[#39FF14]">
            DESIGNED IN THE DIGITAL UNIVERSE.
          </p>
          <p className="text-xs text-zinc-500 font-mono-tech">
            &copy; 2026 {PERSONAL_INFO.fullName}. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#39FF14]/50 text-xs font-mono-tech text-zinc-300 hover:text-[#39FF14] transition-all cursor-pointer group shadow-lg"
          aria-label="Back to top"
        >
          <span>RETURN TO APEX</span>
          <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
        </button>
      </div>
    </footer>
  );
};
