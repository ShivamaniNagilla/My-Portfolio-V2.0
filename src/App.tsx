import React, { useState, useEffect } from 'react';
import { BlackHoleCanvas } from './components/3d/BlackHoleCanvas';
import { CustomCursor } from './components/ui/CustomCursor';
import { BootSequence } from './components/ui/BootSequence';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';
import { ResumeModal } from './components/ui/ResumeModal';

export default function App() {
  const [bootComplete, setBootComplete] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    // Check if user already saw the boot sequence in this session
    const hasBooted = sessionStorage.getItem('shivamani_has_booted');
    if (hasBooted === 'true') {
      setBootComplete(true);
    }

    // Active section observer
    const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBootComplete = () => {
    setBootComplete(true);
    try {
      sessionStorage.setItem('shivamani_has_booted', 'true');
    } catch {}
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-100 overflow-x-hidden selection:bg-[#39FF14] selection:text-black">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Spacecraft Boot Sequence on Initial Load */}
      {!bootComplete && <BootSequence onComplete={handleBootComplete} />}

      {/* 3D Interstellar Gargantua Black Hole Canvas (Fixed Background for Hero & Deep Parallax) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <BlackHoleCanvas />
        {/* Subtle vignette and grain overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(3,3,3,0.85)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      </div>

      {/* Main App Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Floating Glassmorphic Top Navigation */}
        <Navbar
          activeSection={activeSection}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Hero Section with Cinematic Black Hole Foreground */}
        <HeroSection onOpenResume={() => setResumeOpen(true)} />

        {/* Section Dividers & Background Fade - Translucent so space background is visible throughout */}
        <div className="relative z-10 bg-gradient-to-b from-transparent via-[#030303]/40 to-[#030303]/65 space-y-8">
          {/* About Me Section */}
          <AboutSection />

          {/* Technical Arsenal / Skills Section */}
          <SkillsSection />

          {/* Projects Transmission Section */}
          <ProjectsSection />

          {/* Milestones / Achievements Section */}
          <AchievementsSection />

          {/* Sublight Comms / Contact Section */}
          <ContactSection />

          {/* Digital Universe Footer */}
          <Footer />
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
