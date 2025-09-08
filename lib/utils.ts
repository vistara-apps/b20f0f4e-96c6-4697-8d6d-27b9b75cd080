import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function validateQuery(query: string): boolean {
  return query.trim().length >= 10 && query.trim().length <= 500;
}

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
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .slice(0, 1000);
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
