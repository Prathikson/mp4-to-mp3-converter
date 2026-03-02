'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch {
      setError('Invalid email or password.');
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-20" style={{ backgroundColor: 'var(--bg)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="block font-display text-3xl mb-12" style={{ color: 'var(--text)' }}>
          MP4<span style={{ color: 'var(--accent)' }}>→</span>MP3
        </Link>

        <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] mb-10" style={{ color: 'var(--text)' }}>
          Sign In.
        </h1>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-sm mb-6 px-4 py-3" style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent)' }}>
            {error}
          </motion.p>
        )}

        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-xs font-600 uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--text-2)' }}>
              Email
            </label>
            <input type="email" required placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 text-sm outline-none transition-colors duration-150"
              style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
              onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text)'; }}
              onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
            />
          </div>

          <div>
            <label className="block text-xs font-600 uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--text-2)' }}>
              Password
            </label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} required placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 pr-12 text-sm outline-none transition-colors duration-150"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--text)'; }}
                onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-2)' }}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <Link href="/reset-password" className="text-xs font-500 uppercase tracking-widest transition-colors duration-150"
                style={{ color: 'var(--text-2)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
                Forgot password?
              </Link>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 text-sm font-700 uppercase tracking-[0.15em] flex items-center justify-between px-6 mt-2 transition-colors duration-150 disabled:opacity-50"
            style={{ backgroundColor: 'var(--text)', color: 'var(--bg)' }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--text)'; }}
          >
            <span>{loading ? 'Signing in…' : 'Sign In'}</span>
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="mt-8 text-sm" style={{ color: 'var(--text-2)' }}>
          No account?{' '}
          <Link href="/register" className="font-600 transition-colors duration-150"
            style={{ color: 'var(--text)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}>
            Create one →
          </Link>
        </p>
      </motion.div>
    </main>
  );
}