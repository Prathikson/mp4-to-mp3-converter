// src/app/page.tsx
import DonateShare from './donate/page';
import FAQ from './faq/page';
import Features from './features/page';
import HeroSection from './hero/page';
import Pricing from './pricing/page';

export default function Home() {
  return (
    <main className="px-6 py-2 space-y-12">
      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      <Features />
      {/* Pricing Section */}
      <Pricing />
      {/* FAQ Section */}
      <FAQ />
      {/* Donate & Share Section */}
      <DonateShare />
    </main>
  );
}
