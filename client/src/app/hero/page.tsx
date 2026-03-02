'use client';

import { motion } from 'framer-motion';
import FileConversion from '@/components/FileConversion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroSection() {
  return (
    <section id="hero" className="pt-32 pb-24 px-6 max-w-6xl mx-auto">

      {/* Eyebrow */}
      <motion.p {...fade(0)}
        className="text-xs font-600 uppercase tracking-[0.2em] mb-6"
        style={{ color: 'var(--text-2)' }}
      >
        Free audio converter
      </motion.p>

      {/* Giant headline */}
      <motion.h1 {...fade(0.06)}
        className="font-display text-[clamp(4rem,12vw,10rem)] mb-4 leading-none"
        style={{ color: 'var(--text)' }}
      >
        MP4<span style={{ color: 'var(--accent)' }}>→</span><br />
        MP3.
      </motion.h1>

      {/* Subheading */}
      <motion.div {...fade(0.12)}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
      >
        <p className="text-lg font-300 max-w-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
          Drop your video. Get your audio.<br />
          Fast, private, completely free — forever.
        </p>
        <p className="text-xs font-500 uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
          Files deleted after 5 min
        </p>
      </motion.div>

      {/* Horizontal rule */}
      <motion.div {...fade(0.16)} className="rule mb-10" />

      {/* Converter */}
      <motion.div {...fade(0.2)}>
        <FileConversion />
      </motion.div>
    </section>
  );
}