import React, { useState } from 'react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Layers, Cpu, MapPin, Navigation, Radio, Loader2 } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [geoData, setGeoData] = useState<{
    lat: number;
    lng: number;
    accuracy: number;
    altitude: number | null;
    timestamp: string;
    isLive: boolean;
  } | null>(null);
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  if (!project) return null;

  const handleTestGeolocation = () => {
    setLoadingGeo(true);
    setGeoError(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoData({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            timestamp: new Date(position.timestamp).toLocaleTimeString(),
            isLive: true,
          });
          setLoadingGeo(false);
        },
        (error) => {
          // Fallback to simulated satellite orbital coordinate fix
          setGeoData({
            lat: 28.6139 + (Math.random() - 0.5) * 0.05,
            lng: 77.209 + (Math.random() - 0.5) * 0.05,
            accuracy: 4.8,
            altitude: 216.4,
            timestamp: new Date().toLocaleTimeString(),
            isLive: false,
          });
          setGeoError(
            error.code === 1
              ? 'GPS Permission withheld in browser sandbox. Switched to simulated orbital telemetry feed.'
              : 'GPS Triangulation timed out. Switched to simulated orbital telemetry feed.'
          );
          setLoadingGeo(false);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    } else {
      setGeoError('HTML5 Geolocation API is not supported in this browser environment.');
      setLoadingGeo(false);
    }
  };

  const isGeoProject = project.id === 'project-03' || project.name.toLowerCase().includes('geolocation');

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#080B0A] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#030303]">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#39FF14]" />
            <span className="text-xs font-mono-tech text-zinc-400">MISSION LOG // {project.id.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Hero Image Showcase */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-800 aspect-video group">
            <img
              src={project.imageUrl}
              alt={project.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-xs font-mono-tech px-2.5 py-1 rounded bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/40 font-semibold">
                  STATUS: {project.status.toUpperCase()}
                </span>
                <h2 className="text-2xl font-bold text-white mt-1.5">{project.name}</h2>
              </div>
            </div>
          </div>

          {/* Subtitle & Role */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech pb-4 border-b border-zinc-800/80">
            <div>
              <span className="text-zinc-500">ROLE: </span>
              <span className="text-zinc-300 font-semibold">{project.role}</span>
            </div>
            <div>
              <span className="text-zinc-500">TIMELINE: </span>
              <span className="text-zinc-300 font-semibold">{project.timeline}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-zinc-400">Mission Overview</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Core Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#39FF14]" />
              Architectural Highlights
            </h3>
            <ul className="space-y-2">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#39FF14] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dedicated Interactive Tool: Live Geolocation Radar API Test */}
          {isGeoProject && (
            <div className="p-5 rounded-xl bg-black/60 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-[#00F5FF]">
                  <Navigation className="w-4 h-4 animate-pulse" />
                  <span className="font-semibold uppercase">INTERACTIVE GPS RADAR DEMO</span>
                </div>
                <button
                  onClick={handleTestGeolocation}
                  disabled={loadingGeo}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#00F5FF] text-black font-semibold text-xs font-mono-tech hover:bg-[#38BDF8] shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {loadingGeo ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>TRIANGULATING...</span>
                    </>
                  ) : (
                    <>
                      <Radio className="w-3.5 h-3.5" />
                      <span>TEST LIVE GPS API</span>
                    </>
                  )}
                </button>
              </div>

              {geoError && (
                <p className="text-[11px] font-mono-tech text-amber-400 bg-amber-500/10 p-2.5 rounded border border-amber-500/30">
                  {geoError}
                </p>
              )}

              {geoData && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-tech pt-2">
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">LATITUDE</span>
                    <span className="text-[#39FF14] font-bold">{geoData.lat.toFixed(6)}&deg; N</span>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">LONGITUDE</span>
                    <span className="text-[#39FF14] font-bold">{geoData.lng.toFixed(6)}&deg; E</span>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">ACCURACY</span>
                    <span className="text-[#00F5FF] font-bold">&plusmn;{geoData.accuracy.toFixed(1)} m</span>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-500 block text-[10px]">TIMESTAMP</span>
                    <span className="text-zinc-300 font-bold">{geoData.timestamp}</span>
                  </div>
                </div>
              )}

              {!geoData && !loadingGeo && (
                <p className="text-xs text-zinc-400 font-mono-tech">
                  Click &ldquo;TEST LIVE GPS API&rdquo; to test real-time browser spatial triangulation and view coordinate telemetry.
                </p>
              )}
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono-tech uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#39FF14]" />
              Technologies & Tools Employed
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md text-xs font-mono-tech bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Actions */}
          <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#39FF14] text-black font-semibold text-xs font-mono-tech hover:bg-[#32e012] hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LAUNCH LIVE INTERFACE</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 text-white hover:text-[#39FF14] border border-zinc-700 hover:border-[#39FF14]/50 text-xs font-mono-tech transition-all"
              >
                <Github className="w-4 h-4" />
                <span>VIEW REPOSITORY</span>
              </a>
            )}

            {!project.liveUrl && !project.githubUrl && (
              <div className="text-xs font-mono-tech text-zinc-400 italic">
                Active in research & concept pipeline &middot; In-engine prototype in progress.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
