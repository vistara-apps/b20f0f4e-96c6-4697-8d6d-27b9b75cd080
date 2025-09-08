'use client';

import { LegalAdviceResponse } from '@/lib/types';
import { InfoCard } from './InfoCard';
import { FrameButton } from './FrameButton';
import { CheckCircle, ExternalLink, FileText } from 'lucide-react';

interface LegalAdviceDisplayProps {
  advice: LegalAdviceResponse;
  onRequestTemplate?: () => void;
  onNewQuery?: () => void;
}

export function LegalAdviceDisplay({ 
  advice, 
  onRequestTemplate, 
  onNewQuery 
}: LegalAdviceDisplayProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary */}
      <InfoCard
        title="Legal Summary"
        content={advice.summary}
        className="border-l-4 border-l-primary"
      />

      {/* Action Steps */}
      {advice.actionSteps.length > 0 && (
        <div className="info-card">
          <h3 className="text-heading text-text-primary mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            Recommended Actions
          </h3>
          <ol className="space-y-3">
            {advice.actionSteps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-body text-text-secondary">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Relevant Laws */}
      {advice.relevantLaws.length > 0 && (
        <div className="info-card">
          <h3 className="text-heading text-text-primary mb-3">
            Relevant Laws & Regulations
          </h3>
          <ul className="space-y-2">
            {advice.relevantLaws.map((law, index) => (
              <li key={index} className="flex items-start gap-2">
                <ExternalLink className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-body text-text-secondary">{law}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Templates */}
      {advice.templates && advice.templates.length > 0 && (
        <div className="info-card">
          <h3 className="text-heading text-text-primary mb-3">
            Available Templates
          </h3>
          <div className="space-y-2">
            {advice.templates.map((template, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{template.title}</span>
                </div>
                <FrameButton
                  variant="secondary"
                  onClick={onRequestTemplate}
                  className="text-xs px-3 py-1"
                >
                  Generate ($0.05)
                </FrameButton>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {advice.sources.length > 0 && (
        <div className="info-card bg-gray-50">
          <h3 className="text-heading text-text-primary mb-2">Sources</h3>
          <ul className="text-caption space-y-1">
            {advice.sources.map((source, index) => (
              <li key={index}>• {source}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div className="info-card bg-yellow-50 border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal advice. 
          Consult with a qualified attorney for specific legal guidance.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <FrameButton onClick={onNewQuery} variant="secondary" className="flex-1">
          Ask Another Question
        </FrameButton>
        {onRequestTemplate && (
          <FrameButton onClick={onRequestTemplate} className="flex-1">
            Get Template
          </FrameButton>
        )}
      </div>
    </div>
  );
}
