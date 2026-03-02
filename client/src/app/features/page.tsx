'use client';

import { motion } from 'framer-motion';

const features = [
  { label: 'How it works', body: 'Upload an MP4 file and our server-side FFmpeg processor strips the video and encodes a full-quality MP3. No plugins, no installs, no accounts.' },
  { label: 'Privacy', body: 'Your files never leave a temporary buffer. Everything is deleted automatically within 5 minutes of conversion. We store nothing.' },
  { label: 'Speed', body: 'Server-side processing is faster than any browser-based tool. Most files finish in under 10 seconds regardless of length.' },
  { label: 'No limits', body: 'Convert as many files as you want, as often as you want. No daily caps, no sign-up walls, no paywalls.' },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-24 max-w-6xl mx-auto">

      {/* Section header */}
      <div className="rule mb-12" />
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xs font-600 uppercase tracking-[0.2em]" style={{ color: 'var(--text-2)' }}
        >
          Why us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)]" style={{ color: 'var(--text)' }}
        >
          Everything you need.<br />
          <span style={{ color: 'var(--accent)' }}>Nothing you don't.</span>
        </motion.h2>
      </div>

      {/* 2-col grid — reference image style */}
      <div className="grid sm:grid-cols-2 gap-0" style={{ borderTop: '1px solid var(--border)' }}>
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="py-10 pr-10"
            style={{
              borderBottom: '1px solid var(--border)',
              borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
              paddingLeft: i % 2 === 1 ? '2.5rem' : '0',
            }}
          >
            <p className="text-xs font-600 uppercase tracking-[0.15em] mb-4" style={{ color: 'var(--text-2)' }}>
              {f.label}
            </p>
            <p className="text-base font-300 leading-relaxed" style={{ color: 'var(--text)' }}>
              {f.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}