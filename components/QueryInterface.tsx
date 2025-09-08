'use client';

import { useState } from 'react';
import { TextInput } from './TextInput';
import { JurisdictionSelector } from './JurisdictionSelector';
import { FrameButton } from './FrameButton';
import { validateQuery } from '@/lib/utils';
import { Search, AlertCircle } from 'lucide-react';

interface QueryInterfaceProps {
  onSubmit: (query: string, jurisdiction: string) => void;
  isLoading?: boolean;
}

export function QueryInterface({ onSubmit, isLoading = false }: QueryInterfaceProps) {
  const [query, setQuery] = useState('');
  const [jurisdiction, setJurisdiction] = useState('US');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    
    if (!validateQuery(query)) {
      setError('Please enter a legal question (10-500 characters)');
      return;
    }

    if (!jurisdiction) {
      setError('Please select your jurisdiction');
      return;
    }

    onSubmit(query, jurisdiction);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Describe your legal situation
          </label>
          <TextInput
            value={query}
            onChange={setQuery}
            placeholder="e.g., My landlord is trying to evict me without proper notice..."
            variant="multiline"
          />
          <p className="text-caption mt-1">
            {query.length}/500 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Your jurisdiction
          </label>
          <JurisdictionSelector
            value={jurisdiction}
            onChange={setJurisdiction}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <FrameButton
        onClick={handleSubmit}
        disabled={isLoading || !query.trim()}
        className="w-full flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Search className="w-4 h-4" />
            Get Legal Advice ($0.01)
          </>
        )}
      </FrameButton>
    </div>
  );
}
