import React from 'react';
import { Award, Compass, Calendar, GraduationCap, Code, Rocket, Sparkles } from 'lucide-react';
import { MILESTONES_DATA } from '../../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Academic':
        return GraduationCap;
      case 'Project':
        return Code;
      case 'Hackathon':
        return Rocket;
      default:
        return Award;
    }
  };

  return (
    <section id="achievements" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="space-y-2 mb-16">
        <div className="flex items-center gap-2 text-xs font-mono-tech text-[#39FF14] tracking-widest uppercase">
          <Award className="w-3.5 h-3.5" />
          <span>TRAJECTORY // 04</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          MILESTONES IN MY JOURNEY
        </h2>
        <p className="text-zinc-400 text-sm max-w-xl">
          Tracking the progression of academic achievements, technical workshops, and competitive horizons.
        </p>
      </div>

      {/* Prominent Golden Banner for Beginning Journey */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-zinc-800/80 mb-16 relative overflow-hidden text-center max-w-3xl mx-auto">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,20,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="flex flex-col items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/40 flex items-center justify-center text-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.25)]">
            <Compass className="w-5 h-5 animate-spin duration-1000" style={{ animationDuration: '12s' }} />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-mono-tech text-[#39FF14] tracking-wider text-glow-neon uppercase">
            &ldquo;THE JOURNEY HAS JUST BEGUN. MORE MILESTONES AWAIT.&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed">
            As a first-year undergraduate in Artificial Intelligence & Machine Learning at NIAT X JOY UNIVERSITY, every day marks an expanding horizon of computational exploration.
          </p>
        </div>
      </div>

      {/* Futuristic Timeline */}
      <div className="relative border-l border-zinc-800/80 ml-4 sm:ml-8 md:ml-32 space-y-12">
        {MILESTONES_DATA.map((milestone, idx) => {
          const MilestoneIcon = getIcon(milestone.category);
          const isUpcoming = milestone.status === 'Upcoming';
          const isInProgress = milestone.status === 'In Progress';

          return (
            <div key={milestone.id} className="relative pl-8 sm:pl-10 group">
              {/* Timeline Node Point */}
              <div
                className={`absolute -left-3 top-1.5 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isUpcoming
                    ? 'bg-black border-zinc-700 text-zinc-500'
                    : isInProgress
                    ? 'bg-black border-amber-500 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                    : 'bg-black border-[#39FF14] text-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.5)]'
                }`}
              >
                <MilestoneIcon className="w-3 h-3" />
              </div>

              {/* Timestamp label on left for wide screens */}
              <div className="hidden md:block absolute -left-36 top-1.5 w-28 text-right font-mono-tech text-xs text-zinc-500 group-hover:text-[#39FF14] transition-colors">
                {milestone.year}
              </div>

              {/* Milestone Card */}
              <div className="glass-panel glass-panel-hover rounded-xl p-6 border border-zinc-800/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="md:hidden text-xs font-mono-tech text-[#39FF14] font-semibold">
                    {milestone.year}
                  </span>

                  <h4 className="text-lg font-bold text-white group-hover:text-[#39FF14] transition-colors">
                    {milestone.title}
                  </h4>

                  <span
                    className={`self-start text-[10px] font-mono-tech px-2.5 py-0.5 rounded-full border ${
                      isUpcoming
                        ? 'bg-zinc-900 text-zinc-400 border-zinc-700'
                        : isInProgress
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/30'
                    }`}
                  >
                    {milestone.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs font-mono-tech text-zinc-400">
                  {milestone.institution} &middot; {milestone.category}
                </p>

                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  {milestone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
