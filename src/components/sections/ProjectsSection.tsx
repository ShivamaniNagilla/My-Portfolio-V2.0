import React, { useState } from 'react';
import { Radio, ExternalLink, Github, Plus, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { ProjectModal } from '../ui/ProjectModal';
import { AddProjectModal } from '../ui/AddProjectModal';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('shivamani_custom_projects');
      if (saved) {
        return [...PROJECTS_DATA, ...JSON.parse(saved)];
      }
    } catch {}
    return PROJECTS_DATA;
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddProject = (newProject: ProjectItem) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    try {
      const customOnly = updated.filter((p) => p.id.startsWith('custom-'));
      localStorage.setItem('shivamani_custom_projects', JSON.stringify(customOnly));
    } catch {}
  };

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#39FF14] tracking-widest uppercase">
            <Radio className="w-3.5 h-3.5" />
            <span>TRANSMISSIONS // 03</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            TRANSMISSION FROM MY UNIVERSE
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl">
            Selected software concepts, game narratives, and interactive web artifacts engineered into existence.
          </p>
        </div>

        {/* Add Project Action Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-mono-tech text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-[#39FF14]/50 rounded-xl transition-all cursor-pointer self-start md:self-auto group"
        >
          <Plus className="w-4 h-4 text-[#39FF14] transition-transform group-hover:rotate-90 duration-300" />
          <span>ADD NEW PROJECT</span>
        </button>
      </div>

      {/* Projects Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            data-cursor="project"
            onClick={() => setSelectedProject(project)}
            className="group glass-panel rounded-2xl border border-zinc-800/90 hover:border-[#39FF14]/50 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-[0_0_35px_rgba(57,255,20,0.15)] hover:-translate-y-1.5 cursor-pointer"
          >
            {/* Visual Preview Slot */}
            <div className="relative aspect-video overflow-hidden border-b border-zinc-800/80 bg-zinc-950">
              <img
                src={project.imageUrl}
                alt={project.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B0A] via-transparent to-transparent opacity-90" />

              {/* Status Pill on top-right */}
              <div className="absolute top-4 right-4 z-10">
                <span
                  className={`text-[11px] font-mono-tech font-semibold px-3 py-1 rounded-full border backdrop-blur-md ${
                    project.status === 'Live'
                      ? 'bg-emerald-500/20 text-[#39FF14] border-[#39FF14]/40 shadow-[0_0_10px_rgba(57,255,20,0.3)]'
                      : 'bg-zinc-900/80 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {project.status.toUpperCase()}
                </span>
              </div>

              {/* View Overlay Hint */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-mono-tech text-zinc-400 group-hover:text-white transition-colors">
                  MISSION // {project.id.toUpperCase()}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono-tech text-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>INSPECT TRANSMISSION</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#39FF14] transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-[#39FF14] font-mono-tech font-medium">
                  {project.tagline}
                </p>
                <p className="text-sm text-zinc-300/90 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack & Links */}
              <div className="space-y-4 pt-4 border-t border-zinc-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono-tech bg-zinc-950 border border-zinc-800 text-zinc-400 group-hover:border-zinc-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer action buttons */}
                <div
                  className="flex items-center gap-3 pt-2"
                  onClick={(e) => e.stopPropagation()} // Prevent card modal when clicking direct external link
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#39FF14] text-black text-xs font-mono-tech font-semibold hover:bg-[#32e012] shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all cursor-pointer"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono-tech transition-colors cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>CODE</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="ml-auto text-xs font-mono-tech text-zinc-400 hover:text-[#39FF14] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>DETAILS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </section>
  );
};
