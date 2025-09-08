'use client';

import { LEGAL_TOPICS } from '@/lib/constants';
import { InfoCard } from './InfoCard';
import { LegalTopic } from '@/lib/types';

interface LegalTopicGridProps {
  onTopicSelect: (topic: LegalTopic) => void;
}

export function LegalTopicGrid({ onTopicSelect }: LegalTopicGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {LEGAL_TOPICS.map((topic) => (
        <InfoCard
          key={topic.id}
          title={topic.title}
          content={topic.description}
          actionable
          onClick={() => onTopicSelect(topic)}
          className="hover:border-primary transition-colors duration-200"
        />
      ))}
    </div>
  );
}
