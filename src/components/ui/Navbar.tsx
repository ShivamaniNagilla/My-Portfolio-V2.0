import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Compass } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'ACHIEVEMENTS', href: '#achievements', id: 'achievements' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#030303]/80 backdrop-blur-md border-b border-zinc-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-black border border-zinc-700 flex items-center justify-center group-hover:border-[#39FF14] transition-colors shadow-[0_0_12px_rgba(57,255,20,0.15)]">
              <Compass className="w-4 h-4 text-[#39FF14] transition-transform duration-500 group-hover:rotate-90" />
            </div>
            <span className="font-bold text-base tracking-tight text-white group-hover:text-[#39FF14] transition-colors">
              NAGILLA SHIVAMANI
            </span>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono-tech tracking-wider">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#39FF14] font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#39FF14] shadow-[0_0_8px_#39FF14]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Resume CTA + Mobile Hamburger) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-mono-tech font-semibold text-black bg-[#39FF14] hover:bg-[#32e012] rounded-lg shadow-[0_0_15px_rgba(57,255,20,0.4)] transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-800"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-24 px-6 pb-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="text-xs font-mono-tech text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">
              ORBITAL NAVIGATION
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-mono-tech transition-colors flex items-center justify-between ${
                    activeSection === link.id ? 'text-[#39FF14] font-bold' : 'text-zinc-300'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && <span className="text-xs text-[#39FF14]">CURRENT</span>}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-zinc-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-3 rounded-xl bg-[#39FF14] text-black font-mono-tech font-bold text-sm flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>VIEW FULL RESUME</span>
            </button>

            <div className="flex items-center justify-between text-xs font-mono-tech text-zinc-500">
              <span>{PERSONAL_INFO.college}</span>
              <span>1ST YEAR CSE (AI & ML)</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
