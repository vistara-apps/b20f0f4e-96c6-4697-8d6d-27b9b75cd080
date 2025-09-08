import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { ValidationResult } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Enhanced validation functions
export function validateQuery(query: string): boolean {
  if (!query || typeof query !== 'string') return false;
  const trimmed = query.trim();
  return trimmed.length >= 10 && trimmed.length <= 500;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateWalletAddress(address: string): boolean {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 500); // Limit length
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

// Zod validation schemas
export const QuerySchema = z.object({
  query: z.string().min(10).max(500),
  jurisdiction: z.string().min(2).max(10),
});

export const DocumentAnalysisSchema = z.object({
  documentText: z.string().min(50).max(10000),
  documentType: z.string().optional(),
  jurisdiction: z.string().min(2).max(10),
  analysisType: z.enum(['summary', 'risks', 'compliance', 'full']),
});

export const TemplateRequestSchema = z.object({
  templateType: z.string().min(3).max(100),
  jurisdiction: z.string().min(2).max(10),
  context: z.record(z.string()),
  customizations: z.record(z.string()).optional(),
});

export const PaymentRequestSchema = z.object({
  amount: z.number().positive().max(1000),
  currency: z.enum(['ETH', 'USDC']),
  description: z.string().min(5).max(200),
  queryId: z.string().optional(),
  templateId: z.string().optional(),
});

// Validation helper functions
export function validateDocumentAnalysisRequest(data: any): ValidationResult {
  try {
    DocumentAnalysisSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
      };
    }
    return { isValid: false, errors: ['Invalid request format'] };
  }
}

export function validateTemplateRequest(data: any): ValidationResult {
  try {
    TemplateRequestSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
      };
    }
    return { isValid: false, errors: ['Invalid template request'] };
  }
}

export function validatePaymentRequest(data: any): ValidationResult {
  try {
    PaymentRequestSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
      };
    }
    return { isValid: false, errors: ['Invalid payment request'] };
  }
}

// Formatting functions
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(date);
}

// Utility functions
export function generateId(): string {
  return nanoid();
}

export function generateShortId(): string {
  return nanoid(8);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Jurisdiction validation
export function isValidJurisdiction(jurisdiction: string): boolean {
  const validJurisdictions = [
    'US', 'CA', 'UK', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT',
    'SE', 'NO', 'DK', 'FI', 'IE', 'PT', 'GR', 'PL', 'CZ', 'HU', 'SK', 'SI',
    'EE', 'LV', 'LT', 'LU', 'MT', 'CY', 'BG', 'RO', 'HR', 'IN', 'SG', 'HK',
    'JP', 'KR', 'TW', 'MY', 'TH', 'PH', 'ID', 'VN', 'BR', 'MX', 'AR', 'CL',
    'CO', 'PE', 'UY', 'PY', 'BO', 'EC', 'VE', 'ZA', 'NG', 'KE', 'GH', 'EG',
    'MA', 'TN', 'DZ', 'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB', 'IL'
  ];
  return validJurisdictions.includes(jurisdiction);
}

export function getJurisdictionName(code: string): string {
  const jurisdictionNames: Record<string, string> = {
    'US': 'United States',
    'CA': 'Canada',
    'UK': 'United Kingdom',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'IT': 'Italy',
    'ES': 'Spain',
    'NL': 'Netherlands',
    'BE': 'Belgium',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'IE': 'Ireland',
    'PT': 'Portugal',
    'GR': 'Greece',
    'PL': 'Poland',
    'IN': 'India',
    'SG': 'Singapore',
    'HK': 'Hong Kong',
    'JP': 'Japan',
    'KR': 'South Korea',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'ZA': 'South Africa',
    'AE': 'United Arab Emirates',
    'SA': 'Saudi Arabia',
  };
  return jurisdictionNames[code] || code;
}

// Legacy functions for backward compatibility
export function extractKeywords(text: string): string[] {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'cannot', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'his', 'her', 'its', 'our', 'their'];
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word))
    .slice(0, 10);
}

export function generateQueryId(): string {
  return `query_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function formatTimestamp(timestamp: Date): string {
  return formatDate(timestamp);
}

export function detectJurisdiction(userAgent?: string, ip?: string): string {
  // Simple jurisdiction detection - in production, use proper IP geolocation
  return 'US'; // Default to US
}

export function calculateQueryCost(queryType: string, complexity: 'basic' | 'advanced' = 'basic'): number {
  const baseCosts = {
    summary: 0.01,
    template: 0.05,
    guidance: 0.03,
    analysis: 0.10,
  };
  
  const multiplier = complexity === 'advanced' ? 2 : 1;
  return (baseCosts[queryType as keyof typeof baseCosts] || 0.01) * multiplier;
}

// Error handling utilities
export function createError(code: string, message: string, details?: any) {
  return {
    code,
    message,
    details,
    timestamp: new Date(),
  };
}

export function isNetworkError(error: any): boolean {
  return error?.code === 'NETWORK_ERROR' || 
         error?.message?.includes('network') ||
         error?.message?.includes('fetch');
}

export function isValidationError(error: any): boolean {
  return error?.code === 'VALIDATION_ERROR' ||
         error instanceof z.ZodError;
}

// File utilities
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function isValidFileType(filename: string, allowedTypes: string[]): boolean {
  const extension = getFileExtension(filename);
  return allowedTypes.includes(extension);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Crypto utilities
export function formatEthAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function isValidTransactionHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

// Rate limiting utilities
export function createRateLimiter(maxRequests: number, windowMs: number) {
  const requests = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(identifier)) {
      requests.set(identifier, []);
    }
    
    const userRequests = requests.get(identifier)!;
    const validRequests = userRequests.filter(time => time > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    requests.set(identifier, validRequests);
    return true;
  };
}
