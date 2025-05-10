'use client';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  }),
};

const features = [
  {
    title: 'Fast Conversion',
    description: 'Convert MP4 files to MP3 quickly and efficiently with high-quality results.',
  },
  {
    title: 'No Signup Needed',
    description: 'Use the converter for free up to 3 times per week. No login or signup required!',
  },
  {
    title: 'High-Quality Output',
    description: 'MP3 files are optimized for the best audio quality.',
  },
  {
    title: 'Privacy & Security',
    description: 'We value your privacy. Your files are deleted after conversion.',
  },
];

export default function Features() {
  return (
    <section id='features' className="px-6 pb-8">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
      >
        Features
      </motion.h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl p-8 bg-white/70 dark:bg-white/5 dark:border-gray-700 backdrop-blur-md shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
