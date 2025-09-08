import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { cn, getJurisdictionName, getJurisdictionFlag } from '@/utils/helpers';
import { JurisdictionSelectorProps, Jurisdiction } from '@/types';
import { JURISDICTIONS } from '@/lib/constants';

const jurisdictionSelectorVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        dropdown: '',
        buttonGroup: 'grid grid-cols-2 gap-2',
      },
    },
    defaultVariants: {
      variant: 'dropdown',
    },
  }
);

const dropdownVariants = cva(
  'flex items-center justify-between w-full px-3 py-2 text-left bg-surface border border-gray-200 rounded-md shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors'
);

const buttonGroupItemVariants = cva(
  'flex items-center justify-center px-3 py-2 text-sm font-medium border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
  {
    variants: {
      selected: {
        true: 'bg-primary text-white border-primary',
        false: 'bg-surface text-text-primary border-gray-200 hover:border-primary hover:bg-gray-50',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

interface JurisdictionSelectorComponentProps
  extends VariantProps<typeof jurisdictionSelectorVariants> {
  value: Jurisdiction;
  onChange: (jurisdiction: Jurisdiction) => void;
  className?: string;
}

export function JurisdictionSelector({
  variant,
  value,
  onChange,
  className,
}: JurisdictionSelectorComponentProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const jurisdictions = Object.values(JURISDICTIONS);

  if (variant === 'buttonGroup') {
    return (
      <div className={cn(jurisdictionSelectorVariants({ variant, className }))}>
        {jurisdictions.slice(0, 6).map((jurisdiction) => (
          <button
            key={jurisdiction.code}
            onClick={() => onChange(jurisdiction.code)}
            className={cn(
              buttonGroupItemVariants({
                selected: value === jurisdiction.code,
              })
            )}
          >
            <span className="mr-2">{jurisdiction.flag}</span>
            <span className="truncate">{jurisdiction.name.split(',')[0]}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(jurisdictionSelectorVariants({ variant, className }))}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(dropdownVariants())}
        >
          <div className="flex items-center">
            <span className="mr-2">{getJurisdictionFlag(value)}</span>
            <span>{getJurisdictionName(value)}</span>
          </div>
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              isOpen && 'transform rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-surface border border-gray-200 rounded-md shadow-lg">
            <div className="py-1 max-h-60 overflow-auto">
              {jurisdictions.map((jurisdiction) => (
                <button
                  key={jurisdiction.code}
                  onClick={() => {
                    onChange(jurisdiction.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors',
                    value === jurisdiction.code && 'bg-primary/10 text-primary'
                  )}
                >
                  <span className="mr-2">{jurisdiction.flag}</span>
                  <div>
                    <div className="font-medium">{jurisdiction.name}</div>
                    <div className="text-sm text-text-secondary">
                      {jurisdiction.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Export the props interface for external use
export type { JurisdictionSelectorProps };
