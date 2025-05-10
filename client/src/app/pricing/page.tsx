'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const pricingTiers = [
  {
    title: 'Free',
    features: ['3 conversions per week', 'No sign-up required', 'Basic conversion speed'],
    price: 'Free',
    badge: null,
    bg: 'bg-white/80 dark:bg-zinc-900/50',
    cta: 'Try for Free',
  },
  {
    title: 'Pro',
    features: ['Unlimited conversions', 'Faster processing', 'Priority support'],
    price: '$10.99/month',
    badge: 'Best Value',
    bg: 'bg-white dark:bg-zinc-800',
    cta: 'Upgrade to Pro',
  },
];

export default function Pricing() {
  return (
    <section id='pricing' className="max-w-6xl mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-900 dark:text-white"
      >
        Pricing
      </motion.h2>

      <div className="mt-16 grid md:grid-cols-2 gap-12">
        {pricingTiers.map((tier) => (
          <motion.div
            key={tier.title}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={`relative rounded-3xl shadow-xl p-8 ${tier.bg} backdrop-blur-lg border border-gray-200 dark:border-gray-700 flex flex-col justify-between`}
          >
            {tier.badge && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-3 py-1 text-xs font-semibold rounded-full animate-pulse">
                {tier.badge}
              </div>
            )}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {tier.title}
              </h3>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-300 mb-6">
                {tier.price}
              </p>

              <ul className="space-y-3 text-left mb-6">
                {tier.features.map((feature) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <button className="mt-auto bg-[#1b1b1b] text-white dark:bg-white dark:text-[#1b1b1b] font-semibold py-2 px-4 rounded-xl shadow hover:opacity-90 transition">
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
