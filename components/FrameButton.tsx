'use client';

import { cn } from '@/lib/utils';
import { FrameButtonProps } from '@/lib/types';

export function FrameButton({
  variant = 'primary',
  onClick,
  children,
  disabled = false,
  className = '',
}: FrameButtonProps) {
  const baseClasses = 'frame-button';
  const variantClasses = {
    primary: 'frame-button-primary',
    secondary: 'frame-button-secondary',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}
