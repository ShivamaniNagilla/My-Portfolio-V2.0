import React from 'react';
import { Sparkles, Orbit, Compass } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-12 pt-28 pb-12 overflow-hidden z-10"
    >
      {/* Top Telemetry Line */}
      <div className="relative z-10 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-zinc-800 text-[11px] font-mono-tech text-zinc-400 backdrop-blur-sm shadow-lg mb-4">
        <span className="w-2 h-2 rounded-full bg-[#00F5FF] shadow-[0_0_8px_#00F5FF]" />
        <span className="bg-gradient-to-r from-[#00F5FF] via-[#39FF14] to-[#FF9900] bg-clip-text text-transparent font-semibold">
          KERR METRIC SINGULARITY
        </span>
        <span className="text-zinc-600">|</span>
        <span className="text-[#39FF14]">ORBIT STABLE</span>
        <span className="text-zinc-600 hidden sm:inline">|</span>
        <span className="text-[#38BDF8] hidden sm:inline">PILOT: NAGILLA SHIVAMANI</span>
      </div>

      {/* Main Split Layout: Left Content + Right Circular Photo */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center py-6">
        {/* Left Column: Heading, Subtitle, Description & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="h-px w-6 bg-[#00F5FF]" />
              <p className="text-xs sm:text-sm font-mono-tech tracking-[0.25em] uppercase text-zinc-400">
                HELLO, WORLD. I&apos;M
              </p>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
              Nagilla Shivamani
            </h1>

            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3 text-sm sm:text-base font-medium text-zinc-300">
              <span className="font-mono-tech font-semibold bg-gradient-to-r from-[#00F5FF] via-[#39FF14] to-[#FF9900] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(57,255,20,0.5)]">
                An Aspiring Software Engineer
              </span>
              <span className="hidden sm:inline text-zinc-600">&bull;</span>
              <span className="text-zinc-400 font-mono-tech text-xs sm:text-sm">
                First-Year B.Tech CSE (AI & ML)
              </span>
            </div>
          </div>

          <p className="max-w-xl text-sm sm:text-base text-zinc-300/90 leading-relaxed font-normal">
            {PERSONAL_INFO.heroDescription}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <MagneticButton
              variant="primary"
              onClick={() => scrollTo('about')}
              className="group"
            >
              <Orbit className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
              <span>EXPLORE MY UNIVERSE</span>
            </MagneticButton>

            <MagneticButton
              variant="outline"
              onClick={() => scrollTo('projects')}
              className="group"
            >
              <Sparkles className="w-4 h-4 text-[#00F5FF]" />
              <span>VIEW MY PROJECTS</span>
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={onOpenResume}
            >
              <span>DOWNLOAD RESUME</span>
            </MagneticButton>
          </div>

          {/* Quick Institutional Micro-badge */}
          <div className="pt-2 flex items-center gap-2 text-xs font-mono-tech text-zinc-500">
            <Compass className="w-3.5 h-3.5 text-[#00F5FF]" />
            <span>{PERSONAL_INFO.college} &middot; FIRST YEAR CADET</span>
          </div>
        </div>

        {/* Right Column: Circular Photo with Pure Cosmic Colours Figcaption */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <figure className="relative group flex flex-col items-center justify-center">
            {/* Outer Rotating Sci-Fi Ring 1 (Nebula Cyan & Stellar Amber) */}
            <div
              className="absolute -top-6 -left-6 -right-6 h-[calc(100%-3rem)] rounded-full border border-dashed border-[#00F5FF]/40 pointer-events-none animate-spin"
              style={{ animationDuration: '30s' }}
            />

            {/* Outer Orbit Ring 2 with Cosmic Accent Dots */}
            <div
              className="absolute -top-10 -left-10 -right-10 h-[calc(100%-2rem)] rounded-full border border-[#C084FC]/25 pointer-events-none animate-spin"
              style={{ animationDuration: '45s', animationDirection: 'reverse' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#00F5FF] shadow-[0_0_12px_#00F5FF]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[#FF9900] shadow-[0_0_10px_#FF9900]" />
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
            </div>

            {/* Glowing Pure Cosmic Halo behind Photo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00F5FF]/25 via-[#C084FC]/20 to-[#FF9900]/25 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Circular Photo Container */}
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full p-1 bg-gradient-to-tr from-[#00F5FF] via-[#39FF14] via-[#C084FC] to-[#FF9900] shadow-[0_0_45px_rgba(0,245,255,0.4)] group-hover:shadow-[0_0_65px_rgba(57,255,20,0.5)] transition-all duration-500">
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 relative">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt="Shivamani Nagilla"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* PURE COSMIC COLOURS FIGCAPTION */}
            <figcaption className="relative mt-5 px-5 py-2.5 rounded-2xl bg-black/85 border border-[#00F5FF]/50 shadow-[0_0_30px_rgba(0,245,255,0.35)] backdrop-blur-md flex flex-col items-center text-center space-y-1 max-w-xs transition-all duration-300 group-hover:border-[#39FF14]/70 group-hover:shadow-[0_0_35px_rgba(57,255,20,0.45)]">
              {/* Cosmic Stardust Glow Line */}
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#00F5FF] via-[#39FF14] to-transparent" />

              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F5FF] shadow-[0_0_8px_#00F5FF]" />
                </span>

                <span className="text-sm sm:text-base font-mono-tech font-extrabold tracking-wider uppercase bg-gradient-to-r from-[#00F5FF] via-[#39FF14] via-[#FFD700] to-[#FF9900] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(0,245,255,0.6)]">
                  Shivamani Nagilla
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono-tech tracking-wider uppercase">
                <span className="bg-gradient-to-r from-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent font-semibold">
                  CADET &middot; CSE (AI &amp; ML)
                </span>
                <span className="text-zinc-600">&bull;</span>
                <span className="bg-gradient-to-r from-[#38BDF8] to-[#39FF14] bg-clip-text text-transparent font-semibold">
                  NIAT X JOY UNIV
                </span>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 pt-2">
        <button
          onClick={() => scrollTo('about')}
          className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-[#00F5FF] transition-colors group cursor-pointer"
          aria-label="Scroll to explore"
        >
          <span className="text-[10px] font-mono-tech tracking-[0.2em] uppercase font-medium">
            SCROLL TO EXPLORE
          </span>
          <div className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center p-1 group-hover:border-[#00F5FF] transition-colors">
            <div className="w-1 h-2 bg-[#00F5FF] rounded-full animate-bounce shadow-[0_0_6px_#00F5FF]" />
          </div>
        </button>
      </div>
    </section>
  );
};
