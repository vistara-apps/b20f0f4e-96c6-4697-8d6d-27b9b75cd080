# LegalEase Frame

A comprehensive Farcaster Frame that provides plain-language legal information, actionable guidance, and professional legal templates for everyday situations. Built with Next.js and powered by AI.

## 🚀 Features

### Core Legal Services
- **Plain-Language Legal Summaries**: Clear, easy-to-understand explanations of complex legal concepts
- **Jurisdiction-Specific Guidance**: Tailored legal information based on geographic location
- **Actionable Next Steps**: Step-by-step guidance for legal situations
- **AI-Powered Analysis**: Advanced legal document analysis and advice generation

### Professional Templates
- **Legal Document Templates**: Pre-written letters, forms, and legal communications
- **Custom Template Generation**: AI-generated documents tailored to specific situations
- **Template Categories**: Demand letters, lease termination, cease & desist, employment complaints, and more
- **Jurisdiction Compliance**: Templates adapted for specific legal jurisdictions

### Payment & Premium Features
- **Micro-Transaction Model**: Pay-per-use pricing for premium features
- **Base Network Integration**: Secure, low-fee payments via Base blockchain
- **Tiered Access**: Basic advice free, premium features available for small fees
- **Wallet Integration**: Seamless crypto payments through OnchainKit

### Frame Experience
- **Interactive UI**: Rich Farcaster Frame interface with multiple interaction flows
- **Dynamic OG Images**: Context-aware social media previews
- **Multi-Step Workflows**: Guided user journeys for complex legal processes
- **Error Handling**: Robust error recovery and user feedback

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

## API Endpoints

- `POST /api/legal-advice` - Generate legal advice for a query
- `POST /api/frame` - Handle Farcaster frame interactions
- `GET /api/og` - Generate Open Graph images

## Business Model

**Micro-transactions**: Pay-per-query pricing model
- Basic Legal Advice: $0.01
- Document Templates: $0.05
- Detailed Analysis: $0.10
- Document Review: $0.25

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
