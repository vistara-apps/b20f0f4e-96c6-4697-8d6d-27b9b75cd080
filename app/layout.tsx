import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LegalEase Frame - Understand your rights, act with confidence',
  description: 'Empowers Farcaster users with plain-language legal information and actionable guidance for everyday situations.',
  openGraph: {
    title: 'LegalEase Frame',
    description: 'Understand your rights, act with confidence.',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og`,
    'fc:frame:button:1': 'Get Legal Advice',
    'fc:frame:button:2': 'Browse Topics',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/frame`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
