// src/app/layout.tsx
import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

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
    <html lang="en" className={`${poppins.className} dark`}>
      <body className="bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-black dark:via-zinc-900 dark:to-black text-gray-800 dark:text-white transition-colors duration-500">
        <Header />
        {children} {/* Render child pages (like Features, Pricing, etc.) */}
      </body>
    </html>
  );
}
