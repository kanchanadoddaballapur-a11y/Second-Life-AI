import React from 'react';
import logoImg from '../assets/secondlife_logo.jpg';

interface LogoProps {
  className?: string;
  size?: number | string;
  withGlow?: boolean;
}

/**
 * Official SECOND LIFE AI Logo
 * Renders the circular green e-waste recycling emblem with electronics
 */
export const SecondLifeLogo: React.FC<LogoProps> = ({
  className = 'w-10 h-10',
  size,
  withGlow = false
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`} 
      style={size ? { width: size, height: size } : undefined}
    >
      {withGlow && (
        <div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl scale-110 pointer-events-none -z-10" />
      )}
      <img
        src={logoImg}
        alt="SECOND LIFE AI Logo"
        className="w-full h-full object-contain rounded-2xl select-none"
        loading="eager"
      />
    </div>
  );
};

