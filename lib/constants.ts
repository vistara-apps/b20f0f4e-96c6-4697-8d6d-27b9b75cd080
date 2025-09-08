import { LegalTopic, LegalCategory } from './types';

export const JURISDICTIONS = [
  { code: 'US', name: 'United States', states: [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ]},
  { code: 'CA', name: 'Canada', states: [
    'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'
  ]},
  { code: 'UK', name: 'United Kingdom', states: ['England', 'Scotland', 'Wales', 'Northern Ireland'] },
  { code: 'AU', name: 'Australia', states: ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'] },
];

export const LEGAL_TOPICS: LegalTopic[] = [
  {
    id: 'tenant-rights',
    category: 'tenant-rights',
    title: 'Tenant Rights',
    description: 'Understanding your rights as a renter, dealing with landlords, and housing issues.',
    commonQuestions: [
      'Can my landlord enter without notice?',
      'What are my rights regarding security deposits?',
      'How do I handle repairs and maintenance issues?',
      'What constitutes illegal eviction?'
    ]
  },
  {
    id: 'consumer-laws',
    category: 'consumer-laws',
    title: 'Consumer Laws',
    description: 'Protection from fraud, understanding warranties, and dealing with unfair business practices.',
    commonQuestions: [
      'How do I return a defective product?',
      'What are my rights with online purchases?',
      'How do I dispute credit card charges?',
      'What constitutes false advertising?'
    ]
  },
  {
    id: 'workplace-rights',
    category: 'workplace-rights',
    title: 'Workplace Rights',
    description: 'Employment law, discrimination, wages, and workplace safety.',
    commonQuestions: [
      'What constitutes workplace harassment?',
      'Am I entitled to overtime pay?',
      'Can I be fired without cause?',
      'What are my rights regarding breaks and time off?'
    ]
  },
  {
    id: 'family-law',
    category: 'family-law',
    title: 'Family Law',
    description: 'Divorce, child custody, domestic relations, and family disputes.',
    commonQuestions: [
      'How is child custody determined?',
      'What are my rights in a divorce?',
      'How is property divided in divorce?',
      'What constitutes domestic violence?'
    ]
  },
  {
    id: 'contract-law',
    category: 'contract-law',
    title: 'Contract Law',
    description: 'Understanding contracts, agreements, and legal obligations.',
    commonQuestions: [
      'Is a verbal agreement legally binding?',
      'How do I get out of a contract?',
      'What makes a contract invalid?',
      'What happens if someone breaches a contract?'
    ]
  }
];

export const PRICING = {
  BASIC_QUERY: 0.01, // $0.01 in ETH equivalent
  TEMPLATE_GENERATION: 0.05, // $0.05 in ETH equivalent
  DETAILED_ANALYSIS: 0.10, // $0.10 in ETH equivalent
  DOCUMENT_REVIEW: 0.25, // $0.25 in ETH equivalent
};

export const RESPONSE_TYPES = {
  SUMMARY: 'summary',
  TEMPLATE: 'template',
  GUIDANCE: 'guidance',
  ANALYSIS: 'analysis'
} as const;

export const ERROR_MESSAGES = {
  INVALID_QUERY: 'Please provide a valid legal question.',
  JURISDICTION_REQUIRED: 'Please select your jurisdiction for accurate advice.',
  PAYMENT_FAILED: 'Payment processing failed. Please try again.',
  API_ERROR: 'Service temporarily unavailable. Please try again later.',
  RATE_LIMIT: 'Too many requests. Please wait before trying again.',
} as const;

export const SUCCESS_MESSAGES = {
  QUERY_PROCESSED: 'Your legal advice has been generated successfully.',
  TEMPLATE_CREATED: 'Your legal template has been created.',
  PAYMENT_PROCESSED: 'Payment processed successfully.',
} as const;
