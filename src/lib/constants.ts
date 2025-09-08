import { JurisdictionInfo, Jurisdiction } from '@/types';

// Design system tokens
export const COLORS = {
  primary: 'hsl(220, 80%, 50%)',
  accent: 'hsl(140, 50%, 60%)',
  bg: 'hsl(220, 15%, 95%)',
  surface: 'hsl(0, 0%, 100%)',
  textPrimary: 'hsl(220, 15%, 20%)',
  textSecondary: 'hsl(220, 15%, 40%)',
} as const;

export const TYPOGRAPHY = {
  display: 'text-xl font-bold',
  heading: 'text-lg font-semibold',
  body: 'text-base leading-normal',
  caption: 'text-sm text-gray-600',
} as const;

export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
} as const;

export const SHADOWS = {
  card: '0 2px 6px hsla(0, 0%, 0%, 0.1)',
} as const;

export const MOTION = {
  duration: {
    fast: 100,
    base: 200,
  },
  easing: 'ease-in-out',
} as const;

// Jurisdiction data
export const JURISDICTIONS: Record<Jurisdiction, JurisdictionInfo> = {
  'US-CA': {
    code: 'US-CA',
    name: 'California, USA',
    flag: '🇺🇸',
    description: 'California state law and regulations'
  },
  'US-NY': {
    code: 'US-NY',
    name: 'New York, USA',
    flag: '🇺🇸',
    description: 'New York state law and regulations'
  },
  'US-TX': {
    code: 'US-TX',
    name: 'Texas, USA',
    flag: '🇺🇸',
    description: 'Texas state law and regulations'
  },
  'US-FL': {
    code: 'US-FL',
    name: 'Florida, USA',
    flag: '🇺🇸',
    description: 'Florida state law and regulations'
  },
  'US-FEDERAL': {
    code: 'US-FEDERAL',
    name: 'Federal USA',
    flag: '🇺🇸',
    description: 'Federal US law and regulations'
  },
  'UK': {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    description: 'UK law and regulations'
  },
  'CA': {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    description: 'Canadian law and regulations'
  },
  'AU': {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    description: 'Australian law and regulations'
  },
  'GENERAL': {
    code: 'GENERAL',
    name: 'General/International',
    flag: '🌍',
    description: 'General legal principles and international law'
  },
};

// Legal categories and common issues
export const LEGAL_CATEGORIES = [
  'Employment Law',
  'Tenant Rights',
  'Consumer Protection',
  'Contract Disputes',
  'Small Claims',
  'Family Law',
  'Immigration',
  'Criminal Law',
  'Intellectual Property',
  'Business Law',
] as const;

// Template types
export const TEMPLATE_TYPES = [
  'Demand Letter',
  'Cease and Desist',
  'Notice to Quit',
  'Complaint Letter',
  'Settlement Agreement',
  'Non-Disclosure Agreement',
  'Employment Contract',
  'Service Agreement',
] as const;

// Pricing configuration
export const PRICING = {
  basicQuery: 0.01, // $0.01 in ETH equivalent
  templateGeneration: 0.05, // $0.05 in ETH equivalent
  premiumAdvice: 0.10, // $0.10 in ETH equivalent
  documentDrafting: 0.25, // $0.25 in ETH equivalent
} as const;

// Frame configuration
export const FRAME_CONFIG = {
  width: 600,
  height: 400,
  aspectRatio: '1.91:1' as const,
  maxButtons: 4,
  maxInputLength: 256,
};

// API endpoints
export const API_ENDPOINTS = {
  frame: '/api/frame',
  advice: '/api/advice',
  templates: '/api/templates',
  payment: '/api/payment',
  user: '/api/user',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  INVALID_INPUT: 'Please provide a valid legal question or situation.',
  JURISDICTION_REQUIRED: 'Please select your jurisdiction to get accurate legal information.',
  API_ERROR: 'Sorry, we encountered an error processing your request. Please try again.',
  PAYMENT_REQUIRED: 'This feature requires payment. Please complete the transaction to continue.',
  RATE_LIMIT: 'Too many requests. Please wait a moment before trying again.',
  INVALID_JURISDICTION: 'The selected jurisdiction is not supported.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  ADVICE_GENERATED: 'Legal advice generated successfully!',
  TEMPLATE_CREATED: 'Template created successfully!',
  PAYMENT_COMPLETED: 'Payment completed successfully!',
} as const;
