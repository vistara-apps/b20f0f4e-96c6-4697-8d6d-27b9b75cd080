'use client';

import { cn } from '@/lib/utils';
import { TextInputProps } from '@/lib/types';

export function TextInput({
  value,
  onChange,
  placeholder = '',
  variant = 'default',
  className = '',
}: TextInputProps) {
  const baseClasses = variant === 'multiline' ? 'text-input-multiline' : 'text-input';

  if (variant === 'multiline') {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(baseClasses, className)}
        rows={4}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(baseClasses, className)}
    />
  );
}
