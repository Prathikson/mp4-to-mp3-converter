'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogOut, ArrowRight } from 'lucide-react';

interface UserData { email: string; plan: 'free' | 'pro'; createdAt?: string; }

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async user => {
      if (!user) { router.push('/login'); return; }
      const db = getFirestore();
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) setUserData(snap.data() as UserData);
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  const handleSignOut = async () => { await signOut(auth); router.push('/'); };

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <p className="text-xs font-600 uppercase tracking-[0.2em]" style={{ color: 'var(--text-2)' }}>Loading…</p>
    </main>
  );

  const isPro = userData?.plan === 'pro';

  return (
    <main className="min-h-screen px-6 pt-24 pb-20 max-w-2xl mx-auto" style={{ backgroundColor: 'var(--bg)' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

        {/* Nav */}
        <div className="flex items-center justify-between mb-16">
          <Link href="/" className="font-display text-2xl" style={{ color: 'var(--text)' }}>
            MP4<span style={{ color: 'var(--accent)' }}>→</span>MP3
          </Link>
          <button onClick={handleSignOut}
            className="flex items-center gap-2 text-xs font-600 uppercase tracking-widest transition-colors duration-150"
            style={{ color: 'var(--text-2)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
            <LogOut size={13} /> Sign Out
          </button>
        </div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] mb-12" style={{ color: 'var(--text)' }}>
          Your<br />
          <span style={{ color: 'var(--accent)' }}>Account.</span>
        </h1>

        <div className="rule mb-8" />

        {/* Email + plan */}
        <div className="flex items-center justify-between py-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <p className="text-xs font-600 uppercase tracking-[0.15em] mb-1" style={{ color: 'var(--text-2)' }}>Email</p>
            <p className="text-sm font-500" style={{ color: 'var(--text)' }}>{userData?.email}</p>
          </div>
          <span className="text-xs font-700 uppercase tracking-widest px-3 py-1.5"
            style={isPro
              ? { backgroundColor: 'var(--accent)', color: '#fff' }
              : { border: '1px solid var(--border)', color: 'var(--text-2)' }}>
            {isPro ? 'Pro' : 'Free'}
          </span>
        </div>

        {/* Member since */}
        <div className="flex items-center justify-between py-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <p className="text-xs font-600 uppercase tracking-[0.15em]" style={{ color: 'var(--text-2)' }}>Member since</p>
          <p className="text-sm font-500" style={{ color: 'var(--text)' }}>
            {userData?.createdAt
              ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              : '—'}
          </p>
        </div>

        {/* Upgrade CTA */}
        {!isPro && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-8 p-6 flex items-center justify-between"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div>
              <p className="text-sm font-600 uppercase tracking-widest mb-1" style={{ color: 'var(--text)' }}>Upgrade to Pro</p>
              <p className="text-xs font-300" style={{ color: 'var(--text-2)' }}>Priority processing · $10.99/month</p>
            </div>
            <a href="#pricing"
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-700 uppercase tracking-widest transition-colors duration-150 ml-4"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
              Upgrade <ArrowRight size={12} />
            </a>
          </motion.div>
        )}

        {/* Links */}
        <div className="mt-8" style={{ borderTop: '1px solid var(--border)' }}>
          {[
            { label: 'Back to converter', href: '/' },
            { label: 'Change password', href: '/reset-password' },
          ].map(l => (
            <Link key={l.label} href={l.href}
              className="flex items-center justify-between py-4 text-sm font-500 transition-colors duration-150 group"
              style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-2)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}>
              <span>{l.label}</span>
              <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

      </motion.div>
    </main>
  );
}