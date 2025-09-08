import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LegalEase Frame - Understand your rights, act with confidence',
  description: 'Empowers Farcaster users with plain-language legal information and actionable guidance for everyday situations.',
  keywords: ['legal', 'advice', 'farcaster', 'frame', 'rights', 'law'],
  authors: [{ name: 'LegalEase Team' }],
  openGraph: {
    title: 'LegalEase Frame',
    description: 'Understand your rights, act with confidence',
    type: 'website',
    images: [
      {
        url: '/api/image/welcome',
        width: 600,
        height: 400,
        alt: 'LegalEase Frame',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LegalEase Frame',
    description: 'Understand your rights, act with confidence',
    images: ['/api/image/welcome'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_APP_URL}/api/image/welcome`,
    'fc:frame:image:aspect_ratio': '1.91:1',
    'fc:frame:button:1': 'Get Legal Advice',
    'fc:frame:button:2': 'Select Jurisdiction',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-bg">
          {children}
        </div>
      </body>
    </html>
  );
}
