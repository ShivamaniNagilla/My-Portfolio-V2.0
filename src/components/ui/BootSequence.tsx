import React, { useEffect, useState } from 'react';
import { Terminal, FastForward, CheckCircle2 } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const logs = [
    'BOOTING SPACECRAFT TELEMETRY SUBSYSTEM...',
    'CALIBRATING GRAVITATIONAL LENSING SENSORS...',
    'ALIGNING ACCRETION DISK POLARIZATION VECTORS...',
    'CONNECTING QUANTUM DATALINK: NAGILLA SHIVAMANI...',
    'SYSTEM NOMINAL. ACCESS GRANTED TO DIGITAL UNIVERSE.',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 350);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const capped = Math.min(100, next);
        setStepIndex(Math.min(logs.length - 1, Math.floor((capped / 100) * logs.length)));
        return capped;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete, logs.length]);

  return (
    <div className="fixed inset-0 z-[10000] bg-[#030303] flex flex-col items-center justify-center p-6 select-none">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative w-full max-w-xl glass-panel p-6 sm:p-8 rounded-xl border border-zinc-800 shadow-2xl space-y-6">
        {/* Header telemetry badge */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-zinc-400">
            <Terminal className="w-4 h-4 text-[#39FF14]" />
            <span className="text-[#39FF14] font-semibold">INTERSTELLAR OS</span>
            <span>v2026.1</span>
          </div>
          <button
            onClick={onComplete}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono-tech text-zinc-400 hover:text-[#39FF14] hover:bg-[#39FF14]/10 rounded border border-zinc-800 hover:border-[#39FF14]/40 transition-colors"
          >
            <span>SKIP BOOT</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Pilot Info */}
        <div className="space-y-1">
          <p className="text-xs font-mono-tech text-zinc-500 uppercase tracking-wider">Target Node</p>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            NAGILLA SHIVAMANI
            <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30 font-normal">
              PILOT / CSE AI & ML
            </span>
          </h2>
          <p className="text-xs text-zinc-400 font-mono-tech">NIAT X JOY UNIVERSITY // FIRST YEAR</p>
        </div>

        {/* Terminal Log Output */}
        <div className="bg-black/80 rounded-lg p-3 sm:p-4 border border-zinc-900 font-mono-tech text-xs space-y-2 h-28 overflow-hidden flex flex-col justify-end">
          {logs.slice(0, stepIndex + 1).map((log, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 transition-opacity duration-200 ${
                idx === stepIndex ? 'text-[#39FF14]' : 'text-zinc-500'
              }`}
            >
              <span className="text-zinc-600">[{Math.min(99, idx * 24 + 12)}ms]</span>
              <span>{log}</span>
              {idx === stepIndex && <span className="inline-block w-1.5 h-3 bg-[#39FF14] animate-pulse" />}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono-tech">
            <span className="text-zinc-400">CALIBRATION SEQUENCE</span>
            <span className="text-[#39FF14] font-semibold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-[#39FF14] transition-all duration-100 ease-out shadow-[0_0_12px_#39FF14]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Status */}
        <div className="flex items-center justify-between text-[11px] font-mono-tech text-zinc-500 pt-2 border-t border-zinc-900">
          <span>EVENT HORIZON: STABLE</span>
          <span className="flex items-center gap-1 text-[#39FF14]">
            <CheckCircle2 className="w-3.5 h-3.5" /> ENCRYPTED VORTEX
          </span>
        </div>
      </div>
    </div>
  );
};
