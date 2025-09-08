import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/helpers';
import { InfoCardProps } from '@/types';

const infoCardVariants = cva(
  'rounded-lg border bg-surface p-md shadow-card transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-gray-200',
        actionable: 'border-gray-200 hover:border-primary hover:shadow-lg cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface InfoCardComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoCardVariants> {
  title: string;
  content: string;
  actions?: React.ReactNode;
}

export function InfoCard({
  className,
  variant,
  title,
  content,
  actions,
  ...props
}: InfoCardComponentProps) {
  return (
    <div
      className={cn(infoCardVariants({ variant, className }))}
      {...props}
    >
      <div className="space-y-sm">
        <h3 className="text-lg font-semibold text-text-primary">
          {title}
        </h3>
        <p className="text-base leading-normal text-text-secondary">
          {content}
        </p>
        {actions && (
          <div className="pt-sm border-t border-gray-100">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

// Export the props interface for external use
export type { InfoCardProps };
