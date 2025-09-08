'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { JurisdictionSelectorProps } from '@/lib/types';
import { JURISDICTIONS } from '@/lib/constants';
import { ChevronDown } from 'lucide-react';

export function JurisdictionSelector({
  value,
  onChange,
  variant = 'dropdown',
}: JurisdictionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === 'buttonGroup') {
    return (
      <div className="flex flex-wrap gap-2">
        {JURISDICTIONS.map((jurisdiction) => (
          <button
            key={jurisdiction.code}
            onClick={() => onChange(jurisdiction.code)}
            className={cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
              value === jurisdiction.code
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-text-primary hover:bg-gray-200'
            )}
          >
            {jurisdiction.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-surface border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 flex items-center justify-between"
      >
        <span>
          {JURISDICTIONS.find(j => j.code === value)?.name || 'Select Jurisdiction'}
        </span>
        <ChevronDown className={cn(
          'w-4 h-4 transition-transform duration-200',
          isOpen && 'transform rotate-180'
        )} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-surface border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {JURISDICTIONS.map((jurisdiction) => (
            <button
              key={jurisdiction.code}
              onClick={() => {
                onChange(jurisdiction.code);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
            >
              {jurisdiction.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
