import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/helpers';
import { FrameButtonProps } from '@/types';

const frameButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary/90 shadow-card',
        secondary: 'bg-surface text-text-primary border border-gray-200 hover:bg-gray-50 shadow-card',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-sm',
        lg: 'h-11 px-8 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

interface FrameButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof frameButtonVariants> {
  children: React.ReactNode;
}

export function FrameButton({
  className,
  variant,
  size,
  children,
  ...props
}: FrameButtonComponentProps) {
  return (
    <button
      className={cn(frameButtonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

// Export the props interface for external use
export type { FrameButtonProps };
