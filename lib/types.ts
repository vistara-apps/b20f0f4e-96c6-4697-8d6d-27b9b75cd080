// User entity
export interface User {
  farcasterId: string;
  walletAddress?: string;
  jurisdiction?: string;
}

// Query entity
export interface Query {
  userId: string;
  queryString: string;
  jurisdiction: string;
  timestamp: Date;
  responseType: 'summary' | 'template' | 'guidance';
  cost: number;
}

// Legal Information entity
export interface LegalInformation {
  id: string;
  title: string;
  summary: string;
  detailedInfo: string;
  actionSteps: string[];
  jurisdiction: string;
  sourceLink?: string;
  tags: string[];
}

// Template entity
export interface Template {
  id: string;
  title: string;
  content: string;
  usageContext: string;
  jurisdiction: string;
  variables?: string[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface LegalAdviceResponse {
  summary: string;
  actionSteps: string[];
  relevantLaws: string[];
  templates?: Template[];
  sources: string[];
}

// Component prop types
export interface FrameButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export interface InfoCardProps {
  title: string;
  content: string;
  actionable?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface JurisdictionSelectorProps {
  value: string;
  onChange: (jurisdiction: string) => void;
  variant?: 'dropdown' | 'buttonGroup';
}

export interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: 'default' | 'multiline';
  className?: string;
}

// Legal topic categories
export type LegalCategory = 
  | 'tenant-rights'
  | 'consumer-laws'
  | 'workplace-rights'
  | 'family-law'
  | 'criminal-law'
  | 'contract-law'
  | 'intellectual-property'
  | 'immigration'
  | 'tax-law'
  | 'personal-injury';

export interface LegalTopic {
  id: string;
  category: LegalCategory;
  title: string;
  description: string;
  commonQuestions: string[];
}
