import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/helpers';
import { TextInputProps } from '@/types';

const textInputVariants = cva(
  'w-full px-3 py-2 bg-surface border border-gray-200 rounded-md shadow-sm placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors',
  {
    variants: {
      variant: {
        default: '',
        multiline: 'min-h-[80px] resize-y',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface TextInputComponentProps
  extends VariantProps<typeof textInputVariants> {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
}

export function TextInput({
  variant,
  placeholder,
  value,
  onChange,
  maxLength,
  className,
  disabled,
}: TextInputComponentProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  const commonProps = {
    placeholder,
    value,
    onChange: handleChange,
    maxLength,
    disabled,
    className: cn(textInputVariants({ variant, className })),
  };

  if (variant === 'multiline') {
    return (
      <div className="relative">
        <textarea
          {...commonProps}
          rows={3}
        />
        {maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-text-secondary">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type="text"
        {...commonProps}
      />
      {maxLength && (
        <div className="absolute -bottom-5 right-0 text-xs text-text-secondary">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}

// Export the props interface for external use
export type { TextInputProps };
