import HeroSection  from './hero/page';
import Features     from './features/page';
import Pricing      from './pricing/page';
import FAQ          from './faq/page';
import DonateShare  from './donate/page';

function MarqueeStrip() {
  const items = ['MP4 → MP3', 'Free Forever', 'No Sign-up', 'Private', 'Instant', 'No Limits'];
  const repeated = [...items, ...items]; // doubled for seamless loop
  return (
    <div className="overflow-hidden border-y py-3" style={{ borderColor: 'var(--border)' }}>
      <div className="marquee-track">
        {repeated.map((t, i) => (
          <span key={i} className="flex items-center gap-6 px-6 text-xs font-600 uppercase tracking-[0.2em] whitespace-nowrap"
            style={{ color: i % 2 === 0 ? 'var(--text-2)' : 'var(--accent)' }}>
            {t}
            <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: 'var(--border)' }} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MarqueeStrip />
      <Features />
      <Pricing />
      <FAQ />
      <DonateShare />

      {/* Footer */}
      <footer className="px-6 py-10 rule" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-display-md text-base" style={{ color: 'var(--text)' }}>
            MP4<span style={{ color: 'var(--accent)' }}>→</span>MP3
          </span>
          <span className="text-xs uppercase tracking-widest font-500" style={{ color: 'var(--text-3)' }}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </main>
  );
}