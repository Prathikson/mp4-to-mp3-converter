// src/app/layout.tsx
import Header from '@/components/Header';
import Features from './features/page';  // Import the Features section
import Pricing from './pricing/page';  // Import the Pricing section
import FAQ from './faq/page';  // Import the FAQ section
import DonateShare from './donate/page';  // Import the Donation & Share section (if in a separate file)
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MP4 to MP3 Converter',
  description: 'Convert MP4 videos to MP3 audio with Apple-style experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-black dark:via-zinc-900 dark:to-black text-gray-800 dark:text-white transition-colors duration-500">
        <Header/>
        {children}
        <Features/>
        <Pricing/>
        <FAQ/>
        <DonateShare/>
      </body>
    </html>
  );
}
