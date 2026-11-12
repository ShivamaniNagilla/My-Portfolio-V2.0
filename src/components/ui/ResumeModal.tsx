import React, { useState } from 'react';
import { X, Printer, Copy, Check, Download, Mail, ExternalLink, MapPin, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, SKILLS_DATA, PROJECTS_DATA } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const resumeText = `
NAGILLA SHIVAMANI
Aspiring Software Engineer | B.Tech CSE (AI & ML) - First Year
Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}
Institution: ${PERSONAL_INFO.college}

PROFILE SUMMARY
${PERSONAL_INFO.aboutIntroduction}

EDUCATION
${PERSONAL_INFO.degree} in ${PERSONAL_INFO.branch}
Specialization: ${PERSONAL_INFO.specialization}
Institution: ${PERSONAL_INFO.college}
Year: ${PERSONAL_INFO.currentYear} (${PERSONAL_INFO.expectedGraduation})

TECHNICAL SKILLS
- Programming: Python, C / C++
- Frontend: HTML5, CSS3, JavaScript (Learning), React (Exploring)
- Developer Tools: Git, GitHub, VS Code
- Core Engineering: Problem Solving, Logical Thinking, Debugging, Responsive Web Design
- AI & ML: AI Foundations, Machine Learning Fundamentals

PROJECTS
${PROJECTS_DATA.map((p, i) => `${i + 1}. ${p.name}
   ${p.tagline}
   ${p.description}
   Status: ${p.status}
   Tech: ${p.technologies.join(', ')}${p.liveUrl ? `\n   Live Link: ${p.liveUrl}` : ''}`).join('\n\n')}

CAREER OBJECTIVE
${PERSONAL_INFO.careerAspiration}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 bg-[#080B0A] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#030303]">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#39FF14]" />
            <h2 className="text-base font-bold text-white font-mono-tech tracking-wide">
              CURRICULUM VITAE // {PERSONAL_INFO.fullName.toUpperCase()}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-colors"
              title="Copy Resume as Plaintext"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY TEXT'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech text-black font-semibold bg-[#39FF14] hover:bg-[#32e012] transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Formatted Document */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 print:p-0 print:text-black print:bg-white">
          {/* Resume Header */}
          <div className="border-b border-zinc-800 pb-6 print:border-black flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-1.5">
              <h1 className="text-3xl font-extrabold tracking-tight text-white print:text-black">
                {PERSONAL_INFO.fullName}
              </h1>
              <p className="text-[#39FF14] font-medium text-base print:text-black">
                {PERSONAL_INFO.tagline} &middot; {PERSONAL_INFO.specialization}
              </p>
              <p className="text-zinc-400 text-sm flex items-center gap-2 print:text-zinc-700">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                {PERSONAL_INFO.college} &middot; {PERSONAL_INFO.location}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs font-mono-tech text-zinc-400 print:text-black">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#39FF14] flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#39FF14]" />
                {PERSONAL_INFO.email}
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#39FF14] flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#39FF14]" />
                linkedin.com/in/shivamani-nagilla
              </a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#39FF14] flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#39FF14]" />
                github.com/ShivamaniNagilla
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono-tech uppercase tracking-widest text-[#39FF14] print:text-black font-semibold border-b border-zinc-800 pb-1 print:border-black">
              Education
            </h2>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <h3 className="text-base font-bold text-white print:text-black">
                  {PERSONAL_INFO.degree} in {PERSONAL_INFO.branch}
                </h3>
                <span className="text-xs font-mono-tech text-zinc-400 print:text-black">
                  2025 &ndash; 2029 (Currently First Year)
                </span>
              </div>
              <p className="text-sm text-zinc-300 font-medium print:text-black">
                Specialization: {PERSONAL_INFO.specialization}
              </p>
              <p className="text-xs text-zinc-400 print:text-zinc-700">
                Institution: <span className="text-zinc-200 print:text-black font-semibold">{PERSONAL_INFO.college}</span>
              </p>
            </div>
          </div>

          {/* Technical Arsenal / Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono-tech uppercase tracking-widest text-[#39FF14] print:text-black font-semibold border-b border-zinc-800 pb-1 print:border-black">
              Technical Arsenal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-zinc-400 font-mono-tech">Programming Languages:</span>
                <p className="text-zinc-200 print:text-black font-medium">Python, C / C++ (Core concepts & algorithms)</p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-400 font-mono-tech">Frontend Development:</span>
                <p className="text-zinc-200 print:text-black font-medium">
                  HTML5, CSS3, JavaScript (Currently Learning), React (Exploring)
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-400 font-mono-tech">Tools & Workflow:</span>
                <p className="text-zinc-200 print:text-black font-medium">Git, GitHub, VS Code, Linux basics</p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-400 font-mono-tech">AI & Machine Learning:</span>
                <p className="text-zinc-200 print:text-black font-medium">
                  AI Foundations, Machine Learning Principles, AI Developer Tools
                </p>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <span className="text-zinc-400 font-mono-tech">Core Problem Solving:</span>
                <p className="text-zinc-200 print:text-black font-medium">
                  Problem Solving, Logical Thinking, Debugging, Responsive Web Design
                </p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono-tech uppercase tracking-widest text-[#39FF14] print:text-black font-semibold border-b border-zinc-800 pb-1 print:border-black">
              Featured Projects & Inventions
            </h2>

            {PROJECTS_DATA.map((proj) => (
              <div key={proj.id} className="space-y-1.5 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 print:border-zinc-300 print:bg-white">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="text-sm font-bold text-white print:text-black flex items-center gap-2">
                    {proj.name}
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30 font-normal">
                      {proj.status}
                    </span>
                  </h3>
                  <span className="text-xs font-mono-tech text-zinc-400 print:text-zinc-600">
                    {proj.timeline}
                  </span>
                </div>
                <p className="text-xs text-[#39FF14] font-mono-tech">{proj.tagline}</p>
                <p className="text-xs text-zinc-300 print:text-zinc-700 leading-relaxed">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-zinc-400">
                  <span className="text-zinc-500 font-mono-tech">Tech:</span>
                  {proj.technologies.map((t, idx) => (
                    <span key={idx} className="text-zinc-300 print:text-black">
                      {t}{idx < proj.technologies.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Career Aspiration */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono-tech uppercase tracking-widest text-[#39FF14] print:text-black font-semibold border-b border-zinc-800 pb-1 print:border-black">
              Career Trajectory & Aspiration
            </h2>
            <p className="text-xs text-zinc-300 print:text-black leading-relaxed italic">
              "{PERSONAL_INFO.careerAspiration}"
            </p>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-[#030303]">
          <span className="text-xs font-mono-tech text-zinc-500">
            Nagilla Shivamani &middot; NIAT X JOY UNIVERSITY
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono-tech text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
