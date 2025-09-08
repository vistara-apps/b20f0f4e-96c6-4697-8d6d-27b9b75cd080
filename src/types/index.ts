// Core data model types based on specifications

export interface User {
  farcasterId: string;
  walletAddress?: string;
  jurisdiction: string;
}

export interface Query {
  userId: string;
  queryString: string;
  jurisdiction: string;
  timestamp: Date;
  responseType: 'summary' | 'template' | 'guidance';
  cost: number;
}

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

export interface Template {
  id: string;
  title: string;
  content: string;
  usageContext: string;
  jurisdiction: string;
  variables?: Record<string, string>;
}

// Frame-specific types
export interface FrameRequest {
  untrustedData: {
    fid: number;
    url: string;
    messageHash: string;
    timestamp: number;
    network: number;
    buttonIndex: number;
    inputText?: string;
    castId?: {
      fid: number;
      hash: string;
    };
  };
  trustedData: {
    messageBytes: string;
  };
}

export interface FrameResponse {
  image: string;
  buttons?: FrameButton[];
  input?: FrameInput;
  postUrl?: string;
  aspectRatio?: '1.91:1' | '1:1';
}

export interface FrameButton {
  label: string;
  action?: 'post' | 'post_redirect' | 'link' | 'mint';
  target?: string;
}

export interface FrameInput {
  text: string;
}

// API Response types
export interface LegalAdviceResponse {
  summary: string;
  actionSteps: string[];
  templates?: Template[];
  sources?: string[];
  jurisdiction: string;
}

export interface PaymentIntent {
  amount: number;
  currency: string;
  description: string;
  userId: string;
}

// Jurisdiction types
export type Jurisdiction = 
  | 'US-CA' // California
  | 'US-NY' // New York
  | 'US-TX' // Texas
  | 'US-FL' // Florida
  | 'US-FEDERAL' // Federal US
  | 'UK'
  | 'CA' // Canada
  | 'AU' // Australia
  | 'GENERAL'; // General/International

export interface JurisdictionInfo {
  code: Jurisdiction;
  name: string;
  flag: string;
  description: string;
}

// Error types
export interface APIError {
  code: string;
  message: string;
  details?: any;
}

// Component prop types
export interface FrameButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface InfoCardProps {
  variant?: 'default' | 'actionable';
  title: string;
  content: string;
  actions?: React.ReactNode;
  className?: string;
}

export interface JurisdictionSelectorProps {
  variant?: 'dropdown' | 'buttonGroup';
  value: Jurisdiction;
  onChange: (jurisdiction: Jurisdiction) => void;
  className?: string;
}

export interface TextInputProps {
  variant?: 'default' | 'multiline';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
}
