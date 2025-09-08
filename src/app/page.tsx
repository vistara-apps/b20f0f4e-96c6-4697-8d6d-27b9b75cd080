import React from 'react';
import { InfoCard, FrameButton } from '@/components/ui';
import { Scale, Shield, FileText, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Scale className="w-12 h-12 text-primary mr-3" />
          <h1 className="text-4xl font-bold text-text-primary">
            LegalEase Frame
          </h1>
        </div>
        <p className="text-xl text-text-secondary mb-6">
          Understand your rights, act with confidence
        </p>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Empowers Farcaster users with plain-language legal information and actionable guidance for everyday situations.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <InfoCard
          variant="actionable"
          title="Plain-Language Legal Summaries"
          content="Get clear, easy-to-understand explanations of common legal rights and procedures without the jargon."
          actions={
            <div className="flex items-center text-primary">
              <FileText className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Learn More</span>
            </div>
          }
        />
        
        <InfoCard
          variant="actionable"
          title="Jurisdiction-Specific Guidance"
          content="Receive legal information tailored to your geographic location for accuracy and relevance."
          actions={
            <div className="flex items-center text-primary">
              <Shield className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Select Location</span>
            </div>
          }
        />
        
        <InfoCard
          variant="actionable"
          title="Actionable Next Steps"
          content="Get step-by-step guidance on what actions you should take to resolve your legal issue."
          actions={
            <div className="flex items-center text-primary">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Get Started</span>
            </div>
          }
        />
        
        <InfoCard
          variant="actionable"
          title="Templated Legal Communications"
          content="Access pre-written letters, forms, and messages for common legal scenarios."
          actions={
            <div className="flex items-center text-primary">
              <FileText className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Browse Templates</span>
            </div>
          }
        />
      </div>

      {/* CTA Section */}
      <div className="text-center bg-surface rounded-lg p-8 shadow-card">
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Ready to Get Legal Guidance?
        </h2>
        <p className="text-text-secondary mb-6">
          Use this Frame in Farcaster to get instant legal information and guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <FrameButton variant="primary" size="lg">
            Try in Farcaster
          </FrameButton>
          <FrameButton variant="secondary" size="lg">
            Learn More
          </FrameButton>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Important Legal Disclaimer
        </h3>
        <p className="text-yellow-700 text-sm">
          This service provides general legal information, not legal advice. The information provided may not reflect the most current laws and is for educational purposes only. For specific legal matters, please consult with a qualified attorney in your jurisdiction.
        </p>
      </div>
    </div>
  );
}
