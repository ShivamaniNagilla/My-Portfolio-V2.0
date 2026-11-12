import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'project' | 'text'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const checkFinePointer = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      setIsTouchDevice(!hasFinePointer);
    };

    checkFinePointer();
    window.addEventListener('resize', checkFinePointer);

    let mouseX = -100;
    let mouseY = -100;
    let trailerX = -100;
    let trailerY = -100;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPos({ x: mouseX, y: mouseY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, textarea, select, [role="button"]');
      const projectCard = target.closest('[data-cursor="project"]');
      const textElement = target.closest('p, h1, h2, h3, h4, span, label');

      if (projectCard) {
        setCursorState('project');
      } else if (interactive) {
        setCursorState('hover');
      } else if (textElement && !interactive) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const animateTrailer = () => {
      trailerX += (mouseX - trailerX) * 0.18;
      trailerY += (mouseY - trailerY) * 0.18;
      setTrailerPos({ x: trailerX, y: trailerY });
      rafId = requestAnimationFrame(animateTrailer);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animateTrailer);

    return () => {
      window.removeEventListener('resize', checkFinePointer);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central pinpoint cursor */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      >
        <div
          className={`rounded-full bg-[#39FF14] transition-all duration-150 ${
            cursorState === 'hover'
              ? 'w-2 h-2 shadow-[0_0_12px_#39FF14]'
              : cursorState === 'project'
              ? 'w-3 h-3 bg-white shadow-[0_0_15px_#fff]'
              : 'w-2 h-2 shadow-[0_0_8px_#39FF14]'
          }`}
        />
      </div>

      {/* Trailing ring with dynamic expanding effect */}
      <div
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center transition-all duration-200 ease-out"
        style={{
          left: `${trailerPos.x}px`,
          top: `${trailerPos.y}px`,
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 flex items-center justify-center ${
            cursorState === 'hover'
              ? 'w-14 h-14 border-[#39FF14] bg-[#39FF14]/10 shadow-[0_0_20px_rgba(57,255,20,0.35)] scale-110'
              : cursorState === 'project'
              ? 'w-20 h-20 border-[#39FF14] bg-black/60 backdrop-blur-xs shadow-[0_0_30px_rgba(57,255,20,0.5)]'
              : cursorState === 'text'
              ? 'w-8 h-8 border-[#39FF14]/40 bg-transparent'
              : 'w-9 h-9 border-[#39FF14]/60 bg-[#39FF14]/5'
          }`}
        >
          {cursorState === 'project' && (
            <span className="text-[10px] tracking-widest font-mono-tech uppercase font-bold text-[#39FF14] animate-pulse">
              VIEW
            </span>
          )}
        </div>
      </div>
    </>
  );
};
