'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { QueryInterface } from '@/components/QueryInterface';
import { LegalAdviceDisplay } from '@/components/LegalAdviceDisplay';
import { LegalTopicGrid } from '@/components/LegalTopicGrid';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { FrameButton } from '@/components/FrameButton';
import { generateLegalAdvice } from '@/lib/openai';
import { LegalAdviceResponse, LegalTopic } from '@/lib/types';
import { Scale, BookOpen, MessageSquare, Users } from 'lucide-react';

type AppState = 'home' | 'query' | 'topics' | 'advice' | 'loading';

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>('home');
  const [currentAdvice, setCurrentAdvice] = useState<LegalAdviceResponse | null>(null);
  const [error, setError] = useState<string>('');
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleQuerySubmit = async (query: string, jurisdiction: string) => {
    setAppState('loading');
    setError('');

    try {
      const advice = await generateLegalAdvice(query, jurisdiction);
      setCurrentAdvice(advice);
      setAppState('advice');
    } catch (err) {
      setError('Failed to generate legal advice. Please try again.');
      setAppState('query');
    }
  };

  const handleTopicSelect = (topic: LegalTopic) => {
    // Pre-fill query with a common question from the selected topic
    setAppState('query');
  };

  const renderContent = () => {
    switch (appState) {
      case 'loading':
        return (
          <div className="text-center py-12">
            <LoadingSpinner />
            <p className="text-text-secondary mt-4">Analyzing your legal question...</p>
          </div>
        );

      case 'query':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-display text-text-primary mb-2">Ask Your Legal Question</h2>
              <p className="text-body text-text-secondary">
                Get plain-language legal information tailored to your jurisdiction
              </p>
            </div>
            <QueryInterface onSubmit={handleQuerySubmit} />
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>
        );

      case 'topics':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-display text-text-primary mb-2">Legal Topics</h2>
              <p className="text-body text-text-secondary">
                Browse common legal areas to get started
              </p>
            </div>
            <LegalTopicGrid onTopicSelect={handleTopicSelect} />
          </div>
        );

      case 'advice':
        return currentAdvice ? (
          <LegalAdviceDisplay
            advice={currentAdvice}
            onNewQuery={() => setAppState('query')}
            onRequestTemplate={() => {
              // Handle template request
              console.log('Template requested');
            }}
          />
        ) : null;

      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-primary bg-opacity-10 rounded-full">
                  <Scale className="w-12 h-12 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-text-primary">LegalEase Frame</h1>
              <p className="text-lg text-text-secondary max-w-md mx-auto">
                Understand your rights, act with confidence
              </p>
              <p className="text-body text-text-secondary">
                Get plain-language legal information and actionable guidance for everyday situations
              </p>
            </div>

            {/* Wallet Connection */}
            <div className="flex justify-center">
              <Wallet>
                <ConnectWallet>
                  <Avatar className="h-6 w-6" />
                  <Name />
                </ConnectWallet>
              </Wallet>
            </div>

            {/* Main Actions */}
            <div className="grid grid-cols-1 gap-4">
              <FrameButton
                onClick={() => setAppState('query')}
                className="w-full flex items-center justify-center gap-3 py-4"
              >
                <MessageSquare className="w-5 h-5" />
                Ask Legal Question
              </FrameButton>
              
              <FrameButton
                variant="secondary"
                onClick={() => setAppState('topics')}
                className="w-full flex items-center justify-center gap-3 py-4"
              >
                <BookOpen className="w-5 h-5" />
                Browse Legal Topics
              </FrameButton>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="info-card text-center">
                <div className="flex justify-center mb-3">
                  <Scale className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-heading mb-2">Plain Language</h3>
                <p className="text-body text-text-secondary">
                  Complex legal concepts explained in simple terms
                </p>
              </div>
              
              <div className="info-card text-center">
                <div className="flex justify-center mb-3">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-heading mb-2">Jurisdiction Specific</h3>
                <p className="text-body text-text-secondary">
                  Tailored advice based on your location
                </p>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="info-card bg-gray-50 text-center">
              <h3 className="text-heading mb-2">Transparent Pricing</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Basic Legal Advice</span>
                  <span className="font-medium">$0.01</span>
                </div>
                <div className="flex justify-between">
                  <span>Document Templates</span>
                  <span className="font-medium">$0.05</span>
                </div>
                <div className="flex justify-between">
                  <span>Detailed Analysis</span>
                  <span className="font-medium">$0.10</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Navigation */}
        {appState !== 'home' && (
          <div className="mb-6">
            <FrameButton
              variant="secondary"
              onClick={() => setAppState('home')}
              className="text-sm px-4 py-2"
            >
              ← Back to Home
            </FrameButton>
          </div>
        )}

        {/* Main Content */}
        {renderContent()}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-caption text-text-secondary">
            Built on Base • Powered by OnchainKit
          </p>
        </div>
      </div>
    </div>
  );
}
