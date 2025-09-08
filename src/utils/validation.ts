import { z } from 'zod';
import { Jurisdiction } from '@/types';
import { JURISDICTIONS } from '@/lib/constants';

// Jurisdiction validation schema
export const JurisdictionSchema = z.enum([
  'US-CA',
  'US-NY', 
  'US-TX',
  'US-FL',
  'US-FEDERAL',
  'UK',
  'CA',
  'AU',
  'GENERAL'
] as const);

// Legal query validation schema
export const LegalQuerySchema = z.object({
  query: z.string()
    .min(10, 'Query must be at least 10 characters long')
    .max(500, 'Query must be less than 500 characters')
    .refine(
      (val) => val.trim().length > 0,
      'Query cannot be empty'
    ),
  jurisdiction: JurisdictionSchema,
  userId: z.string().min(1, 'User ID is required'),
});

// Template generation validation schema
export const TemplateRequestSchema = z.object({
  templateType: z.string().min(1, 'Template type is required'),
  context: z.string().min(10, 'Context must be at least 10 characters'),
  jurisdiction: JurisdictionSchema,
  variables: z.record(z.string()).optional(),
});

// Frame request validation schema
export const FrameRequestSchema = z.object({
  untrustedData: z.object({
    fid: z.number().positive('FID must be positive'),
    url: z.string().url('Invalid URL'),
    messageHash: z.string().min(1, 'Message hash is required'),
    timestamp: z.number().positive('Timestamp must be positive'),
    network: z.number().default(1),
    buttonIndex: z.number().min(1).max(4),
    inputText: z.string().max(256, 'Input text too long').optional(),
    castId: z.object({
      fid: z.number(),
      hash: z.string(),
    }).optional(),
  }),
  trustedData: z.object({
    messageBytes: z.string(),
  }),
});

// Payment validation schema
export const PaymentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().min(1, 'Currency is required'),
  description: z.string().min(1, 'Description is required'),
  userId: z.string().min(1, 'User ID is required'),
});

/**
 * Validate legal query input
 */
export function validateLegalQuery(data: unknown) {
  return LegalQuerySchema.parse(data);
}

/**
 * Validate template request
 */
export function validateTemplateRequest(data: unknown) {
  return TemplateRequestSchema.parse(data);
}

/**
 * Validate Frame request
 */
export function validateFrameRequest(data: unknown) {
  return FrameRequestSchema.parse(data);
}

/**
 * Validate payment data
 */
export function validatePayment(data: unknown) {
  return PaymentSchema.parse(data);
}

/**
 * Validate jurisdiction code
 */
export function validateJurisdiction(jurisdiction: string): jurisdiction is Jurisdiction {
  return jurisdiction in JURISDICTIONS;
}

/**
 * Sanitize user input to prevent XSS and other attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate wallet address format (basic validation)
 */
export function isValidWalletAddress(address: string): boolean {
  // Basic Ethereum address validation
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
}

/**
 * Check if string contains potentially harmful content
 */
export function containsHarmfulContent(text: string): boolean {
  const harmfulPatterns = [
    /script/gi,
    /javascript/gi,
    /vbscript/gi,
    /onload/gi,
    /onerror/gi,
    /onclick/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ];
  
  return harmfulPatterns.some(pattern => pattern.test(text));
}

/**
 * Rate limiting validation
 */
export function validateRateLimit(
  requests: number,
  timeWindow: number,
  maxRequests: number
): boolean {
  return requests <= maxRequests;
}

/**
 * Validate API key format
 */
export function isValidApiKey(key: string): boolean {
  return key.length >= 32 && /^[a-zA-Z0-9_-]+$/.test(key);
}
