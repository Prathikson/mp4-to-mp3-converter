'use client';

import { motion } from 'framer-motion';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    note: 'forever',
    features: ['Unlimited conversions', 'No account required', 'Files deleted in 5 min', 'Standard speed'],
    cta: 'Start Now',
    accent: false,
  },
  {
    name: 'Pro',
    price: '$10.99',
    note: '/ month',
    features: ['Everything in Free', 'Priority processing', 'Early feature access', 'Priority support'],
    cta: 'Upgrade to Pro',
    accent: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24 max-w-6xl mx-auto">
      <div className="rule mb-12" />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xs font-600 uppercase tracking-[0.2em]" style={{ color: 'var(--text-2)' }}
        >
          Pricing
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-[clamp(2.5rem,6vw,5rem)]" style={{ color: 'var(--text)' }}
        >
          Simple.<br />
          <span style={{ color: 'var(--accent)' }}>Honest.</span>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-8 flex flex-col justify-between"
            style={{
              backgroundColor: t.accent ? 'var(--text)' : 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Top */}
            <div>
              <div className="flex items-end justify-between mb-8">
                <p className="text-xs font-600 uppercase tracking-[0.15em]"
                  style={{ color: t.accent ? 'rgba(241,241,241,0.5)' : 'var(--text-2)' }}>
                  {t.name}
                </p>
                {t.accent && (
                  <span className="text-xs font-700 uppercase tracking-widest px-2 py-1"
                    style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
                    Best Value
                  </span>
                )}
              </div>

              <div className="mb-8">
                <span className="font-display text-[4rem]"
                  style={{ color: t.accent ? 'var(--bg)' : 'var(--text)' }}>
                  {t.price}
                </span>
                <span className="text-sm ml-2 font-300"
                  style={{ color: t.accent ? 'rgba(241,241,241,0.5)' : 'var(--text-2)' }}>
                  {t.note}
                </span>
              </div>

              <ul className="space-y-3 mb-10">
                {t.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-300"
                    style={{ color: t.accent ? 'rgba(241,241,241,0.8)' : 'var(--text)' }}>
                    <span className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: t.accent ? 'var(--accent)' : 'var(--surface)' }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button
              className="w-full py-3.5 text-xs font-700 uppercase tracking-[0.15em] transition-all duration-150"
              style={t.accent
                ? { backgroundColor: 'var(--accent)', color: '#fff' }
                : { backgroundColor: 'var(--text)', color: 'var(--bg)' }
              }
              onMouseEnter={e => { if (!t.accent) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)'; }}
              onMouseLeave={e => { if (!t.accent) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--text)'; }}
            >
              {t.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}