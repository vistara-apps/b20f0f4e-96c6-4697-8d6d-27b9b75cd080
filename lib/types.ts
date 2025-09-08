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

// Payment and transaction types
export interface PaymentRequest {
  amount: number;
  currency: 'ETH' | 'USDC';
  description: string;
  queryId?: string;
  templateId?: string;
}

export interface PaymentResponse {
  transactionHash: string;
  status: 'pending' | 'confirmed' | 'failed';
  amount: number;
  currency: string;
}

// Session management
export interface UserSession {
  id: string;
  farcasterId?: string;
  walletAddress?: string;
  jurisdiction: string;
  queries: Query[];
  totalSpent: number;
  createdAt: Date;
  lastActive: Date;
}

// Document analysis types
export interface DocumentAnalysisRequest {
  documentText: string;
  documentType?: string;
  jurisdiction: string;
  analysisType: 'summary' | 'risks' | 'compliance' | 'full';
}

export interface DocumentAnalysisResponse {
  id: string;
  summary: string;
  keyPoints: string[];
  risks: string[];
  recommendations: string[];
  compliance: {
    jurisdiction: string;
    requirements: string[];
    violations: string[];
  };
  confidence: number;
}

// Template generation types
export interface TemplateRequest {
  templateType: string;
  jurisdiction: string;
  context: Record<string, string>;
  customizations?: Record<string, string>;
}

export interface GeneratedTemplate extends Template {
  generatedAt: Date;
  cost: number;
  downloadUrl?: string;
}

// Enhanced API response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Frame-specific types
export interface FrameMetadata {
  title: string;
  description: string;
  image: string;
  buttons: FrameButton[];
  inputText?: string;
  postUrl?: string;
}

export interface FrameButton {
  label: string;
  action: 'post' | 'link' | 'mint' | 'tx';
  target?: string;
}

// Error handling types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

// Analytics types
export interface QueryAnalytics {
  queryId: string;
  category: LegalCategory;
  jurisdiction: string;
  responseTime: number;
  userSatisfaction?: number;
  followUpQueries: number;
}

// Validation schemas
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}
