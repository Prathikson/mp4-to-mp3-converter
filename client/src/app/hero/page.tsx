'use client';

import { useState } from 'react';
import FileConversion from '@/components/FileConversion'; // Import the reusable FileConversion component

export default function HeroSection() {
  const [showUpgradePrompt, setShowUpgradePrompt] = useState<boolean>(false);

  const handleUpgradePrompt = () => {
    setShowUpgradePrompt(true); // Trigger the upgrade prompt logic when needed
  };

  return (
    <section id='hero' className="min-w-screen mt-28 px-6 py-6">
      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center space-y-6 text-center z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white">
          Convert MP4 to MP3 with Ease
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Fast, secure, and high-quality MP4 to MP3 conversion without the need to sign up. Simple, seamless, and user-friendly.
        </p>

        {/* FileConversion Component */}
        <FileConversion onUpgradePrompt={handleUpgradePrompt} />

      </div>
    </section>
  );
}
