import React, { useState } from 'react';
import { Cpu, Terminal, Layout, Wrench, BrainCircuit, Check, Flame, Compass } from 'lucide-react';
import { SKILLS_DATA } from '../../data/portfolioData';
import { SkillItem, SkillStatus } from '../../types/portfolio';

export const SkillsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'known' | 'learning'>('all');

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (filter === 'all') return true;
    if (filter === 'known') return skill.status === 'known';
    if (filter === 'learning') return skill.status === 'learning' || skill.status === 'exploring';
    return true;
  });

  const categories = [
    { name: 'Programming Languages', key: 'Programming', icon: Terminal },
    { name: 'Frontend Development', key: 'Frontend', icon: Layout },
    { name: 'Developer Tools', key: 'Tools', icon: Wrench },
    { name: 'Core Problem Solving', key: 'Core', icon: BrainCircuit },
    { name: 'Artificial Intelligence & ML', key: 'AI & ML', icon: Cpu },
  ];

  const getStatusBadge = (status: SkillStatus) => {
    switch (status) {
      case 'known':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30 font-medium">
            <Check className="w-3 h-3" /> ACTIVE SKILL
          </span>
        );
      case 'learning':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono-tech px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
            <Flame className="w-3 h-3 text-amber-400" /> CURRENTLY LEARNING
          </span>
        );
      case 'exploring':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono-tech px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30 font-medium">
            <Compass className="w-3 h-3 text-blue-400" /> EXPLORING
          </span>
        );
    }
  };

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#39FF14] tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>ARSENAL // 02</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            MY TECHNICAL ARSENAL
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl">
            A transparent overview of mastered foundations alongside emerging technologies in active development.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1 p-1 bg-zinc-950 rounded-xl border border-zinc-800 self-start md:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-mono-tech rounded-lg transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#39FF14] text-black font-semibold shadow-[0_0_12px_rgba(57,255,20,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ALL CAPABILITIES
          </button>
          <button
            onClick={() => setFilter('known')}
            className={`px-3 py-1.5 text-xs font-mono-tech rounded-lg transition-all cursor-pointer ${
              filter === 'known'
                ? 'bg-[#39FF14] text-black font-semibold shadow-[0_0_12px_rgba(57,255,20,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ACTIVE KNOWLEDGE
          </button>
          <button
            onClick={() => setFilter('learning')}
            className={`px-3 py-1.5 text-xs font-mono-tech rounded-lg transition-all cursor-pointer ${
              filter === 'learning'
                ? 'bg-[#39FF14] text-black font-semibold shadow-[0_0_12px_rgba(57,255,20,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            IN PROGRESS
          </button>
        </div>
      </div>

      {/* Categorized Skills Grid */}
      <div className="space-y-12">
        {categories.map((cat) => {
          const categorySkills = filteredSkills.filter((s) => s.category === cat.key);
          if (categorySkills.length === 0) return null;

          const CategoryIcon = cat.icon;

          return (
            <div key={cat.key} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3">
                <CategoryIcon className="w-4 h-4 text-[#39FF14]" />
                <h3 className="text-base font-bold text-white font-mono-tech tracking-wide">
                  {cat.name.toUpperCase()}
                </h3>
                <span className="text-xs text-zinc-500 font-mono-tech ml-auto">
                  {categorySkills.length} MODULES
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categorySkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="glass-panel glass-panel-hover rounded-xl p-5 border border-zinc-800/80 relative flex flex-col justify-between gap-4 group transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-white group-hover:text-[#39FF14] transition-colors">
                          {skill.name}
                        </h4>
                      </div>
                      {skill.note && (
                        <p className="text-xs text-zinc-400 font-mono-tech">
                          {skill.note}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-zinc-900 flex items-center justify-between">
                      {getStatusBadge(skill.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
