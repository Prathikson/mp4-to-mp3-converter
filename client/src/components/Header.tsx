'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl px-6 flex items-center justify-between rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-md z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      {/* Logo */}
      <Link href="/" className={`text-lg font-semibold tracking-tight transition-all duration-200 ${scrolled ? 'text-base' : 'text-xl'}`}>
        MP4 → MP3
      </Link>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700 dark:text-gray-300">
        {['Features', 'Pricing', 'FAQ'].map((item) => (
            <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative group text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out"
            >
                <span>{item}</span>
                <span
                className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"
                />
            </Link>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="text-sm font-medium text-gray-800 dark:text-gray-100 hover:underline"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 rounded-full text-sm font-medium bg-black text-white dark:bg-white dark:text-black hover:scale-105 hover:opacity-90 transition-all duration-300"
        >
          Sign Up
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
