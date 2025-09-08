# LegalEase Frame

**Understand your rights, act with confidence**

A Next.js-based Farcaster Frame that empowers users with plain-language legal information and actionable guidance for everyday situations.

## 🚀 Features

- **Plain-Language Legal Summaries**: Clear, easy-to-understand explanations of common legal rights and procedures
- **Jurisdiction-Specific Guidance**: Tailored legal information based on user's geographic location
- **Actionable Next Steps**: Step-by-step guidance on what actions to take to resolve legal issues
- **Templated Legal Communications**: Pre-written letters, forms, and messages for common legal scenarios
- **Legal Resource Linking**: Citations to relevant laws and links to official sources

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **AI Integration**: OpenAI GPT for legal advice generation
- **Frame Integration**: Farcaster Frame protocol
- **Validation**: Zod for request validation
- **UI Components**: Custom component library with class-variance-authority

## 📋 Prerequisites

- Node.js 18+ 
- OpenAI API key
- Neynar API key (for Farcaster integration)

## 🔧 Installation

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
   
   Fill in your API keys in `.env.local`:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   OPENAI_API_KEY=your_openai_api_key_here
   NEYNAR_API_KEY=your_neynar_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── frame/         # Frame interaction endpoints
│   │   ├── advice/        # Legal advice generation
│   │   ├── templates/     # Document templates
│   │   ├── payment/       # Payment processing
│   │   ├── user/          # User management
│   │   └── image/         # Frame image generation
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ui/               # UI component library
│       ├── FrameButton.tsx
│       ├── InfoCard.tsx
│       ├── JurisdictionSelector.tsx
│       ├── TextInput.tsx
│       └── index.ts
├── lib/                   # Core libraries
│   ├── constants.ts       # App constants
│   ├── openai.ts         # OpenAI integration
│   └── frame.ts          # Frame utilities
├── types/                 # TypeScript type definitions
│   └── index.ts
└── utils/                 # Utility functions
    ├── validation.ts      # Input validation
    └── helpers.ts         # Helper functions
```

## 🎨 Design System

The app uses a custom design system with the following tokens:

### Colors
- **Primary**: `hsl(220, 80%, 50%)` - Main brand color
- **Accent**: `hsl(140, 50%, 60%)` - Secondary accent color
- **Background**: `hsl(220, 15%, 95%)` - Page background
- **Surface**: `hsl(0, 0%, 100%)` - Card/component background
- **Text Primary**: `hsl(220, 15%, 20%)` - Main text color
- **Text Secondary**: `hsl(220, 15%, 40%)` - Secondary text color

### Typography
- **Display**: `text-xl font-bold` - Large headings
- **Heading**: `text-lg font-semibold` - Section headings
- **Body**: `text-base leading-normal` - Body text
- **Caption**: `text-sm text-gray-600` - Small text

### Spacing
- **XS**: `4px`
- **SM**: `8px`
- **MD**: `16px`
- **LG**: `24px`

## 🔌 API Endpoints

### Frame API (`/api/frame`)
- **GET**: Returns initial frame metadata
- **POST**: Processes frame interactions

### Legal Advice API (`/api/advice`)
- **GET**: Returns available legal categories
- **POST**: Generates legal advice for user queries

### Templates API (`/api/templates`)
- **GET**: Returns available document templates
- **POST**: Generates customized legal documents
- **PUT**: Updates existing templates

### Image Generation (`/api/image/*`)
- Dynamic image generation for Frame displays

## 🧪 Usage Examples

### Getting Legal Advice
```javascript
const response = await fetch('/api/advice', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: "My landlord is trying to evict me without proper notice",
    jurisdiction: "US_CA",
    userId: "12345"
  })
});

const advice = await response.json();
```

### Generating Templates
```javascript
const response = await fetch('/api/templates', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    templateType: "demand-letter",
    context: "Unpaid invoice for services rendered",
    jurisdiction: "US_NY",
    variables: {
      RECIPIENT_NAME: "John Doe",
      AMOUNT_OWED: "1500",
      DUE_DATE: "2024-01-15"
    }
  })
});

const template = await response.json();
```

## 🔒 Security & Privacy

- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **Rate Limiting**: API endpoints are rate-limited to prevent abuse
- **Data Privacy**: No sensitive user data is stored permanently
- **Legal Disclaimer**: All responses include appropriate legal disclaimers

## ⚖️ Legal Disclaimer

This service provides general legal information, not legal advice. The information provided may not reflect the most current laws and is for educational purposes only. For specific legal matters, please consult with a qualified attorney in your jurisdiction.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for the Farcaster community**
