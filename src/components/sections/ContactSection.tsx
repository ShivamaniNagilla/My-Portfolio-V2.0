import React, { useState } from 'react';
import { Mail, Send, Linkedin, Github, Copy, Check, MessageSquare, Compass, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please provide your name, email, and message before transmitting.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    // Prepare real mailto link and trigger
    try {
      const emailSubject = encodeURIComponent(subject.trim() || `Portfolio Transmission from ${name}`);
      const emailBody = encodeURIComponent(
        `Hi Nagilla Shivamani,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nTransmitted from Interstellar Portfolio`
      );
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${emailSubject}&body=${emailBody}`;

      // Trigger user's mail client directly
      window.location.href = mailtoUrl;

      // Celebrate interaction
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#39FF14', '#ffffff', '#ff9900'],
        });
      } catch {}

      setStatusMessage({
        type: 'success',
        text: `Transmission initiated! Your default mail client has opened addressed to ${PERSONAL_INFO.email}.`,
      });

      // Clear fields
      setMessage('');
      setSubject('');
    } catch {
      setStatusMessage({
        type: 'info',
        text: `Direct mailto trigger attempted. You can also write directly to ${PERSONAL_INFO.email}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="space-y-2 mb-16 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-mono-tech text-[#39FF14] tracking-widest uppercase">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>SUBLIGHT COMMS // 05</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          LET&apos;S CONNECT ACROSS THE UNIVERSE
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Have an interesting idea, collaboration, or opportunity? Let&apos;s build something extraordinary together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Connection Channels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Primary Email Card */}
          <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-zinc-800/80 space-y-4 relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                <Mail className="w-5 h-5" />
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-tech text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-700 transition-colors cursor-pointer"
                title="Copy Email Address"
              >
                {emailCopied ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{emailCopied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            <div>
              <span className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider">
                Direct Communications
              </span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="block text-base sm:text-lg font-bold text-white hover:text-[#39FF14] font-mono-tech transition-colors mt-0.5 break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Open to engineering discussions, collaborative AI/ML research, open-source projects, and student developer initiatives.
            </p>
          </div>

          {/* Social / Professional Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glass-panel-hover rounded-xl p-5 border border-zinc-800/80 flex flex-col justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <Linkedin className="w-5 h-5 text-[#39FF14]" />
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <span className="text-xs font-mono-tech text-zinc-500 block">LINKEDIN</span>
                <span className="text-sm font-bold text-white group-hover:text-[#39FF14] transition-colors">
                  Nagilla Shivamani
                </span>
              </div>
            </a>

            {/* GitHub */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glass-panel-hover rounded-xl p-5 border border-zinc-800/80 flex flex-col justify-between gap-4 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <Github className="w-5 h-5 text-[#39FF14]" />
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <span className="text-xs font-mono-tech text-zinc-500 block">GITHUB</span>
                <span className="text-sm font-bold text-white group-hover:text-[#39FF14] transition-colors">
                  ShivamaniNagilla
                </span>
              </div>
            </a>
          </div>

          {/* Institutional Anchor */}
          <div className="glass-panel rounded-xl p-5 border border-zinc-800/80 flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#39FF14] shrink-0" />
            <div className="text-xs font-mono-tech">
              <span className="text-zinc-500 block">BASE OBSERVATORY</span>
              <span className="text-zinc-200 font-semibold">{PERSONAL_INFO.college}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Working Contact Form */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-zinc-800/80 relative">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-zinc-800/80 pb-3 mb-4 flex items-center justify-between">
              <span className="text-xs font-mono-tech text-[#39FF14] font-semibold">
                QUANTUM TRANSMISSION CONSOLE
              </span>
              <span className="text-[11px] font-mono-tech text-zinc-500">
                RECIPIENT: NAGILLA SHIVAMANI
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-tech text-zinc-400 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Brand"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-zinc-400 mb-1.5">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. elena@nasa.gov"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-tech text-zinc-400 mb-1.5">
                Transmission Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Collaboration on AI & Machine Learning Research"
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-tech text-zinc-400 mb-1.5">
                Message Content *
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Compose your transmission here..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-[#39FF14] text-sm text-white outline-none transition-colors resize-none"
              />
            </div>

            {statusMessage && (
              <div
                className={`p-3 rounded-lg text-xs font-mono-tech border ${
                  statusMessage.type === 'success'
                    ? 'bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/30'
                    : statusMessage.type === 'error'
                    ? 'bg-red-500/10 text-red-400 border-red-500/30'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-700'
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#39FF14] text-black font-semibold text-xs font-mono-tech hover:bg-[#32e012] shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
