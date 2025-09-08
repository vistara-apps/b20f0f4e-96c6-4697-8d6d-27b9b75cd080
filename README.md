# LegalEase Frame

**Understand your rights, act with confidence.**

A comprehensive Base Mini App that empowers Farcaster users with plain-language legal information, document analysis, and professional template generation through AI-powered micro-transactions.

## 🚀 Core Services

### 1. Legal Q&A ($0.01+)
- **Plain-Language Legal Summaries**: Clear, easy-to-understand explanations of legal rights and procedures
- **Jurisdiction-Specific Guidance**: Tailored legal information based on user's geographic location
- **Actionable Next Steps**: Step-by-step guidance on what actions to take
- **Legal Resource Linking**: Citations to relevant laws and links to official sources

### 2. Document Analysis ($0.05+)
- **Risk Identification**: Identify potential legal risks in documents
- **Compliance Checking**: Verify compliance with relevant regulations
- **Key Insights Extraction**: Extract important clauses and terms
- **Confidence Scoring**: AI confidence ratings for analysis accuracy

### 3. Legal Templates ($0.05+)
- **Demand Letters**: Professional debt collection and payment requests
- **Lease Termination Notices**: Formal rental agreement terminations
- **Cease and Desist Letters**: Legal notices to stop harmful activities
- **Employment Complaints**: Workplace issue documentation
- **Contract Cancellations**: Service and agreement terminations
- **Privacy Requests**: GDPR and data protection requests

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **AI**: OpenAI API for legal advice generation
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd legalease-frame
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENAI_API_KEY`: Your OpenAI API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # App providers
├── components/            # Reusable components
│   ├── FrameButton.tsx    # Custom button component
│   ├── InfoCard.tsx       # Information card component
│   ├── JurisdictionSelector.tsx
│   ├── LegalAdviceDisplay.tsx
│   ├── LegalTopicGrid.tsx
│   ├── LoadingSpinner.tsx
│   ├── QueryInterface.tsx
│   └── TextInput.tsx
├── lib/                   # Utilities and types
│   ├── constants.ts       # App constants
│   ├── openai.ts         # OpenAI integration
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🔧 API Endpoints

### Legal Services
- `POST /api/legal-advice` - Generate AI-powered legal advice
- `GET /api/legal-advice` - Retrieve advice history

### Document Analysis
- `POST /api/document-analysis` - Analyze uploaded legal documents
- `GET /api/document-analysis` - Get available analysis types

### Template Generation
- `POST /api/templates` - Generate legal document templates
- `GET /api/templates` - List available template categories

### Payment Processing
- `POST /api/payments` - Process micro-transactions
- `GET /api/payments` - Check payment status and history

### Session Management
- `POST /api/sessions` - Create user session
- `GET /api/sessions` - Retrieve session data
- `PUT /api/sessions` - Update session information
- `DELETE /api/sessions` - End user session

### Frame Integration
- `POST /api/frame` - Handle Farcaster frame interactions
- `GET /api/og` - Generate Open Graph images

## 💰 Business Model

**Micro-transactions**: Pay only for what you use, powered by Base Network

### Pricing Tiers
- **Legal Q&A**: $0.01 - $0.03 per query
  - Basic questions: $0.01
  - Complex analysis: $0.03
  
- **Document Analysis**: $0.05 - $0.15 per document
  - Summary analysis: $0.05
  - Risk assessment: $0.10
  - Full compliance review: $0.15
  
- **Legal Templates**: $0.05 - $0.10 per template
  - Standard templates: $0.05
  - Custom templates: $0.10

### Payment Features
- **Low Transaction Fees**: Base Network L2 scaling
- **Instant Processing**: Real-time payment confirmation
- **Transparent Pricing**: No hidden fees or subscriptions
- **Secure Transactions**: Blockchain-verified payments

## 📱 Usage Guide

### For End Users

#### 1. Ask Legal Questions
1. Click "Ask Legal Question" on the home screen
2. Enter your legal question in plain language
3. Select your jurisdiction (auto-detected when possible)
4. Review the cost estimate
5. Confirm payment to receive AI-powered advice
6. Get plain-language explanation with actionable steps

#### 2. Analyze Documents
1. Click "Analyze Document" on the home screen
2. Upload your legal document (PDF, DOC, DOCX, TXT)
3. Choose analysis type (Summary, Risk Assessment, Full Review)
4. Review cost and confirm payment
5. Receive detailed analysis with confidence scores
6. Download or save results for future reference

#### 3. Generate Templates
1. Click "Get Templates" on the home screen
2. Browse available template categories
3. Select the template type you need
4. Provide required information (names, dates, details)
5. Customize template as needed
6. Pay and download professional document

### For Developers

#### Extending the Application
```typescript
// Add new API endpoint
// app/api/new-feature/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const data = await validateRequest(request);
    // Your logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
```

#### Adding New Components
```typescript
// components/NewComponent.tsx
import { FrameButton } from './FrameButton';

interface NewComponentProps {
  onAction: () => void;
}

export function NewComponent({ onAction }: NewComponentProps) {
  return (
    <div className="info-card">
      <FrameButton onClick={onAction}>
        Action Button
      </FrameButton>
    </div>
  );
}
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Legal Q&A flow works end-to-end
- [ ] Document upload and analysis functions
- [ ] Template generation produces valid documents
- [ ] Payment processing completes successfully
- [ ] Error handling displays appropriate messages
- [ ] Mobile responsiveness works on all screen sizes

### API Testing Examples
```bash
# Test legal advice endpoint
curl -X POST http://localhost:3000/api/legal-advice \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are my rights as a tenant?",
    "jurisdiction": "US",
    "complexity": "basic"
  }'

# Test document analysis
curl -X POST http://localhost:3000/api/document-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "documentText": "Sample contract text here...",
    "jurisdiction": "US",
    "analysisType": "summary"
  }'

# Test template generation
curl -X POST http://localhost:3000/api/templates \
  -H "Content-Type: application/json" \
  -d '{
    "templateType": "demand-letter",
    "jurisdiction": "US",
    "customization": {
      "recipientName": "John Doe",
      "amount": "$500",
      "dueDate": "2024-02-01"
    }
  }'
```

## 🚀 Deployment

### Vercel (Recommended)
1. Fork this repository
2. Connect to Vercel
3. Set environment variables:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
4. Deploy automatically on push to main

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Setup
```env
# .env.local
OPENAI_API_KEY=sk-your-openai-api-key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your-onchainkit-api-key
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
```

## 🔒 Security Features

- **Input Validation**: All user inputs validated with Zod schemas
- **Rate Limiting**: API endpoints protected against abuse
- **Data Sanitization**: HTML and script injection prevention
- **Secure Headers**: CSP and security headers configured
- **Environment Variables**: Sensitive data properly secured
- **Error Handling**: Comprehensive error logging without data exposure

## Legal Disclaimer

This application provides general legal information for educational purposes only and does not constitute legal advice. Users should consult with qualified attorneys for specific legal guidance.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
