'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section id='faq' className="max-w-6xl mx-auto px-4 py-16 sm:max-w-2xl">
      <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h2>

      <div className="mt-8 space-y-6">
        {/* FAQ 1 */}
        <div>
          <div
            onClick={() => toggleAccordion(0)}
            className="flex items-center justify-between cursor-pointer text-xl font-semibold text-gray-800 dark:text-gray-100 transition-all duration-200"
          >
            <p>How does the converter work?</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {open === 0 ? (
                <X className="w-5 h-5 text-gray-800 dark:text-white" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-800 dark:text-white" />
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-gray-600 dark:text-gray-400 mt-2 transition-all duration-300 ${
              open === 0 ? 'max-h-[500px] overflow-hidden' : 'max-h-0 overflow-hidden'
            }`}
          >
            <p>
              Simply upload your MP4 file, and the system will convert it to MP3. No sign-up needed for basic usage.
              It's fast and easy to use!
            </p>
          </motion.div>
        </div>

        {/* FAQ 2 */}
        <div>
          <div
            onClick={() => toggleAccordion(1)}
            className="flex items-center justify-between cursor-pointer text-xl font-semibold text-gray-800 dark:text-gray-100 transition-all duration-200"
          >
            <p>Do I need to create an account?</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {open === 1 ? (
                <X className="w-5 h-5 text-gray-800 dark:text-white" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-800 dark:text-white" />
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-gray-600 dark:text-gray-400 mt-2 transition-all duration-300 ${
              open === 1 ? 'max-h-[500px] overflow-hidden' : 'max-h-0 overflow-hidden'
            }`}
          >
            <p>
              No. You can use the converter for free up to 3 times a week without signing up. For unlimited use, just
              sign up for Pro. It's that easy!
            </p>
          </motion.div>
        </div>

        {/* FAQ 3 */}
        <div>
          <div
            onClick={() => toggleAccordion(2)}
            className="flex items-center justify-between cursor-pointer text-xl font-semibold text-gray-800 dark:text-gray-100 transition-all duration-200"
          >
            <p>Is my data safe?</p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {open === 2 ? (
                <X className="w-5 h-5 text-gray-800 dark:text-white" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-800 dark:text-white" />
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-gray-600 dark:text-gray-400 mt-2 transition-all duration-300 ${
              open === 2 ? 'max-h-[500px] overflow-hidden' : 'max-h-0 overflow-hidden'
            }`}
          >
            <p>
              Absolutely! Your privacy is important to us. All uploaded files are deleted after conversion, so you can
              rest easy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
