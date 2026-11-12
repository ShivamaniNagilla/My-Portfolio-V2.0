import React, { useRef, useState } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.28,
  className = '',
  variant = 'primary',
  onClick,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#39FF14] text-black font-semibold hover:shadow-[0_0_25px_rgba(57,255,20,0.6)] border border-[#39FF14] hover:bg-[#32e012]';
      case 'secondary':
        return 'bg-white text-black font-semibold hover:bg-zinc-200 border border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]';
      case 'outline':
        return 'bg-transparent text-white border border-zinc-700 hover:border-[#39FF14] hover:text-[#39FF14] hover:shadow-[0_0_15px_rgba(57,255,20,0.25)]';
      case 'ghost':
        return 'bg-transparent text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent';
      default:
        return '';
    }
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 && offset.y === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
      }}
      className={`relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-colors duration-200 cursor-pointer select-none whitespace-nowrap active:scale-95 ${getVariantStyles()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
