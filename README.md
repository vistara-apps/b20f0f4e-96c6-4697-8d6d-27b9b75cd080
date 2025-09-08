# LegalEase Frame

A Base Mini App that empowers Farcaster users with plain-language legal information and actionable guidance for everyday situations.

## Features

- **Plain-Language Legal Summaries**: Clear, easy-to-understand explanations of common legal rights and procedures
- **Jurisdiction-Specific Guidance**: Tailored legal information based on user's geographic location
- **Actionable Next Steps**: Step-by-step guidance on what actions to take
- **Templated Legal Communications**: Pre-written letters, forms, and messages for common legal scenarios
- **Legal Resource Linking**: Citations to relevant laws and links to official sources

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
