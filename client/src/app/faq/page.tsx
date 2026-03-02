'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: 'How does the converter work?', a: 'Upload an MP4 and our server-side FFmpeg processor extracts and converts the audio track to a high-quality MP3. No browser plugins or installs required.' },
  { q: 'Is there a file size limit?', a: 'Standard uploads support files up to 500 MB. Most video files convert without any issues.' },
  { q: 'Is my data safe?', a: 'Yes. All files are deleted automatically within 5 minutes of conversion. We never store, share, or analyse your content.' },
  { q: 'Do I need to create an account?', a: 'No. The converter is fully free with no sign-up required, ever.' },
  { q: 'Can I cancel Pro anytime?', a: 'Absolutely. Cancel from your account settings with a single click — no questions asked.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="rule mb-12" />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xs font-600 uppercase tracking-[0.2em]" style={{ color: 'var(--text-2)' }}
        >
          FAQ
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)]" style={{ color: 'var(--text)' }}
        >
          Common<br />
          <span style={{ color: 'var(--accent)' }}>Questions.</span>
        </motion.h2>
      </div>

      <div>
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full py-6 flex items-center justify-between text-left gap-4 group"
            >
              <span className="text-base font-500 transition-colors duration-150"
                style={{ color: open === i ? 'var(--accent)' : 'var(--text)' }}>
                {faq.q}
              </span>
              <span className="shrink-0 transition-colors duration-150" style={{ color: 'var(--text-2)' }}>
                {open === i ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-sm font-300 leading-relaxed max-w-xl" style={{ color: 'var(--text-2)' }}>
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        <div className="rule" />
      </div>
    </section>
  );
}