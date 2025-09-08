'use client';

import { cn } from '@/lib/utils';
import { InfoCardProps } from '@/lib/types';

export function InfoCard({
  title,
  content,
  actionable = false,
  onClick,
  className = '',
}: InfoCardProps) {
  const baseClasses = actionable ? 'info-card-actionable' : 'info-card';

  return (
    <div
      className={cn(baseClasses, className)}
      onClick={actionable ? onClick : undefined}
      role={actionable ? 'button' : undefined}
      tabIndex={actionable ? 0 : undefined}
    >
      <h3 className="text-heading text-text-primary mb-2">{title}</h3>
      <p className="text-body text-text-secondary leading-relaxed">{content}</p>
    </div>
  );
}
