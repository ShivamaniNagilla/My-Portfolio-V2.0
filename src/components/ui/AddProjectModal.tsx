import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: ProjectItem) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onAddProject }) => {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [status, setStatus] = useState<'Concept' | 'In Progress' | 'Live' | 'Completed'>('In Progress');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [role, setRole] = useState('Developer / Creator');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const techArray = technologies
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newProject: ProjectItem = {
      id: `custom-project-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || 'Software Engineering Project',
      description: description.trim(),
      technologies: techArray.length > 0 ? techArray : ['Web Development', 'Computer Science'],
      status,
      liveUrl: liveUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      imageUrl: '/src/assets/images/health_watch_ui_1794412753485.jpg', // fallback image
      role: role.trim() || 'Software Engineer',
      timeline: '2026',
      highlights: [
        'Designed and implemented responsive software architecture',
        'Modular computational logic and modern tooling',
      ],
    };

    onAddProject(newProject);
    onClose();

    // Reset form
    setName('');
    setTagline('');
    setDescription('');
    setTechnologies('');
    setLiveUrl('');
    setGithubUrl('');
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-[#080B0A] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#030303]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#39FF14]" />
            <h2 className="text-sm font-bold text-white font-mono-tech tracking-wide">
              NEW MISSION RECORD // ADD PROJECT
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-xs font-mono-tech text-zinc-400 mb-1">Project Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Autonomous Satellite Navigator"
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none font-mono-tech"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-tech text-zinc-400 mb-1">Subtitle / Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. AI-driven orbit trajectory prediction system"
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none font-mono-tech"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-tech text-zinc-400 mb-1">Project Description *</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of what the project does and the problem it solves..."
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-tech text-zinc-400 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none font-mono-tech"
              >
                <option value="Concept">Concept</option>
                <option value="In Progress">In Progress</option>
                <option value="Live">Live</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono-tech text-zinc-400 mb-1">Your Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Creator / Solo Engineer"
                className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none font-mono-tech"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-tech text-zinc-400 mb-1">
              Technologies Used (Comma-separated)
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="e.g. Python, PyTorch, React, Tailwind CSS"
              className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none font-mono-tech"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-tech text-zinc-400 mb-1">Live Demo URL (Optional)</label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none font-mono-tech text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-tech text-zinc-400 mb-1">GitHub URL (Optional)</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none font-mono-tech text-xs"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono-tech text-zinc-400 hover:text-white bg-transparent hover:bg-zinc-800 rounded-lg transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#39FF14] text-black font-semibold text-xs font-mono-tech hover:bg-[#32e012] shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD TO SHOWCASE</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
