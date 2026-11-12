import React, { useState } from 'react';
import {
  GraduationCap,
  Target,
  Rocket,
  Compass,
  CheckCircle2,
  Clock,
  Circle,
  Sparkles,
  Cpu,
  Radio,
  Award,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [goals, setGoals] = useState(PERSONAL_INFO.learningGoals);

  const toggleGoal = (index: number) => {
    setGoals((prev) =>
      prev.map((g, i) => (i === index ? { ...g, done: !g.done } : g))
    );
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const portfolioPreviews = [
    {
      id: 'skills',
      title: 'Technical Arsenal',
      kicker: '01 // SKILLS',
      icon: Cpu,
      badge: 'Active & Learning',
      description:
        'Core computational languages (Python, C/C++), modern frontend architecture (HTML5, CSS3, JavaScript, React), and emerging AI & Machine Learning paradigms.',
      actionLabel: 'Explore Skills',
    },
    {
      id: 'projects',
      title: 'Transmissions',
      kicker: '02 // PROJECTS',
      icon: Radio,
      badge: 'Concepts & Live',
      description:
        'Mythology-inspired game concept "The Lost Danta of Ganesha" featuring ancient temple puzzles, and "Health Watch DashBoard" live biometric tracking.',
      actionLabel: 'View Projects',
    },
    {
      id: 'achievements',
      title: 'Trajectory & Milestones',
      kicker: '03 // ACHIEVEMENTS',
      icon: Award,
      badge: 'Academic Roadmap',
      description:
        'B.Tech CSE (AI & ML) induction at NIAT X JOY UNIVERSITY, foundational software launches, and upcoming hackathon competitive arenas.',
      actionLabel: 'Inspect Milestones',
    },
    {
      id: 'contact',
      title: 'Sublight Comms',
      kicker: '04 // CONTACT',
      icon: MessageSquare,
      badge: 'Open for Collaboration',
      description:
        'Direct access via shivamani.7981570112@gmail.com, professional LinkedIn networking, GitHub code repositories, and an encrypted transmission console.',
      actionLabel: 'Connect With Me',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 space-y-16">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono-tech text-[#39FF14] tracking-widest uppercase">
          <Compass className="w-3.5 h-3.5" />
          <span>DOSSIER // 01</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          BEYOND THE HORIZON
        </h2>
        <p className="text-zinc-400 text-sm max-w-xl">
          An insight into my academic trajectory, engineering discipline, and a preview across all dimensions of my work.
        </p>
      </div>

      {/* Main Dossier Grid: Portrait/Bio + Education/Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Portrait & Identity Lockup */}
        <div className="lg:col-span-5 flex flex-col justify-between glass-panel rounded-2xl p-6 sm:p-8 border border-zinc-800/90 relative overflow-hidden group">
          {/* Subtle glowing accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#39FF14]/60 to-transparent" />

          <div className="space-y-6">
            {/* Compact Pilot Identity Header (No big photo) */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-black/60 border border-zinc-800/80 shadow-lg">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#00F5FF] via-[#39FF14] to-[#FF9900] shadow-[0_0_15px_rgba(0,245,255,0.3)] shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950">
                  <img
                    src={PERSONAL_INFO.avatarUrl}
                    alt="Shivamani Nagilla"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/30 font-semibold tracking-wider">
                  STATUS: ACTIVE CADET
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight bg-gradient-to-r from-[#00F5FF] via-[#39FF14] to-[#FF9900] bg-clip-text text-transparent">
                  Shivamani Nagilla
                </h3>
                <p className="text-[11px] font-mono-tech text-zinc-400">
                  NIAT X JOY UNIVERSITY // CSE (AI & ML)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono-tech uppercase tracking-wider text-zinc-400">
                Introduction & Overview
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {PERSONAL_INFO.aboutIntroduction}
              </p>
            </div>
          </div>

          {/* Career Aspiration Callout */}
          <div className="mt-6 pt-6 border-t border-zinc-800/80 space-y-2 bg-black/40 -mx-6 -mb-6 p-6 rounded-b-2xl">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#39FF14]">
              <Target className="w-3.5 h-3.5" />
              <span>CAREER ASPIRATION</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 italic leading-relaxed">
              &ldquo;{PERSONAL_INFO.careerAspiration}&rdquo;
            </p>
          </div>
        </div>

        {/* Right Column: Education, Interests, and Interactive Learning Goals */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Education Telemetry Card */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#39FF14]">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <span className="text-xs font-mono-tech text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                CURRENT: 1ST YEAR
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {PERSONAL_INFO.degree} in {PERSONAL_INFO.branch}
                </h3>
                <p className="text-sm text-[#39FF14] font-medium mt-0.5">
                  Specialization: {PERSONAL_INFO.specialization}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono-tech text-zinc-400">
                <div className="p-3 rounded-lg bg-black/50 border border-zinc-900">
                  <span className="text-zinc-500 block mb-1">COLLEGE / UNIVERSITY</span>
                  <span className="text-zinc-200 font-semibold">{PERSONAL_INFO.college}</span>
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-zinc-900">
                  <span className="text-zinc-500 block mb-1">PROGRAM STANDING</span>
                  <span className="text-zinc-200 font-semibold">1st Year (Expected 2029)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interests Matrix */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#39FF14] mb-4">
              <Sparkles className="w-4 h-4" />
              <span>CORE INTELLECTUAL INTERESTS</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {PERSONAL_INFO.interests.map((interest, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono-tech bg-zinc-950/80 border border-zinc-800 text-zinc-300 hover:border-[#39FF14]/50 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                  <span>{interest}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Learning Goals Tracker */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-zinc-800/80 flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#39FF14]">
                <Rocket className="w-4 h-4" />
                <span>MISSION ROADMAP // LEARNING GOALS</span>
              </div>
              <span className="text-[11px] font-mono-tech text-zinc-500">
                {goals.filter((g) => g.done).length} / {goals.length} ACTIVE MILESTONES
              </span>
            </div>

            <div className="space-y-2.5">
              {goals.map((goal, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleGoal(idx)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    goal.done
                      ? 'bg-[#39FF14]/5 border-[#39FF14]/30 text-zinc-200'
                      : goal.inProgress
                      ? 'bg-zinc-950/80 border-amber-500/30 text-zinc-300'
                      : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {goal.done ? (
                      <CheckCircle2 className="w-4 h-4 text-[#39FF14] shrink-0" />
                    ) : goal.inProgress ? (
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-zinc-600 shrink-0" />
                    )}
                    <span className="text-xs sm:text-sm font-medium">{goal.title}</span>
                  </div>

                  <span className="text-[10px] font-mono-tech uppercase tracking-wider shrink-0 text-zinc-500">
                    {goal.done ? 'MASTERED' : goal.inProgress ? 'IN PROGRESS' : 'QUEUED'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PORTFOLIO MISSION PREVIEW GRID (Skills, Projects, Achievements, Contact) */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#39FF14]">
            <Compass className="w-4 h-4" />
            <span className="font-semibold tracking-wider uppercase">PORTFOLIO MISSION PREVIEW</span>
          </div>
          <span className="text-xs font-mono-tech text-zinc-500">
            QUICK NAVIGATION &amp; SECTOR ACCESS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {portfolioPreviews.map((preview) => {
            const IconComponent = preview.icon;
            return (
              <div
                key={preview.id}
                onClick={() => scrollTo(preview.id)}
                className="glass-panel glass-panel-hover rounded-xl p-5 border border-zinc-800/80 flex flex-col justify-between gap-4 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#39FF14]/50"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-black border border-zinc-800 flex items-center justify-center text-[#39FF14] group-hover:border-[#39FF14] transition-colors shadow-[0_0_12px_rgba(57,255,20,0.15)]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30">
                      {preview.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono-tech text-zinc-500 block mb-0.5">
                      {preview.kicker}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#39FF14] transition-colors">
                      {preview.title}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {preview.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono-tech text-[#39FF14] font-medium group-hover:text-white transition-colors">
                  <span>{preview.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
